---
title: "Screenshot API for SaaS Applications: Complete Implementation Guide"
description: "Build screenshot features into your SaaS product. Learn multi-tenancy, usage tracking, billing integration, and white-labeling patterns."
excerpt: "Add screenshot capabilities to your SaaS platform. From usage metering to white-labeled screenshot services."
author: "asad-ali"
publishedAt: "2025-10-18"
category: "guide"
tags: ["saas", "multi-tenant", "billing", "architecture"]
keywords: ["saas screenshot api", "multi-tenant screenshots", "screenshot service", "saas integration", "usage based billing"]
featured: false
readingTime: 8
---

Many SaaS applications need screenshot features—link previews, PDF exports, thumbnail generation, visual testing. This guide covers building screenshot capabilities that scale with your SaaS platform.

## SaaS Architecture Patterns

### Multi-Tenant Screenshot Service

```javascript
class ScreenshotService {
  constructor(tenantId) {
    this.tenantId = tenantId;
    this.config = null;
  }

  async initialize() {
    this.config = await this.getTenantConfig();
  }

  async getTenantConfig() {
    return db.tenants.findOne({ id: this.tenantId });
  }

  async capture(url, options = {}) {
    // Check tenant quota
    const usage = await this.checkQuota();
    if (usage.remaining <= 0) {
      throw new QuotaExceededError(this.tenantId);
    }

    // Apply tenant-specific settings
    const tenantOptions = this.applyTenantSettings(options);

    // Capture screenshot
    const screenshot = await this.captureScreenshot(url, tenantOptions);

    // Track usage
    await this.recordUsage(url, screenshot.size);

    return screenshot;
  }

  applyTenantSettings(options) {
    const tenant = this.config;
    return {
      ...options,
      // Apply tenant branding
      watermark: tenant.settings.watermark,
      // Respect tenant format preferences
      format: options.format || tenant.settings.defaultFormat,
      // Apply tenant resolution limits
      viewport: {
        width: Math.min(options.viewport?.width || 1280, tenant.limits.maxWidth),
        height: Math.min(options.viewport?.height || 800, tenant.limits.maxHeight),
      },
    };
  }
}
```

### Tenant Configuration Schema

```javascript
const tenantSchema = {
  id: 'tenant_123',
  name: 'Acme Corp',
  plan: 'pro',
  settings: {
    defaultFormat: 'png',
    defaultDevice: 'desktop',
    watermark: null,
    customDomain: 'screenshots.acme.com',
  },
  limits: {
    monthlyQuota: 10000,
    maxConcurrent: 10,
    maxWidth: 1920,
    maxHeight: 1080,
    retentionDays: 30,
  },
  billing: {
    stripeCustomerId: 'cus_xxx',
    currentBillingCycleStart: '2025-01-01',
    usageThisMonth: 0,
  },
};
```

## Usage Tracking

### Real-Time Usage Metering

```javascript
class UsageMeter {
  constructor(redis) {
    this.redis = redis;
  }

  async recordCapture(tenantId, metadata) {
    const now = new Date();
    const monthKey = `usage:${tenantId}:${now.getFullYear()}-${now.getMonth() + 1}`;
    const dayKey = `usage:${tenantId}:${now.toISOString().split('T')[0]}`;

    const pipeline = this.redis.pipeline();

    // Increment monthly counter
    pipeline.hincrby(monthKey, 'total', 1);
    pipeline.hincrby(monthKey, 'bytes', metadata.size);
    pipeline.expire(monthKey, 60 * 60 * 24 * 45); // Keep 45 days

    // Increment daily counter
    pipeline.hincrby(dayKey, 'total', 1);
    pipeline.expire(dayKey, 60 * 60 * 24 * 7); // Keep 7 days

    // Track by feature
    pipeline.hincrby(monthKey, `feature:${metadata.feature}`, 1);

    await pipeline.exec();

    return this.getCurrentUsage(tenantId);
  }

  async getCurrentUsage(tenantId) {
    const now = new Date();
    const monthKey = `usage:${tenantId}:${now.getFullYear()}-${now.getMonth() + 1}`;

    const data = await this.redis.hgetall(monthKey);
    return {
      total: parseInt(data.total || '0'),
      bytes: parseInt(data.bytes || '0'),
    };
  }

  async getUsageHistory(tenantId, days = 30) {
    const history = [];
    const now = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = `usage:${tenantId}:${date.toISOString().split('T')[0]}`;

      const data = await this.redis.hgetall(key);
      history.push({
        date: date.toISOString().split('T')[0],
        total: parseInt(data.total || '0'),
        bytes: parseInt(data.bytes || '0'),
      });
    }

    return history.reverse();
  }
}
```

### Quota Management

```javascript
class QuotaManager {
  constructor(db, usageMeter) {
    this.db = db;
    this.usageMeter = usageMeter;
  }

  async checkQuota(tenantId) {
    const [tenant, usage] = await Promise.all([
      this.db.tenants.findOne({ id: tenantId }),
      this.usageMeter.getCurrentUsage(tenantId),
    ]);

    const limit = tenant.limits.monthlyQuota;
    const used = usage.total;
    const remaining = Math.max(0, limit - used);
    const percentUsed = (used / limit) * 100;

    return {
      limit,
      used,
      remaining,
      percentUsed,
      isExceeded: remaining <= 0,
      warningLevel: this.getWarningLevel(percentUsed),
    };
  }

  getWarningLevel(percentUsed) {
    if (percentUsed >= 100) return 'exceeded';
    if (percentUsed >= 90) return 'critical';
    if (percentUsed >= 75) return 'warning';
    return 'normal';
  }

  async sendQuotaAlerts(tenantId) {
    const quota = await this.checkQuota(tenantId);
    const tenant = await this.db.tenants.findOne({ id: tenantId });

    if (quota.warningLevel === 'warning' && !tenant.alerts.warning75Sent) {
      await this.sendAlert(tenant, '75% of quota used');
      await this.db.tenants.updateOne(
        { id: tenantId },
        { 'alerts.warning75Sent': true }
      );
    }

    if (quota.warningLevel === 'critical' && !tenant.alerts.warning90Sent) {
      await this.sendAlert(tenant, '90% of quota used');
      await this.db.tenants.updateOne(
        { id: tenantId },
        { 'alerts.warning90Sent': true }
      );
    }

    if (quota.warningLevel === 'exceeded' && !tenant.alerts.exceededSent) {
      await this.sendAlert(tenant, 'Quota exceeded');
      await this.db.tenants.updateOne(
        { id: tenantId },
        { 'alerts.exceededSent': true }
      );
    }
  }
}
```

## Billing Integration

### Stripe Usage-Based Billing

```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class BillingService {
  async reportUsage(tenantId) {
    const tenant = await db.tenants.findOne({ id: tenantId });
    const usage = await usageMeter.getCurrentUsage(tenantId);

    // Find or create usage record
    const subscriptionItem = tenant.billing.subscriptionItemId;

    // Report to Stripe
    await stripe.subscriptionItems.createUsageRecord(
      subscriptionItem,
      {
        quantity: usage.total,
        timestamp: Math.floor(Date.now() / 1000),
        action: 'set',
      }
    );

    return usage;
  }

  async createSubscription(tenantId, planId) {
    const tenant = await db.tenants.findOne({ id: tenantId });

    const subscription = await stripe.subscriptions.create({
      customer: tenant.billing.stripeCustomerId,
      items: [
        { price: planId },
      ],
    });

    await db.tenants.updateOne(
      { id: tenantId },
      {
        'billing.subscriptionId': subscription.id,
        'billing.subscriptionItemId': subscription.items.data[0].id,
      }
    );

    return subscription;
  }

  async handleWebhook(event) {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        await this.resetMonthlyQuota(event.data.object.customer);
        break;
      case 'customer.subscription.deleted':
        await this.handleCancellation(event.data.object.customer);
        break;
    }
  }

  async resetMonthlyQuota(stripeCustomerId) {
    const tenant = await db.tenants.findOne({
      'billing.stripeCustomerId': stripeCustomerId,
    });

    await db.tenants.updateOne(
      { id: tenant.id },
      {
        'billing.currentBillingCycleStart': new Date(),
        'alerts.warning75Sent': false,
        'alerts.warning90Sent': false,
        'alerts.exceededSent': false,
      }
    );
  }
}
```

## White-Label Implementation

### Custom Domains

```javascript
class WhiteLabelService {
  async setupCustomDomain(tenantId, domain) {
    // Verify domain ownership
    const verified = await this.verifyDomain(domain);
    if (!verified) {
      throw new Error('Domain verification failed');
    }

    // Configure SSL
    await this.provisionSSL(domain);

    // Update tenant config
    await db.tenants.updateOne(
      { id: tenantId },
      { 'settings.customDomain': domain }
    );

    return { domain, status: 'active' };
  }

  async verifyDomain(domain) {
    // Check for TXT record
    const records = await dns.promises.resolveTxt(`_screenshotly.${domain}`);
    return records.some(r => r.includes('verify='));
  }

  async routeRequest(req, res, next) {
    const host = req.hostname;

    // Find tenant by custom domain
    const tenant = await db.tenants.findOne({
      'settings.customDomain': host,
    });

    if (tenant) {
      req.tenantId = tenant.id;
      req.whiteLabeled = true;
    }

    next();
  }
}
```

### Branded Output

```javascript
async function captureWithBranding(url, tenant, options) {
  const screenshot = await captureScreenshot(url, options);

  // Apply tenant watermark if configured
  if (tenant.settings.watermark) {
    return addWatermark(screenshot, tenant.settings.watermark);
  }

  // Remove our branding for white-label tenants
  if (tenant.plan === 'enterprise') {
    return screenshot; // No branding
  }

  // Add subtle branding for standard plans
  return addWatermark(screenshot, {
    text: 'Powered by Screenshotly',
    position: 'bottom-right',
    opacity: 0.3,
  });
}
```

## API Key Management

### Multi-Key Support

```javascript
class ApiKeyManager {
  async createKey(tenantId, name, scopes = []) {
    const key = crypto.randomBytes(32).toString('hex');
    const hashedKey = await bcrypt.hash(key, 10);

    const apiKey = {
      id: `key_${nanoid()}`,
      tenantId,
      name,
      keyHash: hashedKey,
      prefix: key.slice(0, 8),
      scopes,
      createdAt: new Date(),
      lastUsedAt: null,
    };

    await db.apiKeys.insertOne(apiKey);

    // Return unhashed key only once
    return {
      id: apiKey.id,
      key: `sk_${key}`,
      prefix: apiKey.prefix,
    };
  }

  async validateKey(rawKey) {
    const key = rawKey.replace('sk_', '');
    const prefix = key.slice(0, 8);

    // Find by prefix for faster lookup
    const candidates = await db.apiKeys.find({ prefix }).toArray();

    for (const candidate of candidates) {
      const valid = await bcrypt.compare(key, candidate.keyHash);
      if (valid) {
        // Update last used
        await db.apiKeys.updateOne(
          { id: candidate.id },
          { lastUsedAt: new Date() }
        );
        return candidate;
      }
    }

    return null;
  }

  async revokeKey(tenantId, keyId) {
    const result = await db.apiKeys.deleteOne({
      id: keyId,
      tenantId,
    });
    return result.deletedCount > 0;
  }
}
```

## Rate Limiting Per Tenant

```javascript
import { RateLimiterRedis } from 'rate-limiter-flexible';

class TenantRateLimiter {
  constructor(redis) {
    this.redis = redis;
    this.limiters = new Map();
  }

  getLimiter(tenant) {
    const key = tenant.id;

    if (!this.limiters.has(key)) {
      const limiter = new RateLimiterRedis({
        storeClient: this.redis,
        keyPrefix: `ratelimit:${key}`,
        points: tenant.limits.requestsPerMinute || 60,
        duration: 60,
      });
      this.limiters.set(key, limiter);
    }

    return this.limiters.get(key);
  }

  async consume(tenant) {
    const limiter = this.getLimiter(tenant);

    try {
      const result = await limiter.consume(tenant.id);
      return {
        allowed: true,
        remaining: result.remainingPoints,
        resetMs: result.msBeforeNext,
      };
    } catch (error) {
      return {
        allowed: false,
        remaining: 0,
        resetMs: error.msBeforeNext,
      };
    }
  }
}
```

## Dashboard API

### Usage Dashboard Endpoints

```javascript
app.get('/api/dashboard/usage', async (req, res) => {
  const tenantId = req.tenantId;

  const [quota, history, breakdown] = await Promise.all([
    quotaManager.checkQuota(tenantId),
    usageMeter.getUsageHistory(tenantId, 30),
    usageMeter.getFeatureBreakdown(tenantId),
  ]);

  res.json({
    quota,
    history,
    breakdown,
  });
});

app.get('/api/dashboard/keys', async (req, res) => {
  const tenantId = req.tenantId;

  const keys = await db.apiKeys.find(
    { tenantId },
    { projection: { keyHash: 0 } }
  ).toArray();

  res.json({ keys });
});

app.post('/api/dashboard/keys', async (req, res) => {
  const tenantId = req.tenantId;
  const { name, scopes } = req.body;

  const key = await apiKeyManager.createKey(tenantId, name, scopes);

  res.json({
    message: 'Save this key - it will not be shown again',
    ...key,
  });
});
```

## Best Practices

### 1. Isolate Tenant Data

```javascript
// Always scope queries to tenant
async function getScreenshots(tenantId, options) {
  return db.screenshots.find({
    tenantId, // Always include tenant filter
    ...options,
  });
}
```

### 2. Graceful Degradation

```javascript
async function captureWithFallback(url, tenant) {
  try {
    return await captureScreenshot(url);
  } catch (error) {
    if (tenant.plan === 'enterprise') {
      throw error; // Don't hide errors for enterprise
    }

    // Return placeholder for free/basic plans
    return getPlaceholderImage();
  }
}
```

### 3. Audit Logging

```javascript
async function logCapture(tenant, url, result) {
  await db.auditLog.insertOne({
    tenantId: tenant.id,
    action: 'screenshot.capture',
    url,
    status: result.success ? 'success' : 'failed',
    timestamp: new Date(),
    metadata: {
      size: result.size,
      format: result.format,
      duration: result.duration,
    },
  });
}
```

## Conclusion

Building screenshot features for SaaS requires:

1. **Multi-tenancy** - Isolated configuration and data
2. **Usage tracking** - Real-time metering
3. **Billing integration** - Usage-based pricing
4. **Rate limiting** - Per-tenant controls
5. **White-labeling** - Custom domains and branding

These patterns scale from small apps to enterprise platforms.

---

**Ready to add screenshots to your SaaS?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Batch Processing Guide →](/blog/batch-screenshot-processing)
