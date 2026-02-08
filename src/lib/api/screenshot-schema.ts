import { z } from 'zod';
import { mockupTemplates } from '@/data/mockupTemplates';

// Predefined device viewports
export const deviceViewports = {
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
} as const;

// Create mockup template map from the enhanced template data
export const mockupMap = mockupTemplates.reduce((acc, template) => {
  acc[template.id] = {
    path: template.imagePath,
    screenshotPlacement: {
      x: template.screenshotPlacement.x,
      y: template.screenshotPlacement.y,
      width: template.screenshotPlacement.width,
      height: template.screenshotPlacement.height,
    }
  };
  return acc;
}, {} as Record<string, { path: string; screenshotPlacement: { x: number; y: number; width: number; height: number } }>);

// Get all available mockup IDs for the schema
const availableMockupIds = mockupTemplates.map(template => template.id);

export const screenshotSchema = z.object({
  // Core parameters
  url: z.string().url(),
  device: z.enum(['desktop', 'laptop', 'tablet', 'mobile']).optional(),
  width: z.number().min(320).max(3840).optional(),
  height: z.number().min(240).max(3840).optional(),
  fullPage: z.boolean().optional().default(false),
  format: z.enum(['png', 'jpeg', 'webp', 'pdf']).optional().default('png'),
  quality: z.number().min(0).max(100).optional().default(100),
  delay: z.number().min(0).max(10000).optional().default(0),
  selector: z.string().optional(),
  mockup: z.enum(availableMockupIds as [string, ...string[]]).optional(),

  // AI element removal
  aiRemoval: z.object({
    enabled: z.boolean().optional().default(false),
    types: z.array(
      z.enum(['cookie-banner', 'newsletter', 'chat-widget', 'social-overlay', 'ad'])
    ).optional().default([]),
    confidence: z.number().min(0).max(1).optional().default(0.8),
  }).optional().default({}),

  // Ad blocking (Basic+)
  blockAds: z.boolean().optional().default(false),

  // Stealth mode — avoid bot detection (Basic+)
  stealth: z.boolean().optional().default(false),

  // Caching — return cached result if available (Basic+)
  cache: z.boolean().optional().default(false),
  cacheTtl: z.number().min(60).max(86400).optional().default(3600), // seconds, 1 hour default

  // Geolocation proxy (Growth+)
  geolocation: z.object({
    country: z.string().length(2).optional(), // ISO 3166-1 alpha-2
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
  }).optional(),

  // Scrolling screenshot (Growth+)
  scroll: z.object({
    enabled: z.boolean().optional().default(false),
    direction: z.enum(['vertical', 'horizontal']).optional().default('vertical'),
    distance: z.number().min(100).max(50000).optional(), // px to scroll
    speed: z.number().min(100).max(5000).optional().default(500), // px per second
  }).optional(),

  // S3 storage delivery (Basic+)
  storage: z.object({
    enabled: z.boolean().optional().default(false),
    bucket: z.string().optional(),
    path: z.string().optional(),
    acl: z.enum(['private', 'public-read']).optional().default('private'),
  }).optional(),

  // Webhook callback (Basic+)
  webhook: z.object({
    url: z.string().url().optional(),
    method: z.enum(['POST', 'PUT']).optional().default('POST'),
    headers: z.record(z.string()).optional(),
    secret: z.string().optional(), // for HMAC signing
  }).optional(),

  // Custom headers for the target page
  headers: z.record(z.string()).optional(),

  // Custom cookies to inject
  cookies: z.array(z.object({
    name: z.string(),
    value: z.string(),
    domain: z.string().optional(),
    path: z.string().optional().default('/'),
    httpOnly: z.boolean().optional(),
    secure: z.boolean().optional(),
  })).optional(),

  // Wait for selector before capture
  waitForSelector: z.string().optional(),

  // Wait for network idle (wait for all requests to finish)
  waitForNetworkIdle: z.boolean().optional().default(false),

  // JavaScript to execute before capture
  javascript: z.string().max(5000).optional(),

  // Dark mode
  darkMode: z.boolean().optional().default(false),

  // Clip region
  clip: z.object({
    x: z.number().min(0),
    y: z.number().min(0),
    width: z.number().min(1),
    height: z.number().min(1),
  }).optional(),

  // Pixel density / device scale factor
  deviceScaleFactor: z.number().min(1).max(3).optional().default(1),

  // Hide/block specific selectors
  hideSelectors: z.array(z.string()).optional(),

  // User agent override
  userAgent: z.string().optional(),

  // Timezone override
  timezone: z.string().optional(),
});

export type ScreenshotRequest = z.infer<typeof screenshotSchema>;
