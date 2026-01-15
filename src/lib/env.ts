import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Authentication
  CLERK_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  
  // AI/OpenAI
  OPENAI_API_KEY: z.string().min(1),
  
  // Redis (Rate Limiting)
  REDIS_URL: z.string().url().optional(),
  
  // Stripe (Payments)
  STRIPE_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  
  // App Configuration
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Optional
  NEXT_PUBLIC_PLAYGROUND_API_KEY: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

// Validate environment variables on startup
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}\n` +
        'Please check your .env file and ensure all required variables are set correctly.'
      );
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Export individual variables for convenience
export const {
  DATABASE_URL,
  CLERK_SECRET_KEY,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  OPENAI_API_KEY,
  REDIS_URL,
  STRIPE_SECRET_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_APP_URL,
  NODE_ENV,
  NEXT_PUBLIC_PLAYGROUND_API_KEY,
} = env; 