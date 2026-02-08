---
title: "How to Capture Screenshots in CI/CD Pipelines"
description: "Integrate automated screenshots into GitHub Actions, GitLab CI, and other pipelines. Update documentation, run visual tests, and generate previews automatically."
excerpt: "A DevOps guide to screenshot automation in CI/CD. Capture, compare, and deploy screenshots as part of your deployment workflow."
author: "asad-ali"
publishedAt: "2025-12-20"
category: "tutorial"
tags: ["ci/cd", "github actions", "devops", "automation", "testing"]
keywords: ["ci/cd screenshot", "github actions screenshot", "gitlab ci screenshot", "automated screenshot pipeline", "visual testing ci"]
featured: false
readingTime: 9
---

Modern CI/CD pipelines do more than build and deploy code. They can automatically update documentation screenshots, run visual regression tests, and generate preview images—all without manual intervention.

This guide covers practical patterns for integrating screenshots into your deployment workflows.

## Why CI/CD Screenshots?

### The Manual Problem

Documentation screenshots get stale because:
- Updates are easy to forget during releases
- Manual capture is time-consuming
- Different people produce inconsistent results
- Staging screenshots differ from production

### The Automated Solution

CI/CD screenshot automation provides:
- **Synchronized updates**: Screenshots update with code
- **Consistency**: Same capture settings every time
- **No manual work**: Runs automatically on deploy
- **Version control**: Screenshots tracked with code

## GitHub Actions Integration

### Basic Screenshot Workflow

```yaml
# .github/workflows/screenshots.yml
name: Update Documentation Screenshots

on:
  push:
    branches: [main]
  workflow_dispatch:  # Manual trigger

jobs:
  capture-screenshots:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Capture screenshots
        env:
          SCREENSHOTLY_API_KEY: ${{ secrets.SCREENSHOTLY_API_KEY }}
          APP_URL: https://app.example.com
        run: node scripts/capture-screenshots.js
      
      - name: Commit updated screenshots
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          git add docs/images/
          git diff --staged --quiet || git commit -m "docs: Update screenshots [skip ci]"
          git push
```

### Screenshot Capture Script

```javascript
// scripts/capture-screenshots.js
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.SCREENSHOTLY_API_KEY;
const APP_URL = process.env.APP_URL;

const pages = [
  { path: '/dashboard', filename: 'dashboard.png' },
  { path: '/settings', filename: 'settings.png' },
  { path: '/reports', filename: 'reports.png' },
];

async function captureScreenshot(url) {
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
      viewport: { width: 1280, height: 800 },
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'chat-widget'],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to capture ${url}: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const outputDir = path.join(process.cwd(), 'docs/images');
  fs.mkdirSync(outputDir, { recursive: true });

  for (const page of pages) {
    console.log(`Capturing: ${page.path}`);
    const screenshot = await captureScreenshot(`${APP_URL}${page.path}`);
    fs.writeFileSync(path.join(outputDir, page.filename), screenshot);
  }

  console.log('All screenshots captured');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
```

## GitLab CI Integration

```yaml
# .gitlab-ci.yml
stages:
  - deploy
  - screenshots

deploy:
  stage: deploy
  script:
    - echo "Deploy application..."

update-screenshots:
  stage: screenshots
  image: node:20
  dependencies:
    - deploy
  script:
    - npm ci
    - node scripts/capture-screenshots.js
    - |
      if [ -n "$(git status --porcelain docs/images)" ]; then
        git config user.email "bot@example.com"
        git config user.name "GitLab Bot"
        git add docs/images/
        git commit -m "docs: Update screenshots"
        git push origin HEAD:$CI_COMMIT_REF_NAME
      fi
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
```

## Visual Regression Testing

### Comparison Workflow

```yaml
# .github/workflows/visual-tests.yml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main]

jobs:
  visual-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Capture current screenshots
        env:
          SCREENSHOTLY_API_KEY: ${{ secrets.SCREENSHOTLY_API_KEY }}
          APP_URL: ${{ secrets.STAGING_URL }}
        run: node scripts/capture-for-comparison.js
      
      - name: Compare with baselines
        run: node scripts/compare-screenshots.js
      
      - name: Upload diff artifacts
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-diffs
          path: test-results/diffs/
```

### Comparison Script

```javascript
// scripts/compare-screenshots.js
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const BASELINE_DIR = 'test-results/baselines';
const CURRENT_DIR = 'test-results/current';
const DIFF_DIR = 'test-results/diffs';
const THRESHOLD = 0.1; // 10% difference threshold

async function compareImages(baselinePath, currentPath, diffPath) {
  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));
  
  const { width, height } = baseline;
  const diff = new PNG({ width, height });
  
  const mismatchedPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );
  
  const diffPercent = (mismatchedPixels / (width * height)) * 100;
  
  if (diffPercent > THRESHOLD) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    return { passed: false, diffPercent };
  }
  
  return { passed: true, diffPercent };
}

async function main() {
  fs.mkdirSync(DIFF_DIR, { recursive: true });
  
  const baselines = fs.readdirSync(BASELINE_DIR);
  const results = [];
  
  for (const file of baselines) {
    const baselinePath = path.join(BASELINE_DIR, file);
    const currentPath = path.join(CURRENT_DIR, file);
    const diffPath = path.join(DIFF_DIR, `diff-${file}`);
    
    if (!fs.existsSync(currentPath)) {
      console.log(`MISSING: ${file}`);
      results.push({ file, status: 'missing' });
      continue;
    }
    
    const result = await compareImages(baselinePath, currentPath, diffPath);
    console.log(`${result.passed ? 'PASS' : 'FAIL'}: ${file} (${result.diffPercent.toFixed(2)}% diff)`);
    results.push({ file, ...result });
  }
  
  const failures = results.filter(r => !r.passed);
  if (failures.length > 0) {
    console.error(`\n${failures.length} visual regression(s) detected`);
    process.exit(1);
  }
}

main();
```

## Deploy Preview Screenshots

### Vercel Deployment Comments

```yaml
# .github/workflows/preview-screenshots.yml
name: Preview Screenshots

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  capture-preview:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Wait for Vercel Preview
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        id: vercel
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          max_timeout: 300
      
      - name: Capture preview screenshots
        env:
          SCREENSHOTLY_API_KEY: ${{ secrets.SCREENSHOTLY_API_KEY }}
        run: |
          node scripts/capture-preview.js "${{ steps.vercel.outputs.url }}"
      
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const images = fs.readdirSync('preview-screenshots');
            
            let body = '## 📸 Preview Screenshots\n\n';
            for (const img of images) {
              body += `### ${img.replace('.png', '')}\n`;
              body += `![${img}](https://your-cdn.com/previews/${context.payload.pull_request.number}/${img})\n\n`;
            }
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body
            });
```

## Scheduled Screenshot Updates

### Weekly Documentation Refresh

```yaml
# .github/workflows/weekly-screenshots.yml
name: Weekly Screenshot Update

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Capture all documentation screenshots
        env:
          SCREENSHOTLY_API_KEY: ${{ secrets.SCREENSHOTLY_API_KEY }}
        run: node scripts/capture-all-docs.js
      
      - name: Create PR with updates
        uses: peter-evans/create-pull-request@v6
        with:
          title: 'docs: Weekly screenshot update'
          commit-message: 'docs: Update documentation screenshots'
          branch: automated/screenshot-update
          body: |
            ## Automated Screenshot Update
            
            This PR contains the weekly documentation screenshot refresh.
            
            Please review the changes and merge if they look correct.
```

## Multi-Environment Captures

### Staging vs Production Comparison

```javascript
// scripts/compare-environments.js
const environments = [
  { name: 'staging', url: process.env.STAGING_URL },
  { name: 'production', url: process.env.PRODUCTION_URL },
];

const pages = [
  '/dashboard',
  '/settings',
  '/pricing',
];

async function captureAllEnvironments() {
  const results = {};
  
  for (const env of environments) {
    results[env.name] = {};
    
    for (const page of pages) {
      const screenshot = await captureScreenshot(`${env.url}${page}`);
      results[env.name][page] = screenshot;
    }
  }
  
  return results;
}

async function compareEnvironments() {
  const screenshots = await captureAllEnvironments();
  
  for (const page of pages) {
    const staging = screenshots.staging[page];
    const production = screenshots.production[page];
    
    const diff = await compareImages(staging, production);
    
    if (diff.diffPercent > 5) {
      console.log(`DIFFERENCE on ${page}: ${diff.diffPercent.toFixed(2)}%`);
    }
  }
}
```

## Secrets Management

Store sensitive values as repository secrets:

```yaml
# Required secrets:
# - SCREENSHOTLY_API_KEY: Your API key
# - STAGING_URL: Staging environment URL
# - PRODUCTION_URL: Production URL (if different from public)
```

### Accessing Secrets

```yaml
env:
  SCREENSHOTLY_API_KEY: ${{ secrets.SCREENSHOTLY_API_KEY }}
```

### Rotating API Keys

Create a workflow to alert on expiring keys:

```yaml
- name: Check API key validity
  run: |
    response=$(curl -s -o /dev/null -w "%{http_code}" \
      -H "Authorization: Bearer $SCREENSHOTLY_API_KEY" \
      https://api.screenshotly.app/health)
    
    if [ "$response" != "200" ]; then
      echo "::error::API key may be invalid or expired"
      exit 1
    fi
```

## Error Handling

### Retry Logic

```javascript
async function captureWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await captureScreenshot(url);
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt === maxRetries) throw error;
      
      await new Promise(r => setTimeout(r, attempt * 2000));
    }
  }
}
```

### Graceful Failure

```yaml
- name: Capture screenshots
  continue-on-error: true
  id: capture
  run: node scripts/capture-screenshots.js

- name: Handle capture failure
  if: steps.capture.outcome == 'failure'
  run: |
    echo "Screenshot capture failed, using cached images"
    # Fallback logic here
```

## Performance Optimization

### Parallel Capture

```javascript
const pLimit = require('p-limit');
const limit = pLimit(5); // 5 concurrent captures

async function captureAll(pages) {
  const promises = pages.map(page =>
    limit(() => captureScreenshot(`${APP_URL}${page.path}`))
  );
  
  return Promise.all(promises);
}
```

### Caching

```yaml
- name: Cache screenshots
  uses: actions/cache@v4
  with:
    path: docs/images
    key: screenshots-${{ hashFiles('scripts/screenshot-manifest.json') }}
```

## Conclusion

CI/CD screenshot automation eliminates manual work while ensuring documentation stays current. Key patterns:

1. **Push to main** → Update production screenshots
2. **Pull request** → Visual regression tests
3. **Preview deploy** → Capture and comment
4. **Schedule** → Weekly documentation refresh
5. **Multi-environment** → Compare staging vs production

With proper pipeline integration, screenshots become just another automated part of your deployment process.

---

**Ready to automate CI/CD screenshots?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Visual Regression Testing Guide →](/blog/visual-regression-testing-guide)
