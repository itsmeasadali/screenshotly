---
title: "Screenshot API Error Handling: Retries, Timeouts, and Recovery"
description: "Build robust screenshot automation with proper error handling. Covers common errors, retry strategies, and graceful failure recovery."
excerpt: "Master error handling for screenshot APIs. Retry logic, timeout configuration, and graceful degradation for production systems."
author: "asad-ali"
publishedAt: "2025-12-02"
category: "tutorial"
tags: ["error handling", "reliability", "api", "production"]
keywords: ["screenshot api error", "api retry logic", "screenshot timeout", "error handling", "api reliability"]
featured: false
readingTime: 7
---

Production screenshot systems need robust error handling. Pages time out, networks fail, and edge cases emerge. This guide covers strategies for building reliable screenshot automation that handles failures gracefully.

## Common Error Types

### 1. Timeout Errors

The page takes too long to load or render.

```javascript
{
  "error": "Page load timeout",
  "code": "TIMEOUT",
  "details": "Page did not load within 30 seconds"
}
```

**Causes:**
- Slow server response
- Heavy JavaScript execution
- Large assets loading
- Infinite loops in page code

### 2. Network Errors

Cannot reach the target URL.

```javascript
{
  "error": "Network error",
  "code": "NETWORK_ERROR",
  "details": "DNS resolution failed for example.com"
}
```

**Causes:**
- DNS issues
- Server down
- Firewall blocking
- SSL/TLS problems

### 3. HTTP Errors

Server returns error status.

```javascript
{
  "error": "HTTP 500 - Internal Server Error",
  "code": "HTTP_ERROR",
  "status": 500
}
```

**Common statuses:**
- 403: Forbidden (blocked)
- 404: Not Found
- 500/502/503: Server errors
- 429: Rate limited

### 4. Capture Errors

Page loaded but capture failed.

```javascript
{
  "error": "Capture failed",
  "code": "CAPTURE_ERROR",
  "details": "Page rendered empty content"
}
```

**Causes:**
- JavaScript errors on page
- Content blocked by CSP
- Geolocation restrictions
- Authentication required

### 5. Rate Limit Errors

Too many requests.

```javascript
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMITED",
  "retryAfter": 60
}
```

## Retry Strategies

### Basic Retry

Simple retry with fixed delay:

```javascript
async function captureWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await captureScreenshot(url, options);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      console.log(`Attempt ${attempt} failed, retrying...`);
      await sleep(1000);
    }
  }
}
```

### Exponential Backoff

Increase delay between retries:

```javascript
async function captureWithBackoff(url, options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await captureScreenshot(url, options);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      if (!isRetryable(error)) throw error;
      
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.log(`Attempt ${attempt} failed, waiting ${delay}ms...`);
      await sleep(delay);
    }
  }
}

function isRetryable(error) {
  // Retry on transient errors
  return ['TIMEOUT', 'NETWORK_ERROR', 'HTTP_ERROR'].includes(error.code)
    && ![400, 401, 403, 404].includes(error.status);
}
```

### Jittered Backoff

Add randomness to prevent thundering herd:

```javascript
function getBackoffDelay(attempt, baseDelay = 1000) {
  const exponential = Math.pow(2, attempt) * baseDelay;
  const jitter = Math.random() * exponential * 0.5;
  return exponential + jitter;
}

// Results in delays like: 2.3s, 5.1s, 9.8s
```

### Adaptive Retry Based on Error

Different strategies for different errors:

```javascript
async function smartRetry(url, options) {
  let lastError;
  
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      // Adjust options based on previous error
      const adaptedOptions = adaptOptions(options, lastError, attempt);
      return await captureScreenshot(url, adaptedOptions);
      
    } catch (error) {
      lastError = error;
      
      if (error.code === 'RATE_LIMITED') {
        await sleep(error.retryAfter * 1000 || 60000);
        continue;
      }
      
      if (error.code === 'TIMEOUT') {
        // Increase timeout on next attempt
        options.timeout = (options.timeout || 30) * 1.5;
        await sleep(2000);
        continue;
      }
      
      if (!isRetryable(error)) throw error;
      
      await sleep(getBackoffDelay(attempt));
    }
  }
  
  throw lastError;
}

function adaptOptions(options, error, attempt) {
  if (!error) return options;
  
  const adapted = { ...options };
  
  if (error.code === 'TIMEOUT') {
    // Try with simpler options
    adapted.fullPage = false;
    adapted.delay = (adapted.delay || 0) + 1000;
  }
  
  return adapted;
}
```

## Timeout Configuration

### Setting Appropriate Timeouts

```javascript
// Simple pages
{ timeout: 30000 }  // 30 seconds

// Complex SPAs
{ timeout: 60000 }  // 60 seconds

// Full-page captures
{ timeout: 90000 }  // 90 seconds

// Heavy pages with many assets
{ timeout: 120000 }  // 2 minutes
```

### Timeout Layers

Multiple timeout points:

```javascript
{
  // Overall API call timeout
  timeout: 60000,
  
  // Page load timeout
  navigationTimeout: 30000,
  
  // Wait for selector timeout
  waitForTimeout: 10000,
}
```

## Graceful Degradation

### Fallback Images

Use placeholder when capture fails:

```javascript
async function captureOrFallback(url, options) {
  try {
    return await captureWithRetry(url, options);
  } catch (error) {
    console.error(`Capture failed for ${url}:`, error.message);
    
    // Return fallback image
    return await getFallbackImage(url, error);
  }
}

async function getFallbackImage(url, error) {
  // Option 1: Generic placeholder
  return await fs.readFile('assets/screenshot-unavailable.png');
  
  // Option 2: Cached version
  const cached = await cache.get(`screenshot:${url}`);
  if (cached) return cached;
  
  // Option 3: Generate placeholder with error info
  return await generatePlaceholder({
    url,
    message: 'Screenshot temporarily unavailable',
  });
}
```

### Partial Success

Continue processing even if some captures fail:

```javascript
async function captureAll(urls) {
  const results = await Promise.allSettled(
    urls.map(url => captureWithRetry(url, { timeout: 30000 }))
  );
  
  const successful = [];
  const failed = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successful.push({ url: urls[index], image: result.value });
    } else {
      failed.push({ url: urls[index], error: result.reason });
    }
  });
  
  console.log(`Captured: ${successful.length}, Failed: ${failed.length}`);
  
  // Handle failures separately
  if (failed.length > 0) {
    await notifyFailures(failed);
  }
  
  return successful;
}
```

## Circuit Breaker Pattern

Prevent cascading failures:

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureCount = 0;
    this.successCount = 0;
    this.state = 'CLOSED';  // CLOSED, OPEN, HALF_OPEN
    this.threshold = options.threshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.lastFailure = null;
  }
  
  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED';
    }
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailure = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}

// Usage
const breaker = new CircuitBreaker({ threshold: 3, resetTimeout: 30000 });

async function captureWithBreaker(url) {
  return breaker.execute(() => captureScreenshot(url));
}
```

## Monitoring and Alerting

### Track Error Rates

```javascript
const metrics = {
  total: 0,
  success: 0,
  failures: {},
};

async function trackedCapture(url, options) {
  metrics.total++;
  
  try {
    const result = await captureScreenshot(url, options);
    metrics.success++;
    return result;
  } catch (error) {
    metrics.failures[error.code] = (metrics.failures[error.code] || 0) + 1;
    
    // Alert on high error rate
    const errorRate = (metrics.total - metrics.success) / metrics.total;
    if (errorRate > 0.1 && metrics.total > 100) {
      await alertHighErrorRate(errorRate, metrics.failures);
    }
    
    throw error;
  }
}
```

### Log for Debugging

```javascript
async function captureWithLogging(url, options) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  
  console.log(JSON.stringify({
    event: 'capture_start',
    requestId,
    url,
    options,
    timestamp: new Date().toISOString(),
  }));
  
  try {
    const result = await captureScreenshot(url, options);
    
    console.log(JSON.stringify({
      event: 'capture_success',
      requestId,
      duration: Date.now() - startTime,
      size: result.length,
    }));
    
    return result;
  } catch (error) {
    console.error(JSON.stringify({
      event: 'capture_error',
      requestId,
      duration: Date.now() - startTime,
      error: {
        code: error.code,
        message: error.message,
      },
    }));
    
    throw error;
  }
}
```

## Best Practices

### 1. Classify Errors

Not all errors should be retried:

```javascript
const RETRYABLE_CODES = ['TIMEOUT', 'NETWORK_ERROR', 'HTTP_500', 'HTTP_502', 'HTTP_503'];
const NON_RETRYABLE_CODES = ['HTTP_400', 'HTTP_401', 'HTTP_403', 'HTTP_404', 'INVALID_URL'];
```

### 2. Set Reasonable Limits

Don't retry forever:

```javascript
const config = {
  maxRetries: 3,
  maxDelay: 30000,  // Cap backoff delay
  totalTimeout: 120000,  // Total time including retries
};
```

### 3. Preserve Context

Include context in error reports:

```javascript
catch (error) {
  error.context = {
    url,
    options,
    attempt,
    elapsedTime: Date.now() - startTime,
  };
  throw error;
}
```

### 4. Test Error Paths

Simulate errors in testing:

```javascript
// Force timeout for testing
{ url: 'https://httpstat.us/504?sleep=60000' }

// Force 500 error
{ url: 'https://httpstat.us/500' }

// Force rate limiting
{ url: 'https://httpstat.us/429' }
```

## Conclusion

Robust error handling transforms brittle automation into reliable systems:

1. **Classify errors** - Know what's retryable
2. **Implement backoff** - Don't hammer failing services
3. **Degrade gracefully** - Fallbacks keep systems running
4. **Monitor actively** - Catch issues early
5. **Log thoroughly** - Debug efficiently

With proper error handling, your screenshot system handles edge cases and recovers from failures automatically.

---

**Ready to build reliable screenshot automation?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [CI/CD Screenshot Automation →](/blog/cicd-screenshot-automation-guide)
