---
title: "Screenshot API for Documentation: The Complete Implementation Guide"
description: "Learn how to implement automated documentation screenshots that stay in sync with your product. Covers CI/CD integration, versioning, and best practices."
excerpt: "A hands-on guide to building documentation screenshot automation. Keep your docs always up-to-date with automated capture pipelines."
author: "asad-ali"
publishedAt: "2026-01-15"
category: "guide"
tags: ["documentation", "automation", "ci/cd", "developer experience"]
keywords: ["documentation screenshots", "docs automation", "screenshot api documentation", "technical documentation"]
featured: false
readingTime: 10
---

Documentation screenshots that don't match your product erode user trust and increase support tickets. Yet keeping screenshots manually updated is time-consuming and error-prone, especially with frequent releases.

The solution is treating documentation screenshots as code: automated capture triggered by your CI/CD pipeline, version-controlled alongside your docs, and always in sync with your product.

## Why Automate Documentation Screenshots?

### The Manual Problem

Consider a typical documentation site:
- **100+ pages** with screenshots
- **Weekly releases** with UI changes
- **3 environments** (staging, production, versioned docs)
- **Multiple breakpoints** (desktop, mobile)

Manual updates require:
1. Identify which screenshots need updating
2. Navigate to each page
3. Capture screenshots with consistent settings
4. Crop and resize images
5. Update documentation files
6. Review and publish

For 100 pages with weekly releases, this becomes a full-time job.

### The Automated Solution

Automated screenshots provide:
- **Always current**: Screenshots update on every deployment
- **Consistent quality**: Same device, viewport, and timing
- **Zero manual effort**: Capture happens automatically
- **Version control**: Screenshots tracked with code
- **Multi-environment**: Production, staging, and feature branches

## Architecture Overview

A documentation screenshot system has three components:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Manifest      │ ──▶ │   Capture       │ ──▶ │   Storage       │
│   (pages.json)  │     │   (API calls)   │     │   (git/CDN)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                        ┌─────────────────┐
                        │   CI/CD         │
                        │   (triggers)    │
                        └─────────────────┘
```

1. **Manifest**: JSON file listing pages and capture settings
2. **Capture Script**: Code that calls screenshot API for each page
3. **Storage**: Git repository or CDN for images
4. **CI/CD**: Pipeline that triggers capture on deployments

## Implementation

### Step 1: Create the Manifest

Define what to capture in a JSON file:

```json
// docs/screenshots/manifest.json
{
  "baseUrl": "https://app.yourproduct.com",
  "outputDir": "docs/images/screenshots",
  "defaultOptions": {
    "device": "desktop",
    "format": "png",
    "aiRemoval": true
  },
  "pages": [
    {
      "path": "/dashboard",
      "filename": "dashboard",
      "description": "Main dashboard view"
    },
    {
      "path": "/settings",
      "filename": "settings",
      "description": "User settings page"
    },
    {
      "path": "/reports",
      "filename": "reports",
      "description": "Analytics reports",
      "waitFor": "#chart-loaded"
    },
    {
      "path": "/editor",
      "filename": "editor",
      "description": "Document editor",
      "viewport": { "width": 1400, "height": 900 }
    }
  ]
}
```

### Step 2: Build the Capture Script

```javascript
// scripts/capture-screenshots.js
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.SCREENSHOTLY_API_KEY;
const API_URL = 'https://api.screenshotly.app/screenshot';

async function loadManifest() {
  const manifestPath = path.join(__dirname, '../docs/screenshots/manifest.json');
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

async function captureScreenshot(url, options) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: options.device || 'desktop',
      format: options.format || 'png',
      viewport: options.viewport,
      delay: options.delay || 1000,
      aiRemoval: options.aiRemoval ? {
        enabled: true,
        types: ['cookie-banner', 'chat-widget', 'popup'],
      } : undefined,
      waitFor: options.waitFor,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Capture failed: ${response.status} - ${error}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const manifest = await loadManifest();
  const { baseUrl, outputDir, defaultOptions, pages } = manifest;
  
  // Ensure output directory exists
  const fullOutputDir = path.join(__dirname, '..', outputDir);
  fs.mkdirSync(fullOutputDir, { recursive: true });
  
  console.log(`Capturing ${pages.length} screenshots...`);
  
  const results = [];
  
  for (const page of pages) {
    const url = `${baseUrl}${page.path}`;
    const filename = `${page.filename}.png`;
    const filepath = path.join(fullOutputDir, filename);
    
    console.log(`  Capturing: ${page.path}`);
    
    try {
      const options = { ...defaultOptions, ...page };
      const screenshot = await captureScreenshot(url, options);
      fs.writeFileSync(filepath, screenshot);
      
      results.push({
        path: page.path,
        filename,
        status: 'success',
      });
    } catch (error) {
      console.error(`    Error: ${error.message}`);
      results.push({
        path: page.path,
        filename,
        status: 'failed',
        error: error.message,
      });
    }
  }
  
  // Summary
  const successful = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'failed').length;
  
  console.log(`\nComplete: ${successful} captured, ${failed} failed`);
  
  // Write results for CI
  fs.writeFileSync(
    path.join(fullOutputDir, 'capture-results.json'),
    JSON.stringify(results, null, 2)
  );
  
  // Exit with error if any failed
  if (failed > 0) {
    process.exit(1);
  }
}

main();
```

### Step 3: Add Authentication Support

For authenticated pages, pass session tokens:

```javascript
// scripts/capture-with-auth.js
async function getAuthToken() {
  // Login via API to get session token
  const response = await fetch(`${process.env.APP_URL}/api/test-auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    }),
  });
  
  const data = await response.json();
  return data.token;
}

async function captureAuthenticatedPage(url, options, token) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: options.device || 'desktop',
      format: 'png',
      cookies: [
        {
          name: 'session_token',
          value: token,
          domain: new URL(url).hostname,
        },
      ],
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'chat-widget'],
      },
    }),
  });
  
  return Buffer.from(await response.arrayBuffer());
}

// In main flow:
const authToken = await getAuthToken();
for (const page of authenticatedPages) {
  const screenshot = await captureAuthenticatedPage(
    `${baseUrl}${page.path}`,
    page,
    authToken
  );
  // Save screenshot...
}
```

### Step 4: CI/CD Integration

#### GitHub Actions

```yaml
# .github/workflows/docs-screenshots.yml
name: Update Documentation Screenshots

on:
  # Trigger on production deployments
  deployment:
    types: [completed]
    environments: [production]
  
  # Or manual trigger
  workflow_dispatch:
  
  # Or on schedule
  schedule:
    - cron: '0 0 * * 1'  # Weekly on Monday

jobs:
  capture-screenshots:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Capture screenshots
        env:
          SCREENSHOTLY_API_KEY: ${{ secrets.SCREENSHOTLY_API_KEY }}
          APP_URL: ${{ secrets.APP_URL }}
          TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
          TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
        run: node scripts/capture-screenshots.js
      
      - name: Commit updated screenshots
        run: |
          git config user.name "Screenshot Bot"
          git config user.email "bot@yourcompany.com"
          git add docs/images/screenshots/
          git diff --staged --quiet || git commit -m "docs: Update screenshots [skip ci]"
          git push
```

#### GitLab CI

```yaml
# .gitlab-ci.yml
capture-docs-screenshots:
  stage: deploy
  image: node:20
  script:
    - npm ci
    - node scripts/capture-screenshots.js
    - git config user.name "Screenshot Bot"
    - git config user.email "bot@yourcompany.com"
    - git add docs/images/screenshots/
    - git diff --staged --quiet || git commit -m "docs: Update screenshots"
    - git push origin HEAD:$CI_COMMIT_REF_NAME
  only:
    - main
  when: on_success
```

## Advanced Patterns

### Multi-Environment Screenshots

Capture for different environments:

```javascript
// manifest-env.json
{
  "environments": {
    "production": "https://app.yourproduct.com",
    "staging": "https://staging.yourproduct.com"
  },
  "pages": [...]
}

// Capture script modification
const env = process.env.DOCS_ENV || 'production';
const baseUrl = manifest.environments[env];
const outputDir = `docs/images/screenshots/${env}`;
```

### Versioned Documentation

For versioned docs (Docusaurus, etc.):

```javascript
// Structure for versioned docs
const versions = ['v1', 'v2', 'v3', 'latest'];

for (const version of versions) {
  const baseUrl = `https://app.yourproduct.com/${version}`;
  const outputDir = `docs/versioned_docs/version-${version}/images`;
  
  await captureForVersion(baseUrl, outputDir);
}
```

### Diff Detection

Only commit if screenshots actually changed:

```javascript
const crypto = require('crypto');

function getFileHash(filepath) {
  if (!fs.existsSync(filepath)) return null;
  const content = fs.readFileSync(filepath);
  return crypto.createHash('md5').update(content).digest('hex');
}

async function captureIfChanged(url, filepath, options) {
  const oldHash = getFileHash(filepath);
  const screenshot = await captureScreenshot(url, options);
  const newHash = crypto.createHash('md5').update(screenshot).digest('hex');
  
  if (oldHash !== newHash) {
    fs.writeFileSync(filepath, screenshot);
    return { changed: true, oldHash, newHash };
  }
  
  return { changed: false };
}
```

### Parallel Capture

Speed up with concurrent requests:

```javascript
const pLimit = require('p-limit');

const limit = pLimit(5); // 5 concurrent captures

async function captureAllParallel(pages) {
  const promises = pages.map(page => 
    limit(() => captureScreenshot(`${baseUrl}${page.path}`, page))
  );
  
  return Promise.all(promises);
}
```

## Best Practices

### 1. Use AI Element Removal

Always enable AI removal for clean screenshots:

```javascript
aiRemoval: {
  enabled: true,
  types: ['cookie-banner', 'chat-widget', 'popup'],
}
```

### 2. Wait for Dynamic Content

Add appropriate delays or wait conditions:

```javascript
{
  "path": "/analytics",
  "delay": 2000,  // Wait for charts to load
  "waitFor": "#chart-container"  // Wait for specific element
}
```

### 3. Consistent Viewport

Use the same viewport for all screenshots:

```json
"defaultOptions": {
  "viewport": { "width": 1280, "height": 800 }
}
```

### 4. Handle Errors Gracefully

Don't fail the entire pipeline on one error:

```javascript
try {
  await captureScreenshot(url, options);
} catch (error) {
  console.warn(`Warning: ${page.path} failed, using existing screenshot`);
  // Continue with next page
}
```

### 5. Add Metadata

Track when screenshots were captured:

```javascript
// Write metadata file
fs.writeFileSync('docs/images/screenshots/metadata.json', JSON.stringify({
  capturedAt: new Date().toISOString(),
  environment: process.env.APP_ENV,
  commit: process.env.GITHUB_SHA,
  pages: results,
}));
```

## Conclusion

Automated documentation screenshots ensure your docs always match your product. The investment in setup pays off immediately:

- **Hours saved weekly** on manual updates
- **Consistent quality** across all pages
- **Always current** screenshots after every deployment
- **Reduced support tickets** from confused users

Start with a simple manifest and capture script, then expand to handle authentication, multiple environments, and versioned documentation as needed.

---

**Ready to automate your documentation screenshots?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

Learn more about [documentation screenshot use cases →](/use-cases/documentation-screenshots)
