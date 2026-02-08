/**
 * Webhook delivery for async screenshot notifications.
 * Sends screenshot results to user-configured webhook URLs.
 */

import crypto from 'crypto';

interface WebhookConfig {
    url: string;
    method?: 'POST' | 'PUT';
    headers?: Record<string, string>;
    secret?: string;
}

interface WebhookPayload {
    event: 'screenshot.completed' | 'screenshot.failed';
    timestamp: string;
    data: {
        url: string;
        format: string;
        size?: number;
        storageUrl?: string;
        screenshotBase64?: string;
        error?: string;
        duration?: number;
    };
}

/**
 * Send a webhook notification with the screenshot result
 */
export async function sendWebhook(
    config: WebhookConfig,
    payload: WebhookPayload
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
    try {
        const body = JSON.stringify(payload);
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'User-Agent': 'Screenshotly-Webhook/1.0',
            ...config.headers,
        };

        // Sign payload with HMAC if secret is provided
        if (config.secret) {
            const signature = crypto
                .createHmac('sha256', config.secret)
                .update(body)
                .digest('hex');
            headers['X-Screenshotly-Signature'] = `sha256=${signature}`;
        }

        // Add timestamp header
        headers['X-Screenshotly-Timestamp'] = payload.timestamp;

        const response = await fetch(config.url, {
            method: config.method || 'POST',
            headers,
            body,
            signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        return {
            success: response.ok,
            statusCode: response.status,
        };
    } catch (error) {
        console.error('Webhook delivery failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Fire-and-forget webhook delivery (doesn't block the response)
 */
export function sendWebhookAsync(config: WebhookConfig, payload: WebhookPayload): void {
    // Use setImmediate to not block the event loop
    setImmediate(async () => {
        const result = await sendWebhook(config, payload);
        if (!result.success) {
            console.warn(`Webhook delivery failed: ${result.error || `HTTP ${result.statusCode}`}`);

            // Retry once after 5 seconds
            setTimeout(async () => {
                const retryResult = await sendWebhook(config, payload);
                if (!retryResult.success) {
                    console.error(
                        `Webhook retry failed: ${retryResult.error || `HTTP ${retryResult.statusCode}`}`
                    );
                }
            }, 5000);
        }
    });
}
