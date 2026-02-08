---
title: "How SaaSify Monitors 50+ Competitor Websites Automatically"
description: "Learn how SaaSify built an automated competitor monitoring system that tracks pricing, features, and design changes across 50+ competitor websites daily."
excerpt: "A customer success story about automating competitor intelligence. SaaSify saves 20+ hours weekly while never missing important competitor changes."
author: "asad-ali"
publishedAt: "2025-12-18"
category: "case-study"
tags: ["customer story", "competitive intelligence", "monitoring", "automation"]
keywords: ["competitor monitoring automation", "competitive intelligence screenshot", "competitor website tracking", "automated competitor analysis"]
featured: false
readingTime: 7
---

SaaSify is a project management platform competing in a crowded market. With 50+ competitors constantly updating their pricing, features, and positioning, staying informed was becoming a full-time job. Here's how they automated their competitive intelligence using Screenshotly.

## The Challenge: Information Overload

### The Competitive Landscape

SaaSify competes with:
- **5 major players** (Asana, Monday.com, etc.)
- **20+ mid-market tools**
- **30+ emerging startups**

Each competitor has multiple pages worth monitoring:
- Pricing pages
- Feature lists
- Landing pages
- Blog/changelog

**Total: 200+ pages to track**

### The Manual Approach

Before automation, their process was:

1. **Monday morning**: Marketing team manually visits competitor sites
2. **Check each page**: Look for changes since last week
3. **Screenshot differences**: When found, capture for records
4. **Update tracking doc**: Log changes in spreadsheet
5. **Share insights**: Email team about significant changes

**Time spent**: 20+ hours/week across the team

### Key Problems

- **Changes missed**: Competitors update mid-week; team only checked Mondays
- **Inconsistent tracking**: Different people captured different things
- **No historical record**: Screenshots scattered across machines
- **Delayed response**: By the time changes were noticed, competitors had weeks of advantage

## The Solution: Automated Monitoring Pipeline

SaaSify built a system that captures, compares, and alerts on competitor changes automatically.

### System Architecture

```
Scheduler (3x daily)
    ↓
Competitor URL Database
    ↓
Screenshot Capture Service
    ↓ (for each URL)
Screenshotly API
    ↓
Image Storage (S3)
    ↓
Comparison Engine
    ↓
Alert System (Slack)
    ↓
Historical Dashboard
```

### Implementation

**1. Competitor Configuration**

```javascript
// competitors.js
const competitors = [
  {
    name: 'Competitor A',
    pages: [
      { type: 'pricing', url: 'https://competitor-a.com/pricing' },
      { type: 'features', url: 'https://competitor-a.com/features' },
      { type: 'home', url: 'https://competitor-a.com/' },
    ],
    importance: 'high',
  },
  {
    name: 'Competitor B',
    pages: [
      { type: 'pricing', url: 'https://competitor-b.com/pricing' },
      { type: 'features', url: 'https://competitor-b.com/features' },
    ],
    importance: 'medium',
  },
  // ... 48 more competitors
];
```

**2. Capture Service**

```javascript
async function captureCompetitorPage(url) {
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
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'chat-widget', 'popup'],
      },
    }),
  });

  return Buffer.from(await response.arrayBuffer());
}
```

**3. Comparison Engine**

```javascript
async function compareWithPrevious(competitorId, pageType, currentBuffer) {
  // Get previous capture
  const previousKey = await db.getLatestCaptureKey(competitorId, pageType);
  
  if (!previousKey) {
    // First capture, no comparison
    return { isNew: true };
  }
  
  const previousBuffer = await s3.getObject(previousKey);
  
  // Compare images
  const diff = await compareImages(previousBuffer, currentBuffer);
  
  return {
    isNew: false,
    hasChanges: diff.diffPercent > 1,  // 1% threshold
    diffPercent: diff.diffPercent,
    diffImage: diff.diffBuffer,
  };
}
```

**4. Alert System**

```javascript
async function notifyTeam(competitor, page, diff) {
  if (diff.diffPercent > 10) {
    // Major change - immediate Slack alert
    await slack.send({
      channel: '#competitive-intel',
      text: `🚨 Major change detected!`,
      attachments: [{
        title: `${competitor.name} - ${page.type}`,
        text: `${diff.diffPercent.toFixed(1)}% difference detected`,
        image_url: await uploadDiffImage(diff.diffImage),
        actions: [{
          type: 'button',
          text: 'View Details',
          url: `https://dashboard.saasify.com/intel/${competitor.id}`,
        }],
      }],
    });
  } else if (diff.diffPercent > 1) {
    // Minor change - daily digest
    await addToDigest(competitor, page, diff);
  }
}
```

## Results: Transformation

### Before & After

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Time spent monitoring | 20+ hrs/week | 2 hrs/week | **90% reduction** |
| Detection delay | Up to 7 days | Within 8 hours | **95% faster** |
| Pages monitored | ~50 (selective) | 200+ (complete) | **4x coverage** |
| Historical data | Scattered files | Organized archive | **100% searchable** |
| Team coverage | Marketing only | Whole company | **3x visibility** |

### Quantified Benefits

**Time Savings:**
- 18 hours/week saved × 52 weeks = **936 hours/year**
- Equivalent to 0.5 FTE

**Competitive Advantage:**
- 3 pricing responses made within 24 hours of competitor changes
- 2 feature launches accelerated based on competitor intel
- Estimated revenue impact: **$120K+ protected/gained**

**Process Improvement:**
- 100% of competitor changes now documented
- Historical trends visible for strategic planning
- New team members onboard faster with complete context

## Lessons Learned

### 1. Thresholds Matter

Initial 0.1% threshold created too much noise:

```javascript
// Too sensitive - banner ads, dynamic content
if (diff.diffPercent > 0.1) alert();

// Better - meaningful changes only
if (diff.diffPercent > 2) minorAlert();
if (diff.diffPercent > 10) majorAlert();
```

### 2. Full-Page Capture is Essential

Viewport captures missed pricing tiers below the fold:

```javascript
// Before: missed important content
{ viewport: { width: 1280, height: 800 } }

// After: captures everything
{ fullPage: true }
```

### 3. AI Removal Reduces False Positives

Cookie banners and chat widgets caused constant "changes":

```javascript
aiRemoval: {
  enabled: true,
  types: ['cookie-banner', 'chat-widget', 'popup', 'notification'],
}
```

### 4. Categorize by Importance

Not all competitors need the same frequency:

| Tier | Competitors | Frequency |
|------|-------------|-----------|
| A (Major) | 5 | 3x daily |
| B (Growing) | 15 | Daily |
| C (Stable) | 30 | 2x weekly |

### 5. Build a Review Workflow

Raw alerts aren't enough. SaaSify built a dashboard for:
- Side-by-side comparison views
- Commenting on changes
- Assigning action items
- Tracking follow-up

## Technical Highlights

### Handling Rate Limits

With 200+ pages, rate limiting required batching:

```javascript
const pLimit = require('p-limit');
const limit = pLimit(10);

async function captureAll(pages) {
  const batches = chunk(pages, 20);
  
  for (const batch of batches) {
    const promises = batch.map(page =>
      limit(() => captureCompetitorPage(page.url))
    );
    await Promise.all(promises);
    
    // Pause between batches
    await sleep(5000);
  }
}
```

### Efficient Storage

Images stored with smart naming:

```
competitors/
├── competitor-a/
│   ├── pricing/
│   │   ├── 2026-01-15-09-00.png
│   │   ├── 2026-01-15-17-00.png
│   │   └── 2026-01-16-09-00.png
│   └── features/
│       └── ...
└── competitor-b/
    └── ...
```

### Cost Optimization

Monthly API costs stayed under $50:

- **200 pages × 3 captures/day = 600/day**
- **600 × 30 days = 18,000/month**
- Well within standard API pricing

## Getting Started

If you're facing similar challenges:

1. **List competitors**: Start with top 10-20
2. **Identify key pages**: Pricing, features, homepage
3. **Set thresholds**: Start high (10%), tune down
4. **Build incrementally**: Capture first, then compare, then alert
5. **Iterate on alerts**: Reduce noise, increase signal

## Conclusion

Automated competitor monitoring transformed SaaSify's competitive intelligence:

- **20+ hours saved weekly** on manual checking
- **95% faster detection** of competitor changes
- **4x coverage** with complete monitoring
- **Historical archive** for strategic analysis
- **Real-time alerts** enabling rapid response

The investment in automation paid for itself immediately while providing strategic advantages that continue to compound.

---

**Ready to automate competitor monitoring?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

Learn more about [competitor monitoring use cases →](/use-cases/competitor-monitoring)
