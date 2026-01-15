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
  url: z.string().url(),
  device: z.enum(['desktop', 'laptop', 'tablet', 'mobile']).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  fullPage: z.boolean().optional().default(false),
  format: z.enum(['png', 'jpeg', 'pdf']).optional().default('png'),
  quality: z.number().min(0).max(100).optional().default(100),
  delay: z.number().min(0).max(10000).optional().default(0),
  selector: z.string().optional(),
  mockup: z.enum(availableMockupIds as [string, ...string[]]).optional(),
  aiRemoval: z.object({
    enabled: z.boolean().optional().default(false),
    types: z.array(
      z.enum(['cookie-banner', 'newsletter', 'chat-widget', 'social-overlay', 'ad'])
    ).optional().default([]),
    confidence: z.number().min(0).max(1).optional().default(0.8),
  }).optional().default({}),
});

export type ScreenshotRequest = z.infer<typeof screenshotSchema>;
