---
title: "Getting Started with Screenshotly: Your First API Call"
slug: "getting-started-with-screenshot-api"
excerpt: "Learn how to capture your first website screenshot with Screenshotly's REST API. Step-by-step guide for developers."
publishedAt: "2024-01-15T10:00:00Z"
updatedAt: "2024-12-01T10:00:00Z"
author: "asad-ali"
category: "tutorial"
tags: ["getting-started", "api", "tutorial"]
keywords: 
  - "screenshot API tutorial"
  - "getting started screenshot API"
  - "first API call"
  - "screenshot automation guide"
readingTime: 5
featured: true
image: "/images/blog/getting-started/hero.jpg"
faqs:
  - question: "Do I need a credit card to get started?"
    answer: "No! Screenshotly offers 500 free screenshots per day without requiring a credit card. You can start testing immediately after signing up."
  - question: "What programming languages are supported?"
    answer: "Screenshotly works with any language that can make HTTP requests. We provide examples for JavaScript, Python, PHP, Ruby, and more."
  - question: "How long does it take to capture a screenshot?"
    answer: "Most screenshots are captured within 2-5 seconds. Complex pages with heavy JavaScript may take longer, but our optimization techniques can reduce this significantly."
---

## Getting Started with Screenshotly

Welcome to Screenshotly! This guide will walk you through making your first API call to capture a website screenshot.

Whether you're building automated testing workflows, creating [social media previews](/use-cases/social-media), or generating [documentation screenshots](/use-cases/documentation), Screenshotly makes it simple to capture high-quality website screenshots programmatically.

## Prerequisites

Before you begin, you'll need:
- A Screenshotly account ([sign up for free](/sign-up))
- Your API key from the [dashboard](/dashboard)
- Basic knowledge of REST APIs
- A code editor and terminal

## Step 1: Get Your API Key

After signing up, navigate to your [dashboard](/dashboard/tokens) and copy your API key. Keep this secure - it's your authentication for all API calls.

Your API key will look like this:
```
sk_live_1234567890abcdef...
```

**Security Note**: Never expose your API key in client-side code or public repositories. Always use environment variables or secure key management systems.

## Step 2: Make Your First Request

Here's a simple example using cURL:

```bash
curl -X POST "https://api.screenshotly.app/screenshot" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "device": "desktop",
    "format": "png"
  }' \
  --output screenshot.png
```

### JavaScript Example

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'desktop',
    format: 'png'
  })
});

if (response.ok) {
  const buffer = await response.arrayBuffer();
  // Save or process the screenshot
  console.log('Screenshot captured successfully!');
} else {
  console.error('Failed to capture screenshot:', response.status);
}
```

### Python Example

```python
import requests

url = "https://api.screenshotly.app/screenshot"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "url": "https://example.com",
    "device": "desktop",
    "format": "png"
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    with open("screenshot.png", "wb") as f:
        f.write(response.content)
    print("Screenshot saved successfully!")
else:
    print(f"Error: {response.status_code}")
```

## Step 3: Customize Your Screenshots

You can customize your screenshots with various options:

### Device Types
- **desktop**: Standard desktop viewport (1920x1080)
- **laptop**: Laptop viewport (1366x768)
- **tablet**: Tablet viewport (768x1024)
- **mobile**: Mobile viewport (375x667)

### Output Formats
- **png**: Best for UI screenshots, supports transparency
- **jpeg**: Smaller file size, good for photos
- **pdf**: Perfect for documents and reports

### Advanced Options

```json
{
  "url": "https://example.com",
  "device": "desktop",
  "format": "png",
  "fullPage": true,
  "delay": 2000,
  "blockResources": ["font", "media"],
  "aiRemoval": {
    "enabled": true,
    "types": ["cookie-banner", "newsletter"]
  }
}
```

**Key Options Explained:**
- `fullPage`: Capture the entire page, not just the viewport
- `delay`: Wait time in milliseconds before capturing
- `blockResources`: Block specific resource types for faster loading
- `aiRemoval`: Automatically remove distracting elements

## Step 4: Handle Responses and Errors

### Success Response
When successful, you'll receive the screenshot as binary data with these headers:
- `Content-Type`: `image/png` or `image/jpeg`
- `X-Screenshot-Time`: Time taken to capture (in milliseconds)
- `X-Rate-Limit-Remaining`: Remaining API calls for your plan

### Error Handling

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'desktop'
  })
});

if (!response.ok) {
  const error = await response.json();
  console.error('Screenshot failed:', error.message);
  
  // Handle specific error types
  switch (response.status) {
    case 401:
      console.error('Invalid API key');
      break;
    case 429:
      console.error('Rate limit exceeded');
      break;
    case 400:
      console.error('Invalid request parameters');
      break;
    default:
      console.error('Unexpected error');
  }
}
```

### Common Error Codes
- **400**: Bad Request - Invalid parameters
- **401**: Unauthorized - Invalid or missing API key
- **429**: Too Many Requests - Rate limit exceeded
- **500**: Internal Server Error - Temporary server issue

## Step 5: Best Practices

### 1. Use Environment Variables
```bash
# .env file
SCREENSHOTLY_API_KEY=sk_live_your_key_here
```

```javascript
const apiKey = process.env.SCREENSHOTLY_API_KEY;
```

### 2. Implement Retry Logic
```javascript
async function captureWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await captureScreenshot(url);
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### 3. Monitor Your Usage
Track your API usage in the [dashboard](/dashboard/analytics) to:
- Monitor remaining quota
- Analyze performance metrics
- Optimize your usage patterns

## Next Steps

Now that you've captured your first screenshot, explore our advanced features:

1. **[AI-Powered Element Removal](/blog/ai-element-removal-guide)**: Automatically remove cookie banners and popups
2. **[Device Mockups](/blog/device-mockups-for-marketing)**: Add beautiful device frames to your screenshots
3. **[Performance Optimization](/blog/optimize-screenshot-performance)**: Make your screenshots faster and cheaper
4. **[Use Cases](/use-cases)**: Explore real-world applications

### Integration Guides
- [JavaScript Integration](/integrations/javascript)
- [Node.js Integration](/integrations/nodejs)
- [Python Integration](/integrations/python)
- [PHP Integration](/integrations/php)

### Popular Use Cases
- [Visual Regression Testing](/use-cases/visual-regression-testing)
- [Social Media Automation](/use-cases/social-media)
- [E-commerce Product Images](/use-cases/ecommerce)
- [Documentation Screenshots](/use-cases/documentation)

Ready to build something amazing? Start with our [interactive playground](/playground) to test different options, or dive into our comprehensive [API documentation](/help).

Have questions? Check out our [help center](/help) or reach out to our support team. We're here to help you succeed with screenshot automation!
