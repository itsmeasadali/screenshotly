---
title: "Screenshot Webhooks: Real-Time Capture Notifications"
description: "Implement webhook-based screenshot automation for real-time notifications and async processing. Covers setup, security, and scaling patterns."
excerpt: "Build event-driven screenshot automation with webhooks. Get notified when captures complete and process results asynchronously."
author: "asad-ali"
publishedAt: "2025-11-15"
category: "tutorial"
tags: ["webhooks", "async", "events", "integration"]
keywords: ["screenshot webhook", "async screenshot", "screenshot callback", "screenshot notification", "event-driven screenshot"]
featured: false
readingTime: 7
---

Synchronous screenshot requests block your application while waiting for captures to complete. Webhooks enable async processing—submit captures, continue working, and receive notifications when they're ready.

This guide covers implementing webhook-based screenshot automation.

## Why Webhooks?

### Synchronous Problems

```javascript
// Blocks for 10-30+ seconds
const screenshot = await captureScreenshot(url);
// User waits...
```

Issues:
- User experience suffers during wait
- Request timeouts on slow pages
- Can't easily batch many captures
- Server resources tied up waiting

### Async Advantages

```javascript
// Returns immediately
await submitCapture(url, { webhookUrl: 'https://myapp.com/webhook' });
// Continue immediately, handle result later
```

Benefits:
- Immediate API response
- No timeout issues
- Easy batch processing
- Better resource utilization
- Can retry without blocking

## Basic Implementation

### Submitting Async Captures

```javascript
async function submitAsyncCapture(url, options = {}) {
  const jobId = crypto.randomUUID();
  
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      ...options,
      async: true,
      webhookUrl: `https://myapp.com/api/webhooks/screenshot?jobId=${jobId}`,
    }),
  });
  
  return {
    jobId,
    status: 'submitted',
    submittedAt: new Date(),
  };
}
```

### Receiving Webhook

```javascript
// Express webhook handler
app.post('/api/webhooks/screenshot', async (req, res) => {
  const { jobId } = req.query;
  const { success, imageUrl, error, metadata } = req.body;
  
  try {
    if (success) {
      // Download and store the image
      const imageData = await fetch(imageUrl).then(r => r.arrayBuffer());
      await storage.save(`screenshots/${jobId}.png`, imageData);
      
      // Update job status
      await db.jobs.update(jobId, {
        status: 'completed',
        imageUrl: `/screenshots/${jobId}.png`,
        completedAt: new Date(),
      });
    } else {
      await db.jobs.update(jobId, {
        status: 'failed',
        error,
        failedAt: new Date(),
      });
    }
    
    res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook processing failed:', err);
    res.status(500).send('Processing failed');
  }
});
```

## Webhook Security

### Signature Verification

Verify webhooks actually come from the API:

```javascript
import crypto from 'crypto';

function verifyWebhookSignature(req) {
  const signature = req.headers['x-screenshotly-signature'];
  const timestamp = req.headers['x-screenshotly-timestamp'];
  const body = JSON.stringify(req.body);
  
  // Check timestamp to prevent replay attacks
  const age = Date.now() - parseInt(timestamp);
  if (age > 300000) { // 5 minutes
    throw new Error('Webhook timestamp too old');
  }
  
  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(`${timestamp}.${body}`)
    .digest('hex');
  
  if (!crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )) {
    throw new Error('Invalid webhook signature');
  }
  
  return true;
}

app.post('/api/webhooks/screenshot', (req, res) => {
  try {
    verifyWebhookSignature(req);
    // Process webhook...
  } catch (err) {
    console.error('Webhook verification failed:', err);
    res.status(401).send('Unauthorized');
  }
});
```

### IP Allowlisting

Restrict webhook sources:

```javascript
const ALLOWED_IPS = [
  '203.0.113.0/24',  // Example API IP range
];

function isAllowedIP(ip) {
  return ALLOWED_IPS.some(range => ipRangeCheck(ip, range));
}

app.post('/api/webhooks/screenshot', (req, res) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (!isAllowedIP(clientIP)) {
    console.warn(`Blocked webhook from ${clientIP}`);
    return res.status(403).send('Forbidden');
  }
  
  // Process webhook...
});
```

## Handling Webhook Events

### Event Types

```javascript
app.post('/api/webhooks/screenshot', async (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'screenshot.completed':
      await handleCompleted(data);
      break;
    
    case 'screenshot.failed':
      await handleFailed(data);
      break;
    
    case 'screenshot.progress':
      await handleProgress(data);
      break;
    
    default:
      console.log('Unknown event:', event);
  }
  
  res.status(200).send('OK');
});

async function handleCompleted(data) {
  const { jobId, imageUrl, metadata } = data;
  
  // Store image
  const image = await fetch(imageUrl).then(r => r.buffer());
  await storage.upload(`screenshots/${jobId}.png`, image);
  
  // Update database
  await db.screenshots.update(jobId, {
    status: 'completed',
    url: `screenshots/${jobId}.png`,
    width: metadata.width,
    height: metadata.height,
    size: metadata.size,
  });
  
  // Notify user
  await notifyUser(jobId, 'Screenshot ready!');
}

async function handleFailed(data) {
  const { jobId, error, errorCode } = data;
  
  await db.screenshots.update(jobId, {
    status: 'failed',
    error: error,
    errorCode: errorCode,
  });
  
  // Maybe retry
  if (isRetryableError(errorCode)) {
    await retryCapture(jobId);
  }
}
```

## Retry and Reliability

### Idempotent Processing

Handle duplicate webhooks:

```javascript
async function processWebhook(jobId, data) {
  // Use transaction to prevent duplicates
  const processed = await db.transaction(async (trx) => {
    const job = await trx.jobs.findOne(jobId);
    
    // Already processed this webhook
    if (job.webhookProcessed) {
      return false;
    }
    
    // Mark as processed
    await trx.jobs.update(jobId, {
      ...data,
      webhookProcessed: true,
      webhookProcessedAt: new Date(),
    });
    
    return true;
  });
  
  if (!processed) {
    console.log(`Duplicate webhook for ${jobId}, ignoring`);
  }
  
  return processed;
}
```

### Dead Letter Queue

Track failed webhook processing:

```javascript
async function processWebhookWithDLQ(req) {
  try {
    await processWebhook(req.body);
  } catch (error) {
    // Store in dead letter queue for investigation
    await db.webhookDLQ.insert({
      payload: req.body,
      error: error.message,
      receivedAt: new Date(),
      attempts: 1,
    });
    
    throw error;
  }
}

// Retry dead letters periodically
async function retryDeadLetters() {
  const deadLetters = await db.webhookDLQ
    .where('attempts')
    .lt(3)
    .toArray();
  
  for (const dl of deadLetters) {
    try {
      await processWebhook(dl.payload);
      await db.webhookDLQ.delete(dl.id);
    } catch (error) {
      await db.webhookDLQ.update(dl.id, {
        attempts: dl.attempts + 1,
        lastError: error.message,
      });
    }
  }
}
```

## Polling Fallback

Not all webhooks arrive. Implement polling as fallback:

```javascript
async function checkPendingJobs() {
  const pending = await db.jobs
    .where('status')
    .equals('submitted')
    .where('submittedAt')
    .lt(new Date(Date.now() - 60000)) // Older than 1 minute
    .toArray();
  
  for (const job of pending) {
    const status = await checkJobStatus(job.apiJobId);
    
    if (status.completed) {
      await handleCompleted({
        jobId: job.id,
        imageUrl: status.imageUrl,
        metadata: status.metadata,
      });
    } else if (status.failed) {
      await handleFailed({
        jobId: job.id,
        error: status.error,
      });
    }
    // Still pending, will check again next run
  }
}

// Run every minute
setInterval(checkPendingJobs, 60000);
```

## Scaling Webhooks

### Queue-Based Processing

Don't process webhooks inline:

```javascript
app.post('/api/webhooks/screenshot', async (req, res) => {
  // Immediately acknowledge
  res.status(200).send('OK');
  
  // Queue for processing
  await webhookQueue.add('process', {
    payload: req.body,
    receivedAt: new Date(),
  });
});

// Process asynchronously
webhookQueue.process('process', 10, async (job) => {
  await processWebhook(job.data.payload);
});
```

### Worker Scaling

```javascript
// Horizontally scale webhook workers
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Each worker processes webhooks from shared queue
  startWebhookWorker();
}
```

## Frontend Integration

### Real-Time Updates

Notify frontend when screenshots complete:

```javascript
// WebSocket notification
io.on('connection', (socket) => {
  socket.on('subscribe', (jobId) => {
    socket.join(`job:${jobId}`);
  });
});

async function handleCompleted(data) {
  // ... save screenshot ...
  
  // Notify connected clients
  io.to(`job:${data.jobId}`).emit('screenshot-ready', {
    jobId: data.jobId,
    imageUrl: data.imageUrl,
  });
}
```

### Frontend Component

```jsx
function ScreenshotCapture() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState('idle');
  const [imageUrl, setImageUrl] = useState(null);
  
  useEffect(() => {
    if (jobId) {
      socket.emit('subscribe', jobId);
      
      socket.on('screenshot-ready', (data) => {
        if (data.jobId === jobId) {
          setStatus('completed');
          setImageUrl(data.imageUrl);
        }
      });
    }
    
    return () => socket.off('screenshot-ready');
  }, [jobId]);
  
  async function capture(url) {
    setStatus('capturing');
    const { jobId } = await submitAsyncCapture(url);
    setJobId(jobId);
  }
  
  return (
    <div>
      {status === 'idle' && <CaptureForm onSubmit={capture} />}
      {status === 'capturing' && <LoadingSpinner />}
      {status === 'completed' && <img src={imageUrl} alt="Screenshot" />}
    </div>
  );
}
```

## Best Practices

### 1. Respond Quickly

Always return 200 immediately:

```javascript
app.post('/webhook', (req, res) => {
  res.status(200).send('OK'); // Respond first
  processAsync(req.body);     // Process after
});
```

### 2. Verify Everything

- Signature validation
- Timestamp checking
- IP allowlisting
- Payload validation

### 3. Be Idempotent

Handle the same webhook multiple times safely.

### 4. Log Extensively

```javascript
app.post('/webhook', (req, res) => {
  console.log('Webhook received:', {
    jobId: req.body.jobId,
    event: req.body.event,
    timestamp: new Date(),
  });
  // ...
});
```

### 5. Have Fallbacks

Implement polling for missed webhooks.

## Conclusion

Webhook-based screenshot automation enables:

1. **Non-blocking captures** - Submit and continue
2. **Better scaling** - Handle many concurrent captures
3. **Improved UX** - No long waits
4. **Reliable processing** - Retries and fallbacks

Implement proper verification, idempotency, and fallbacks for production reliability.

---

**Ready for async screenshot automation?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Batch Processing Guide →](/blog/batch-screenshot-processing)
