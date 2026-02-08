---
title: "Node.js Screenshot API: Complete Integration Guide"
description: "Learn how to capture website screenshots in Node.js applications. Covers Express integration, webhooks, async processing, and production deployment."
excerpt: "A comprehensive Node.js guide for screenshot API integration. From basic captures to production-ready async processing with webhooks."
author: "asad-ali"
publishedAt: "2026-01-25"
category: "tutorial"
tags: ["nodejs", "tutorial", "api", "express", "automation"]
keywords: ["nodejs screenshot", "node screenshot api", "express screenshot", "javascript screenshot automation"]
featured: false
readingTime: 11
---

Node.js is one of the most popular environments for building APIs and automation tools. Whether you're building a documentation system, social media tool, or testing pipeline, integrating screenshot capabilities into your Node.js application is straightforward with a REST API.

In this comprehensive guide, we'll cover everything from basic screenshot capture to production-ready implementations with webhooks, queuing, and error handling.

## Getting Started

### Installation

Create a new Node.js project and install dependencies:

```bash
mkdir screenshot-app
cd screenshot-app
npm init -y
npm install express dotenv
```

Set up your environment:

```bash
# .env
SCREENSHOTLY_API_KEY=your_api_key_here
PORT=3000
```

### Basic Screenshot Function

Here's the simplest way to capture a screenshot in Node.js:

```javascript
// screenshot.js
require('dotenv').config();

const API_KEY = process.env.SCREENSHOTLY_API_KEY;

async function captureScreenshot(url, options = {}) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: options.device || 'desktop',
      format: options.format || 'png',
      fullPage: options.fullPage || false,
      ...options,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Screenshot failed: ${response.status} - ${error}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

module.exports = { captureScreenshot };
```

### Express API Endpoint

Create an Express server that exposes screenshot functionality:

```javascript
// server.js
require('dotenv').config();
const express = require('express');
const { captureScreenshot } = require('./screenshot');

const app = express();
app.use(express.json());

// Screenshot endpoint
app.post('/api/screenshot', async (req, res) => {
  const { url, device, format, fullPage } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const screenshot = await captureScreenshot(url, {
      device,
      format,
      fullPage,
    });

    const contentType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    res.setHeader('Content-Type', contentType);
    res.send(screenshot);
  } catch (error) {
    console.error('Screenshot error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Test it:

```bash
curl -X POST http://localhost:3000/api/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' \
  --output screenshot.png
```

## Advanced Features

### AI Element Removal

Remove distracting elements like cookie banners and chat widgets:

```javascript
async function captureCleanScreenshot(url) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'chat-widget', 'popup', 'notification'],
      },
    }),
  });

  return Buffer.from(await response.arrayBuffer());
}
```

### Device Mockups

Generate marketing-ready screenshots with device frames:

```javascript
async function captureWithMockup(url, mockupType) {
  // Available types: 'browser-light', 'browser-dark', 'iphone', 'macbook', 'android'
  
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
      mockup: {
        type: mockupType,
        shadow: true,
        background: '#f5f5f5',
      },
    }),
  });

  return Buffer.from(await response.arrayBuffer());
}
```

### Full-Page Capture

Capture entire scrollable pages:

```javascript
async function captureFullPage(url) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
      fullPage: true,
    }),
  });

  return Buffer.from(await response.arrayBuffer());
}
```

### PDF Generation

Convert web pages to PDF documents:

```javascript
async function generatePDF(url, options = {}) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      format: 'pdf',
      pdfOptions: {
        pageSize: options.pageSize || 'A4',
        printBackground: options.printBackground !== false,
        margin: options.margin || {
          top: '20mm',
          bottom: '20mm',
          left: '15mm',
          right: '15mm',
        },
      },
    }),
  });

  return Buffer.from(await response.arrayBuffer());
}
```

## Production Patterns

### Async Processing with Queues

For high-volume applications, use a queue to process screenshots asynchronously:

```javascript
// queue.js
const Queue = require('bull');
const { captureScreenshot } = require('./screenshot');
const Redis = require('ioredis');

const screenshotQueue = new Queue('screenshots', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

// Process screenshots
screenshotQueue.process(async (job) => {
  const { url, options, callbackUrl } = job.data;
  
  try {
    const screenshot = await captureScreenshot(url, options);
    
    // Store result (e.g., upload to S3)
    const resultUrl = await uploadToS3(screenshot, job.id);
    
    // Notify callback if provided
    if (callbackUrl) {
      await fetch(callbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          status: 'completed',
          url: resultUrl,
        }),
      });
    }
    
    return { status: 'completed', url: resultUrl };
  } catch (error) {
    console.error(`Job ${job.id} failed:`, error.message);
    throw error;
  }
});

// API endpoint to queue screenshots
app.post('/api/screenshot/async', async (req, res) => {
  const { url, options, callbackUrl } = req.body;
  
  const job = await screenshotQueue.add({
    url,
    options,
    callbackUrl,
  });
  
  res.json({
    jobId: job.id,
    status: 'queued',
  });
});

// Check job status
app.get('/api/screenshot/status/:jobId', async (req, res) => {
  const job = await screenshotQueue.getJob(req.params.jobId);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  const state = await job.getState();
  const result = job.returnvalue;
  
  res.json({
    jobId: job.id,
    state,
    result,
  });
});
```

### Webhook Integration

Receive notifications when screenshots complete:

```javascript
// webhook-handler.js
app.post('/api/webhook/screenshot', async (req, res) => {
  const { jobId, status, url, error } = req.body;
  
  // Verify webhook signature (implementation depends on your auth strategy)
  if (!verifyWebhookSignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  if (status === 'completed') {
    // Process successful screenshot
    console.log(`Screenshot ${jobId} completed: ${url}`);
    await updateDatabase(jobId, { status: 'completed', url });
  } else {
    // Handle failure
    console.error(`Screenshot ${jobId} failed: ${error}`);
    await updateDatabase(jobId, { status: 'failed', error });
  }
  
  res.json({ received: true });
});
```

### Caching Layer

Reduce API calls and costs with caching:

```javascript
// cache.js
const Redis = require('ioredis');
const crypto = require('crypto');

const redis = new Redis(process.env.REDIS_URL);
const CACHE_TTL = 3600; // 1 hour

function generateCacheKey(url, options) {
  const data = JSON.stringify({ url, ...options });
  return `screenshot:${crypto.createHash('md5').update(data).digest('hex')}`;
}

async function getCachedScreenshot(url, options) {
  const key = generateCacheKey(url, options);
  const cached = await redis.getBuffer(key);
  return cached;
}

async function cacheScreenshot(url, options, screenshot) {
  const key = generateCacheKey(url, options);
  await redis.setex(key, CACHE_TTL, screenshot);
}

async function captureWithCache(url, options = {}) {
  // Check cache first
  const cached = await getCachedScreenshot(url, options);
  if (cached) {
    console.log('Cache hit');
    return cached;
  }
  
  // Capture and cache
  console.log('Cache miss, capturing...');
  const screenshot = await captureScreenshot(url, options);
  await cacheScreenshot(url, options, screenshot);
  
  return screenshot;
}
```

### Rate Limiting

Protect your API from abuse:

```javascript
// rate-limit.js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

const screenshotLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: {
    error: 'Too many requests, please try again later',
  },
  keyGenerator: (req) => {
    // Rate limit by API key or IP
    return req.headers['x-api-key'] || req.ip;
  },
});

app.use('/api/screenshot', screenshotLimiter);
```

### Error Handling

Robust error handling for production:

```javascript
// error-handler.js
class ScreenshotError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

async function captureWithErrorHandling(url, options = {}) {
  const maxRetries = options.retries || 3;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          device: options.device || 'desktop',
          format: options.format || 'png',
          ...options,
        }),
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (response.ok) {
        return Buffer.from(await response.arrayBuffer());
      }

      const errorText = await response.text();
      
      // Don't retry client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new ScreenshotError(
          `Client error: ${response.status}`,
          response.status,
          errorText
        );
      }
      
      // Retry server errors (5xx)
      lastError = new ScreenshotError(
        `Server error: ${response.status}`,
        response.status,
        errorText
      );
      
    } catch (error) {
      if (error instanceof ScreenshotError && error.statusCode < 500) {
        throw error;
      }
      
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Retry ${attempt}/${maxRetries} in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}
```

## Complete Application

Here's a production-ready Express application combining all patterns:

```javascript
// app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const { captureWithCache } = require('./cache');
const { screenshotLimiter } = require('./rate-limit');
const { captureWithErrorHandling } = require('./error-handler');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Screenshot endpoint with all features
app.post('/api/screenshot', screenshotLimiter, async (req, res) => {
  const {
    url,
    device = 'desktop',
    format = 'png',
    fullPage = false,
    cache = true,
    aiRemoval = false,
    mockup = null,
  } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const options = {
      device,
      format,
      fullPage,
    };
    
    if (aiRemoval) {
      options.aiRemoval = {
        enabled: true,
        types: ['cookie-banner', 'chat-widget', 'popup'],
      };
    }
    
    if (mockup) {
      options.mockup = { type: mockup, shadow: true };
    }

    let screenshot;
    if (cache) {
      screenshot = await captureWithCache(url, options);
    } else {
      screenshot = await captureWithErrorHandling(url, options);
    }

    const contentType = format === 'jpeg' ? 'image/jpeg' 
                     : format === 'pdf' ? 'application/pdf' 
                     : 'image/png';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(screenshot);
    
  } catch (error) {
    console.error('Screenshot error:', error);
    
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message,
      details: error.details,
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Screenshot API running on port ${PORT}`);
});
```

## Deployment Considerations

### Environment Variables

```bash
# Required
SCREENSHOTLY_API_KEY=your_api_key

# Optional
PORT=3000
REDIS_URL=redis://localhost:6379
NODE_ENV=production
```

### Docker Deployment

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

### Health Monitoring

Add metrics for production monitoring:

```javascript
const promClient = require('prom-client');

// Metrics
const screenshotCounter = new promClient.Counter({
  name: 'screenshots_total',
  help: 'Total screenshots captured',
  labelNames: ['status', 'device'],
});

const screenshotDuration = new promClient.Histogram({
  name: 'screenshot_duration_seconds',
  help: 'Screenshot capture duration',
  buckets: [0.5, 1, 2, 5, 10, 30],
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.send(await promClient.register.metrics());
});
```

## Conclusion

Building screenshot capabilities into Node.js applications is straightforward with a REST API. We've covered:

1. **Basic integration** - Simple function to capture screenshots
2. **Express endpoints** - RESTful API for your application
3. **Advanced features** - AI removal, mockups, full-page capture
4. **Production patterns** - Caching, queuing, rate limiting, error handling
5. **Deployment** - Docker, environment configuration, monitoring

Start with the basic implementation and add complexity as your needs grow.

---

**Ready to add screenshots to your Node.js app?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See the [Node.js SDK documentation →](/integrations/nodejs) for more examples.
