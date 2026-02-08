---
title: "Batch Screenshot Processing: High-Volume Capture at Scale"
slug: "batch-screenshot-processing"
excerpt: "Learn how to capture thousands of screenshots efficiently with parallel processing, rate limiting, error handling, and queue management."
publishedAt: "2024-12-10T10:00:00Z"
updatedAt: "2025-02-05T10:00:00Z"
author: "asad-ali"
category: "guide"
tags: ["batch", "automation", "scale", "performance"]
keywords: 
  - "batch screenshot processing"
  - "bulk screenshot API"
  - "screenshot automation at scale"
  - "parallel screenshot capture"
  - "high volume screenshots"
  - "screenshot queue processing"
  - "mass website capture"
readingTime: 14
featured: false
image: "/images/blog/batch-processing/hero.jpg"
faqs:
  - question: "How many screenshots can I process at once?"
    answer: "Screenshotly supports up to 50 concurrent requests per API key. For higher concurrency, consider our Enterprise plan or implement request queuing to stay within limits while maintaining throughput."
  - question: "How do I handle failures in batch processing?"
    answer: "Implement retry logic with exponential backoff. Store failed URLs separately and reprocess them. Use dead letter queues for permanently failed captures that need manual review."
  - question: "What's the best batch size for processing?"
    answer: "Start with batches of 10-20 concurrent requests. Monitor rate limits and adjust based on your plan limits. Too many concurrent requests can trigger rate limiting; too few wastes time."
  - question: "How do I track progress of batch jobs?"
    answer: "Implement a progress tracker that logs completed, failed, and pending counts. Store results in a database or file system with status flags. Consider webhooks for real-time updates."
---

## When You Need Batch Processing

Single screenshot captures are straightforward. But real-world applications often require capturing hundreds or thousands of pages:

- **Site audits**: Screenshot every page for visual review
- **Competitor monitoring**: Daily captures of competitor sites
- **Archive creation**: Document entire websites
- **E-commerce catalogs**: Capture all product pages
- **Testing suites**: Visual regression across many routes
- **Content aggregation**: Screenshot multiple sources

Processing these efficiently requires careful orchestration of parallel requests, error handling, and resource management.

## Basic Batch Processing

### Simple Sequential Processing

The simplest approach processes URLs one at a time:

```javascript
async function captureSequential(urls) {
  const results = [];

  for (const url of urls) {
    try {
      const screenshot = await captureScreenshot(url);
      results.push({ url, success: true, screenshot });
    } catch (error) {
      results.push({ url, success: false, error: error.message });
    }
  }

  return results;
}

async function captureScreenshot(url) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
    }),
  });

  if (!response.ok) {
    throw new Error(`Capture failed: ${response.status}`);
  }

  return response.arrayBuffer();
}
```

**Problem**: This is slow. Capturing 100 URLs at 3 seconds each takes 5+ minutes.

### Parallel Batch Processing

Process multiple URLs simultaneously:

```javascript
async function captureBatch(urls, concurrency = 10) {
  const results = [];

  // Process in chunks
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);

    const batchResults = await Promise.all(
      batch.map(async (url) => {
        try {
          const screenshot = await captureScreenshot(url);
          return { url, success: true, screenshot };
        } catch (error) {
          return { url, success: false, error: error.message };
        }
      })
    );

    results.push(...batchResults);

    // Log progress
    console.log(`Processed ${Math.min(i + concurrency, urls.length)}/${urls.length}`);
  }

  return results;
}
```

**Improvement**: 100 URLs at 10 concurrent takes ~30 seconds instead of 5 minutes.

## Advanced Batch Patterns

### Rate-Limited Processing

Respect API rate limits to avoid errors:

```javascript
class RateLimitedBatcher {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 10;
    this.requestsPerMinute = options.requestsPerMinute || 60;
    this.requestCount = 0;
    this.windowStart = Date.now();
  }

  async waitForRateLimit() {
    const now = Date.now();
    const windowElapsed = now - this.windowStart;

    if (windowElapsed >= 60000) {
      // Reset window
      this.requestCount = 0;
      this.windowStart = now;
      return;
    }

    if (this.requestCount >= this.requestsPerMinute) {
      // Wait for window to reset
      const waitTime = 60000 - windowElapsed;
      console.log(`Rate limit reached, waiting ${waitTime}ms`);
      await new Promise((r) => setTimeout(r, waitTime));
      this.requestCount = 0;
      this.windowStart = Date.now();
    }
  }

  async captureWithRateLimit(url) {
    await this.waitForRateLimit();
    this.requestCount++;
    return captureScreenshot(url);
  }

  async processBatch(urls) {
    const results = [];

    for (let i = 0; i < urls.length; i += this.concurrency) {
      const batch = urls.slice(i, i + this.concurrency);

      const batchResults = await Promise.all(
        batch.map(async (url) => {
          try {
            const screenshot = await this.captureWithRateLimit(url);
            return { url, success: true, screenshot };
          } catch (error) {
            return { url, success: false, error: error.message };
          }
        })
      );

      results.push(...batchResults);
    }

    return results;
  }
}

// Usage
const batcher = new RateLimitedBatcher({
  concurrency: 10,
  requestsPerMinute: 100,
});

const results = await batcher.processBatch(urls);
```

### Retry Logic with Exponential Backoff

Handle transient failures gracefully:

```javascript
async function captureWithRetry(url, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await captureScreenshot(url);
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`Attempt ${attempt} failed for ${url}, retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw lastError;
}

async function captureBatchWithRetry(urls, concurrency = 10) {
  const results = [];
  const failed = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);

    const batchResults = await Promise.all(
      batch.map(async (url) => {
        try {
          const screenshot = await captureWithRetry(url);
          return { url, success: true, screenshot };
        } catch (error) {
          failed.push({ url, error: error.message });
          return { url, success: false, error: error.message };
        }
      })
    );

    results.push(...batchResults);
  }

  return { results, failed };
}
```

### Progress Tracking

Monitor batch job progress:

```javascript
class BatchProcessor {
  constructor(urls, options = {}) {
    this.urls = urls;
    this.concurrency = options.concurrency || 10;
    this.onProgress = options.onProgress || (() => {});

    this.stats = {
      total: urls.length,
      completed: 0,
      succeeded: 0,
      failed: 0,
      startTime: null,
      endTime: null,
    };
  }

  getProgress() {
    const elapsed = Date.now() - this.stats.startTime;
    const rate = this.stats.completed / (elapsed / 1000); // per second
    const remaining = this.stats.total - this.stats.completed;
    const eta = remaining / rate;

    return {
      ...this.stats,
      elapsed,
      rate: rate.toFixed(2),
      eta: Math.round(eta),
      percentage: ((this.stats.completed / this.stats.total) * 100).toFixed(1),
    };
  }

  async process() {
    this.stats.startTime = Date.now();
    const results = [];

    for (let i = 0; i < this.urls.length; i += this.concurrency) {
      const batch = this.urls.slice(i, i + this.concurrency);

      const batchResults = await Promise.all(
        batch.map(async (url) => {
          try {
            const screenshot = await captureWithRetry(url);
            this.stats.succeeded++;
            return { url, success: true, screenshot };
          } catch (error) {
            this.stats.failed++;
            return { url, success: false, error: error.message };
          } finally {
            this.stats.completed++;
            this.onProgress(this.getProgress());
          }
        })
      );

      results.push(...batchResults);
    }

    this.stats.endTime = Date.now();
    return results;
  }
}

// Usage
const processor = new BatchProcessor(urls, {
  concurrency: 10,
  onProgress: (progress) => {
    console.log(
      `Progress: ${progress.percentage}% | ` +
      `${progress.succeeded} succeeded, ${progress.failed} failed | ` +
      `ETA: ${progress.eta}s`
    );
  },
});

const results = await processor.process();
```

## Queue-Based Processing

For very large batches, use a job queue:

### Simple In-Memory Queue

```javascript
class ScreenshotQueue {
  constructor(options = {}) {
    this.queue = [];
    this.processing = false;
    this.concurrency = options.concurrency || 10;
    this.results = new Map();
  }

  add(url, jobId = null) {
    const id = jobId || `job_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    this.queue.push({ id, url });
    this.results.set(id, { status: 'pending' });

    if (!this.processing) {
      this.process();
    }

    return id;
  }

  addBatch(urls) {
    return urls.map((url) => this.add(url));
  }

  getStatus(jobId) {
    return this.results.get(jobId);
  }

  async process() {
    this.processing = true;

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.concurrency);

      await Promise.all(
        batch.map(async (job) => {
          this.results.set(job.id, { status: 'processing' });

          try {
            const screenshot = await captureWithRetry(job.url);
            this.results.set(job.id, {
              status: 'completed',
              screenshot,
              completedAt: Date.now(),
            });
          } catch (error) {
            this.results.set(job.id, {
              status: 'failed',
              error: error.message,
              failedAt: Date.now(),
            });
          }
        })
      );
    }

    this.processing = false;
  }
}

// Usage
const queue = new ScreenshotQueue({ concurrency: 10 });

// Add jobs
const jobIds = queue.addBatch([
  'https://example1.com',
  'https://example2.com',
  'https://example3.com',
]);

// Check status later
setTimeout(() => {
  jobIds.forEach((id) => {
    console.log(id, queue.getStatus(id));
  });
}, 10000);
```

### Redis-Backed Queue (Production)

For production workloads, use a persistent queue:

```javascript
const Queue = require('bull');

// Create queue backed by Redis
const screenshotQueue = new Queue('screenshots', process.env.REDIS_URL);

// Define processor
screenshotQueue.process(10, async (job) => {
  const { url, options } = job.data;

  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: options?.device || 'desktop',
      format: options?.format || 'png',
      ...options,
    }),
  });

  if (!response.ok) {
    throw new Error(`Capture failed: ${response.status}`);
  }

  const screenshot = await response.arrayBuffer();

  // Store result (e.g., S3, database)
  const storagePath = await storeScreenshot(job.id, screenshot);

  return { storagePath, capturedAt: Date.now() };
});

// Add jobs
async function queueScreenshots(urls, options = {}) {
  const jobs = await Promise.all(
    urls.map((url) =>
      screenshotQueue.add(
        { url, options },
        {
          attempts: 3,
          backoff: { type: 'exponential', delay: 1000 },
          removeOnComplete: 100,
          removeOnFail: 50,
        }
      )
    )
  );

  return jobs.map((job) => job.id);
}

// Monitor progress
screenshotQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed:`, result.storagePath);
});

screenshotQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed:`, error.message);
});
```

## Storage Strategies

### File System Storage

```javascript
const fs = require('fs').promises;
const path = require('path');

async function storeToFileSystem(screenshot, url) {
  const filename = sanitizeFilename(url) + '.png';
  const outputDir = './screenshots';

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, filename), Buffer.from(screenshot));

  return filename;
}

function sanitizeFilename(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 100);
}
```

### Cloud Storage (S3)

```javascript
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: process.env.AWS_REGION });

async function storeToS3(screenshot, url) {
  const key = `screenshots/${Date.now()}_${sanitizeFilename(url)}.png`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: Buffer.from(screenshot),
      ContentType: 'image/png',
    })
  );

  return `s3://${process.env.S3_BUCKET}/${key}`;
}
```

### Database Metadata

Store metadata for tracking:

```javascript
async function saveScreenshotRecord(db, data) {
  return db.screenshots.create({
    data: {
      url: data.url,
      storagePath: data.storagePath,
      capturedAt: new Date(),
      metadata: {
        device: data.device,
        format: data.format,
        fileSize: data.fileSize,
      },
    },
  });
}
```

## Monitoring and Observability

### Logging

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'batch-errors.log', level: 'error' }),
    new winston.transports.File({ filename: 'batch-combined.log' }),
  ],
});

async function captureWithLogging(url, batchId) {
  const startTime = Date.now();

  try {
    const screenshot = await captureScreenshot(url);
    const duration = Date.now() - startTime;

    logger.info('Screenshot captured', {
      batchId,
      url,
      duration,
      success: true,
    });

    return screenshot;
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error('Screenshot failed', {
      batchId,
      url,
      duration,
      error: error.message,
    });

    throw error;
  }
}
```

### Metrics

Track key performance indicators:

```javascript
class BatchMetrics {
  constructor() {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalDuration: 0,
      retries: 0,
    };
  }

  recordSuccess(duration) {
    this.metrics.totalRequests++;
    this.metrics.successfulRequests++;
    this.metrics.totalDuration += duration;
  }

  recordFailure() {
    this.metrics.totalRequests++;
    this.metrics.failedRequests++;
  }

  recordRetry() {
    this.metrics.retries++;
  }

  getStats() {
    return {
      ...this.metrics,
      successRate: (
        (this.metrics.successfulRequests / this.metrics.totalRequests) *
        100
      ).toFixed(2),
      avgDuration: Math.round(
        this.metrics.totalDuration / this.metrics.successfulRequests
      ),
    };
  }
}
```

## Best Practices

1. **Start conservative** - Begin with low concurrency and increase based on results
2. **Implement retries** - Transient failures are common at scale
3. **Use persistent queues** - For jobs that can't be lost
4. **Store results separately** - Don't keep large buffers in memory
5. **Monitor rate limits** - Stay within API limits to avoid errors
6. **Log everything** - Debug issues faster with good logs
7. **Handle failures gracefully** - Dead letter queues for permanent failures

## Next Steps

- **[Performance Optimization](/blog/optimize-screenshot-performance)**: Speed up individual captures
- **[Visual Testing](/blog/visual-regression-testing-guide)**: Batch testing workflows
- **[Security Guide](/blog/screenshot-api-security-guide)**: Secure batch processing
- **[Mobile Screenshots](/blog/mobile-responsive-screenshots)**: Multi-device batch capture

For implementation details, see our [JavaScript](/integrations/javascript) and [Node.js](/integrations/nodejs) integration guides.

Ready to process screenshots at scale? [Get started free](/sign-up) or test in our [playground](/playground).
