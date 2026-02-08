import sharp from 'sharp';
import path from 'path';
import { mockupMap } from './screenshot-schema';

// Helper function to safely perform sharp operations
export async function safeSharpResize(screenshot: Buffer, width: number, height: number, options: object): Promise<Buffer> {
  if (!Buffer.isBuffer(screenshot)) {
    throw new Error(`Sharp resize input must be Buffer, got ${typeof screenshot}`);
  }

  try {
    // Create a fresh Sharp instance from the buffer
    const sharpInstance = sharp(Buffer.from(screenshot));

    // Apply resize with explicit options
    const resizedInstance = sharpInstance.resize(width, height, options);

    // Convert to buffer
    const result = await resizedInstance.toBuffer();

    return Buffer.from(result);
  } catch (error) {
    console.error('Sharp resize operation failed:', error);
    throw new Error(`Sharp resize failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function applyMockup(screenshot: Buffer, mockupType: string): Promise<Buffer> {
  // Validate screenshot is a proper Buffer
  if (!Buffer.isBuffer(screenshot)) {
    throw new Error(`Mockup input must be Buffer, got ${typeof screenshot}`);
  }

  const mockupConfig = mockupMap[mockupType];
  if (!mockupConfig) {
    throw new Error(`Mockup template '${mockupType}' not found`);
  }

  try {
    const mockupPath = path.join(process.cwd(), 'public', mockupConfig.path);

    // Load the mockup template
    const mockupImage = sharp(mockupPath);
    const mockupMetadata = await mockupImage.metadata();

    if (!mockupMetadata.width || !mockupMetadata.height) {
      throw new Error('Could not determine mockup dimensions');
    }

    // Get placement configuration
    const placement = mockupConfig.screenshotPlacement;

    // Resize screenshot to fit the placement area
    const resizedScreenshot = await safeSharpResize(
      screenshot,
      placement.width,
      placement.height,
      {
        fit: 'fill',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    );

    // Composite the screenshot onto the mockup
    const result = await mockupImage
      .composite([{
        input: resizedScreenshot,
        top: placement.y,
        left: placement.x,
      }])
      .png()
      .toBuffer();

    return Buffer.from(result);
  } catch (error) {
    console.error('Mockup application failed:', error);
    throw new Error(`Mockup application failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getViewportDimensions(device?: string, width?: number, height?: number) {
  if (width && height) {
    return { width, height };
  }

  if (device && device in mockupMap) {
    const deviceConfig = mockupMap[device as keyof typeof mockupMap];
    return {
      width: deviceConfig.screenshotPlacement.width,
      height: deviceConfig.screenshotPlacement.height
    };
  }

  // Default fallback
  return { width: 1920, height: 1080 };
}

export function getContentType(format: string): string {
  switch (format) {
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'pdf':
      return 'application/pdf';
    case 'png':
    default:
      return 'image/png';
  }
}

export function getFileExtension(format: string): string {
  switch (format) {
    case 'jpeg':
      return 'jpg';
    case 'webp':
      return 'webp';
    case 'pdf':
      return 'pdf';
    case 'png':
    default:
      return 'png';
  }
}
