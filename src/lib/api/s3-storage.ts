/**
 * Cloud storage delivery for screenshots.
 * Supports Cloudflare R2 (default) and AWS S3.
 * R2 uses the S3-compatible API, so the same SDK works for both.
 * 
 * Environment variables:
 * - CLOUDFLARE_R2_ENDPOINT: R2 endpoint URL (e.g. https://<account-id>.r2.cloudflarestorage.com)
 * - CLOUDFLARE_R2_ACCESS_KEY_ID: R2 access key
 * - CLOUDFLARE_R2_SECRET_ACCESS_KEY: R2 secret key
 * - CLOUDFLARE_R2_BUCKET: R2 bucket name
 * - CLOUDFLARE_R2_PUBLIC_URL: Public URL prefix for R2 (e.g. https://screenshots.screenshotly.app)
 * 
 * Optional S3 fallback:
 * - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET
 */

import crypto from 'crypto';

interface StorageUploadConfig {
    bucket?: string;
    path?: string;
    acl?: 'private' | 'public-read';
    filename?: string;
    contentType?: string;
}

interface StorageUploadResult {
    url: string;
    bucket: string;
    key: string;
    size: number;
    provider: 'r2' | 's3';
}

type StorageProvider = 'r2' | 's3';

/**
 * Detect which storage provider is configured
 */
function getStorageProvider(): StorageProvider | null {
    if (process.env.CLOUDFLARE_R2_ENDPOINT && process.env.CLOUDFLARE_R2_ACCESS_KEY_ID) {
        return 'r2';
    }
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
        return 's3';
    }
    return null;
}

/**
 * Upload a screenshot to cloud storage (R2 or S3).
 * Cloudflare R2 is preferred if configured.
 */
export async function uploadToStorage(
    data: Buffer,
    config: StorageUploadConfig
): Promise<StorageUploadResult> {
    const provider = getStorageProvider();

    if (!provider) {
        throw new Error(
            'No storage provider configured. Set CLOUDFLARE_R2_ENDPOINT + CLOUDFLARE_R2_ACCESS_KEY_ID + CLOUDFLARE_R2_SECRET_ACCESS_KEY + CLOUDFLARE_R2_BUCKET for R2, or AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY + S3_BUCKET for S3.'
        );
    }

    if (provider === 'r2') {
        return uploadToR2(data, config);
    }

    return uploadToS3(data, config);
}

/**
 * Upload to Cloudflare R2 (S3-compatible API)
 */
async function uploadToR2(
    data: Buffer,
    config: StorageUploadConfig
): Promise<StorageUploadResult> {
    const bucket = config.bucket || process.env.CLOUDFLARE_R2_BUCKET;
    const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

    if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) {
        throw new Error(
            'R2 storage not fully configured. Required: CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY, CLOUDFLARE_R2_BUCKET'
        );
    }

    const key = generateStorageKey(config);

    // R2 uses the S3 API — we can use a simple PUT request with AWS v4 signatures
    // For simplicity and to avoid requiring @aws-sdk/client-s3, we use fetch with presigned headers
    try {
        const url = `${endpoint}/${bucket}/${key}`;
        const contentType = config.contentType || 'image/png';
        const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
        const date = timestamp.slice(0, 8);

        // AWS Signature v4 for R2
        const headers = await signR2Request({
            method: 'PUT',
            url,
            bucket,
            key,
            contentType,
            body: data,
            accessKeyId,
            secretAccessKey,
            endpoint,
            timestamp,
            date,
        });

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                ...headers,
                'Content-Type': contentType,
                'Content-Length': data.length.toString(),
            },
            body: new Uint8Array(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`R2 upload failed: ${response.status} ${errorText}`);
        }

        // Construct the public URL
        const resultUrl = publicUrl
            ? `${publicUrl}/${key}`
            : `${endpoint}/${bucket}/${key}`;

        return {
            url: resultUrl,
            bucket,
            key,
            size: data.length,
            provider: 'r2',
        };
    } catch (error) {
        console.error('R2 upload error:', error);
        throw new Error(
            `R2 upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Upload to AWS S3 (fallback)
 */
async function uploadToS3(
    data: Buffer,
    config: StorageUploadConfig
): Promise<StorageUploadResult> {
    const bucket = config.bucket || process.env.S3_BUCKET;
    const region = process.env.AWS_REGION || 'us-east-1';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!bucket || !accessKeyId || !secretAccessKey) {
        throw new Error('S3 storage not fully configured. Required: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET');
    }

    const key = generateStorageKey(config);
    const contentType = config.contentType || 'image/png';

    // Use S3 REST API directly with AWS Sig v4
    const host = `${bucket}.s3.${region}.amazonaws.com`;
    const url = `https://${host}/${key}`;
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const date = timestamp.slice(0, 8);

    const headers = signS3Request({
        method: 'PUT',
        host,
        key,
        contentType,
        body: data,
        accessKeyId,
        secretAccessKey,
        region,
        timestamp,
        date,
    });

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': contentType,
            'Content-Length': data.length.toString(),
        },
        body: new Uint8Array(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`S3 upload failed: ${response.status} ${errorText}`);
    }

    const resultUrl = config.acl === 'public-read'
        ? `https://${host}/${key}`
        : `s3://${bucket}/${key}`;

    return {
        url: resultUrl,
        bucket,
        key,
        size: data.length,
        provider: 's3',
    };
}

/**
 * Generate a unique storage key for the screenshot
 */
function generateStorageKey(config: StorageUploadConfig): string {
    const timestamp = Date.now();
    const hash = crypto.randomBytes(8).toString('hex');
    const filename = config.filename || `screenshot-${timestamp}-${hash}`;
    const extension = getExtensionFromContentType(config.contentType || 'image/png');
    const basePath = config.path || 'screenshots';
    return `${basePath}/${filename}.${extension}`;
}

function getExtensionFromContentType(contentType: string): string {
    switch (contentType) {
        case 'image/jpeg': return 'jpg';
        case 'image/webp': return 'webp';
        case 'application/pdf': return 'pdf';
        case 'image/png':
        default: return 'png';
    }
}

// --- AWS Signature V4 helpers ---

function hmacSHA256(key: Buffer | string, data: string): Buffer {
    return crypto.createHmac('sha256', key).update(data).digest();
}

function sha256(data: Buffer | string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}

interface R2SignParams {
    method: string;
    url: string;
    bucket: string;
    key: string;
    contentType: string;
    body: Buffer;
    accessKeyId: string;
    secretAccessKey: string;
    endpoint: string;
    timestamp: string;
    date: string;
}

async function signR2Request(params: R2SignParams): Promise<Record<string, string>> {
    const { method, bucket, key, contentType, body, accessKeyId, secretAccessKey, endpoint, timestamp, date } = params;

    const parsedEndpoint = new URL(endpoint);
    const host = `${bucket}.${parsedEndpoint.host}`;
    const region = 'auto'; // R2 uses 'auto' region
    const service = 's3';

    const payloadHash = sha256(body);
    const canonicalUri = `/${key}`;
    const canonicalQueryString = '';
    const canonicalHeaders = [
        `content-type:${contentType}`,
        `host:${host}`,
        `x-amz-content-sha256:${payloadHash}`,
        `x-amz-date:${timestamp}`,
    ].join('\n') + '\n';
    const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
        method,
        canonicalUri,
        canonicalQueryString,
        canonicalHeaders,
        signedHeaders,
        payloadHash,
    ].join('\n');

    const credentialScope = `${date}/${region}/${service}/aws4_request`;
    const stringToSign = [
        'AWS4-HMAC-SHA256',
        timestamp,
        credentialScope,
        sha256(canonicalRequest),
    ].join('\n');

    const signingKey = getSignatureKey(secretAccessKey, date, region, service);
    const signature = hmacSHA256(signingKey, stringToSign).toString('hex');

    return {
        'Host': host,
        'X-Amz-Date': timestamp,
        'X-Amz-Content-Sha256': payloadHash,
        'Authorization': `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    };
}

interface S3SignParams {
    method: string;
    host: string;
    key: string;
    contentType: string;
    body: Buffer;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    timestamp: string;
    date: string;
}

function signS3Request(params: S3SignParams): Record<string, string> {
    const { method, host, key, contentType, body, accessKeyId, secretAccessKey, region, timestamp, date } = params;

    const service = 's3';
    const payloadHash = sha256(body);
    const canonicalUri = `/${key}`;
    const canonicalQueryString = '';
    const canonicalHeaders = [
        `content-type:${contentType}`,
        `host:${host}`,
        `x-amz-content-sha256:${payloadHash}`,
        `x-amz-date:${timestamp}`,
    ].join('\n') + '\n';
    const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
        method,
        canonicalUri,
        canonicalQueryString,
        canonicalHeaders,
        signedHeaders,
        payloadHash,
    ].join('\n');

    const credentialScope = `${date}/${region}/${service}/aws4_request`;
    const stringToSign = [
        'AWS4-HMAC-SHA256',
        timestamp,
        credentialScope,
        sha256(canonicalRequest),
    ].join('\n');

    const signingKey = getSignatureKey(secretAccessKey, date, region, service);
    const signature = hmacSHA256(signingKey, stringToSign).toString('hex');

    return {
        'Host': host,
        'X-Amz-Date': timestamp,
        'X-Amz-Content-Sha256': payloadHash,
        'Authorization': `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    };
}

function getSignatureKey(key: string, dateStamp: string, region: string, service: string): Buffer {
    const kDate = hmacSHA256(`AWS4${key}`, dateStamp);
    const kRegion = hmacSHA256(kDate, region);
    const kService = hmacSHA256(kRegion, service);
    const kSigning = hmacSHA256(kService, 'aws4_request');
    return kSigning;
}
