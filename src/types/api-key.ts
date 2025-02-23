export interface ApiKey {
  id: string;
  userId: string;
  key: string;
  name: string;
  createdAt: Date;
  expiresAt: Date;
  lastUsedAt?: Date;
  revokedAt?: Date;
  usageCount: number;
  rateLimit: {
    requests: number;
    period: number; // in seconds
  };
} 