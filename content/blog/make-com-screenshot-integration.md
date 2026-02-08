---
title: "Make.com Screenshot Integration: Automate Visual Capture Without Code"
description: "Learn how to automate website screenshots with Make.com (formerly Integromat). Build no-code workflows for social media, documentation, and monitoring."
excerpt: "A step-by-step guide to integrating screenshots into Make.com automation workflows. Perfect for marketing, documentation, and monitoring use cases."
author: "asad-ali"
publishedAt: "2026-01-10"
category: "guide"
tags: ["make.com", "no-code", "automation", "integrations"]
keywords: ["make.com screenshot", "integromat screenshot", "no-code screenshot", "automate screenshots", "screenshot workflow"]
featured: false
readingTime: 7
---

Make.com (formerly Integromat) is a powerful automation platform that connects your favorite apps and services. By integrating screenshot capabilities, you can automate visual capture for social media, documentation, monitoring, and more—all without writing code.

This guide shows you how to connect Screenshotly to Make.com and build practical automation workflows.

## Prerequisites

Before starting, you'll need:

1. **Make.com account** - Free tier works for testing
2. **Screenshotly API key** - Get one free at [screenshotly.app/sign-up](/sign-up)
3. **Basic Make.com familiarity** - Understanding of scenarios and modules

## Setting Up the HTTP Module

Screenshotly integrates with Make.com through the HTTP module since we use a standard REST API.

### Step 1: Create a New Scenario

1. Log into Make.com
2. Click "Create a new scenario"
3. Search for and add the **HTTP** module
4. Select **Make a request**

### Step 2: Configure the HTTP Request

Configure the module with these settings:

**URL:** `https://api.screenshotly.app/screenshot`

**Method:** POST

**Headers:**
| Key | Value |
|-----|-------|
| Authorization | Bearer YOUR_API_KEY |
| Content-Type | application/json |

**Body type:** Raw

**Content type:** JSON (application/json)

**Request content:**
```json
{
  "url": "https://example.com",
  "device": "desktop",
  "format": "png"
}
```

### Step 3: Parse the Response

Add another module to handle the response:

1. Add **Tools > Set Variable** or a storage module
2. Map the response body (binary image data)
3. Use in subsequent steps (save to cloud, email, etc.)

## Practical Workflow Examples

### Workflow 1: Weekly Competitor Monitoring

Capture competitor websites weekly and save to Google Drive.

**Scenario Structure:**
```
Schedule Trigger (Weekly)
    ↓
HTTP Request (Screenshotly)
    ↓
Google Drive (Upload File)
    ↓
Slack (Send Notification)
```

**HTTP Module Configuration:**
```json
{
  "url": "https://competitor-website.com",
  "device": "desktop",
  "format": "png",
  "fullPage": true,
  "aiRemoval": {
    "enabled": true,
    "types": ["cookie-banner", "chat-widget"]
  }
}
```

**Google Drive Module:**
- File name: `competitor-{{formatDate(now; "YYYY-MM-DD")}}.png`
- Folder: Select your monitoring folder
- File data: Map from HTTP module response

### Workflow 2: Social Media Preview Generator

When a new blog post is published, automatically generate OG images.

**Scenario Structure:**
```
WordPress Webhook (New Post)
    ↓
HTTP Request (Screenshotly with mockup)
    ↓
Dropbox (Save Image)
    ↓
Buffer/Hootsuite (Schedule Post)
```

**HTTP Module Configuration:**
```json
{
  "url": "{{1.post_url}}/og-template",
  "device": "desktop",
  "format": "png",
  "viewport": {
    "width": 1200,
    "height": 630
  },
  "mockup": {
    "type": "browser-dark",
    "shadow": true
  }
}
```

### Workflow 3: Daily Website Archival

Archive important pages daily for compliance.

**Scenario Structure:**
```
Schedule Trigger (Daily at 9 AM)
    ↓
Iterator (List of URLs)
    ↓
HTTP Request (Screenshotly)
    ↓
AWS S3 (Upload with timestamp)
    ↓
Airtable (Log capture metadata)
```

**Iterator Data:**
```json
[
  {"url": "https://yoursite.com/terms", "name": "terms"},
  {"url": "https://yoursite.com/privacy", "name": "privacy"},
  {"url": "https://yoursite.com/pricing", "name": "pricing"}
]
```

**HTTP Module (in loop):**
```json
{
  "url": "{{2.url}}",
  "device": "desktop",
  "format": "png",
  "fullPage": true
}
```

**S3 Module:**
- Key: `archives/{{formatDate(now; "YYYY/MM/DD")}}/{{2.name}}.png`
- Body: Map from HTTP response

### Workflow 4: E-commerce Product Monitoring

Track product page changes for pricing analysis.

**Scenario Structure:**
```
Schedule Trigger (Hourly)
    ↓
Data Store (Get URL List)
    ↓
Iterator
    ↓
HTTP Request (Screenshotly)
    ↓
Image Comparison (Custom Logic)
    ↓
Email (If significant change)
```

**HTTP Module:**
```json
{
  "url": "{{3.product_url}}",
  "device": "desktop",
  "format": "png",
  "aiRemoval": {
    "enabled": true,
    "types": ["cookie-banner", "popup"]
  }
}
```

## Advanced Configurations

### Dynamic URL Handling

Use data from previous modules:

```json
{
  "url": "{{1.website_url}}",
  "device": "{{if(1.device_type; 1.device_type; 'desktop')}}",
  "format": "png"
}
```

### Error Handling

Add a router after the HTTP module:

1. **Route 1 (Success):** Continue normally when status is 2xx
2. **Route 2 (Error):** Handle failures (retry, notify, log)

**Filter for success route:**
- Condition: HTTP.statusCode >= 200 AND HTTP.statusCode < 300

### Batch Processing with Array Aggregator

Capture multiple URLs and combine results:

```
Get URL List
    ↓
Iterator
    ↓
HTTP Request (Screenshotly)
    ↓
Array Aggregator
    ↓
Save Batch Results
```

### Rate Limiting

Add a delay between requests:

```
HTTP Request
    ↓
Tools > Sleep (1 second)
    ↓
Next Iteration
```

## Saving Screenshots

### To Google Drive

1. Add **Google Drive > Upload a File** module
2. Configure:
   - Folder: Select destination
   - File name: Dynamic name with timestamp
   - Data: Map from HTTP response body

### To Dropbox

1. Add **Dropbox > Upload a File** module
2. Configure:
   - Path: `/screenshots/{{formatDate(now; "YYYY-MM-DD_HH-mm")}}.png`
   - File: Map from HTTP response

### To AWS S3

1. Add **AWS S3 > Put Object** module
2. Configure:
   - Bucket: Your bucket name
   - Key: Path with timestamp
   - Body: HTTP response body

### To Airtable (Metadata)

1. First, upload image to a storage service
2. Add **Airtable > Create Record** module
3. Configure:
   - URL field: Storage URL
   - Captured: {{now}}
   - Source: Original URL

## Webhook Integration

Trigger screenshots from external events.

### Setting Up a Webhook Trigger

1. Add **Webhooks > Custom Webhook** as trigger
2. Copy the webhook URL
3. Send POST requests to trigger captures:

```bash
curl -X POST https://hook.make.com/your-webhook-id \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "name": "example"}'
```

### Webhook Scenario:

```
Custom Webhook
    ↓
HTTP Request (use webhook data)
    ↓
Response to Webhook (return image URL)
```

## Best Practices

### 1. Store API Key Securely

Use Make.com's **Connections** or **Keys** feature:
1. Go to scenario settings
2. Add a custom key
3. Reference as {{keys.screenshotly_api_key}}

### 2. Add Retry Logic

Configure the HTTP module:
- Enable "Evaluate all states as errors"
- Add retry settings in scenario settings

### 3. Monitor Usage

Track API calls with a logging module:
- Add Airtable/Google Sheets logging
- Record timestamp, URL, status
- Review weekly for optimization

### 4. Use Filters Wisely

Only proceed when necessary:
- Skip empty URLs
- Filter by content type
- Stop on rate limits

### 5. Schedule Appropriately

Consider API limits and needs:
- Batch non-urgent captures at off-peak hours
- Space out monitoring checks
- Use caching for frequently captured URLs

## Troubleshooting

### Common Issues

**"Invalid JSON" Error:**
Ensure your JSON is properly formatted. Use Make.com's JSON validator.

**Timeout Errors:**
Increase HTTP module timeout. Complex pages may need 30+ seconds.

**Empty Response:**
Check API key validity and URL accessibility. Test in browser first.

**Rate Limiting:**
Add delays between requests. Consider upgrading API plan for higher limits.

## Conclusion

Make.com transforms screenshot capture from a manual task into an automated workflow. Whether monitoring competitors, generating social previews, or archiving for compliance, the combination of visual trigger-based automation and professional screenshot API opens powerful possibilities.

Key benefits:
- **No coding required** - Point and click configuration
- **Integrate anywhere** - 1000+ app connections in Make.com
- **Scale easily** - Handle hundreds of captures automatically
- **Reliable execution** - Built-in retry and error handling

---

**Ready to automate your screenshots?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

Need help with Make.com integration? [Contact our support team →](/help)
