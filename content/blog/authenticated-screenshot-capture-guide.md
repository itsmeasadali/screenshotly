---
title: "How to Capture Screenshots with Authentication and Cookies"
description: "Learn how to capture screenshots of authenticated pages, logged-in dashboards, and protected content using session cookies and authentication."
excerpt: "A technical guide to capturing screenshots of authenticated content. Handle cookies, sessions, and protected pages for documentation and testing."
author: "asad-ali"
publishedAt: "2025-12-28"
category: "tutorial"
tags: ["authentication", "cookies", "protected pages", "api", "security"]
keywords: ["authenticated screenshot", "screenshot with login", "capture logged in page", "session cookies screenshot"]
featured: false
readingTime: 8
---

Many valuable screenshots require authentication—dashboards, admin panels, user profiles, and internal tools. Capturing these programmatically requires passing authentication credentials to the screenshot service.

This guide covers techniques for capturing authenticated content while maintaining security best practices.

## Understanding Authentication Methods

### How Screenshot APIs Handle Auth

When you request a screenshot, the API:

1. Spins up a headless browser
2. Sets any cookies you provide
3. Navigates to the URL
4. Waits for content to load
5. Captures the screenshot

By passing valid session cookies, the browser appears logged in to your application.

### Authentication Options

| Method | Best For | Security Level |
|--------|----------|----------------|
| Session cookies | Most web apps | High |
| Bearer tokens | API-driven SPAs | High |
| Basic auth | Simple protection | Medium |
| Custom headers | Internal tools | Medium |

## Session Cookie Authentication

Most web applications use session cookies. Here's how to capture authenticated content:

### Step 1: Obtain Session Cookie

Get a valid session from your authentication system:

```javascript
async function getSessionToken(email, password) {
  const response = await fetch('https://app.example.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  // Extract session cookie from response
  const cookies = response.headers.get('set-cookie');
  const sessionMatch = cookies.match(/session=([^;]+)/);
  
  return sessionMatch ? sessionMatch[1] : null;
}
```

### Step 2: Pass Cookie to Screenshot API

```javascript
async function captureAuthenticatedPage(url, sessionToken) {
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
      cookies: [
        {
          name: 'session',
          value: sessionToken,
          domain: 'app.example.com',
          path: '/',
          httpOnly: true,
          secure: true,
        },
      ],
    }),
  });

  return response.arrayBuffer();
}
```

### Complete Example

```javascript
async function captureUserDashboard(userId) {
  // Get session for the specific user
  const session = await getSessionToken(
    process.env.SERVICE_ACCOUNT_EMAIL,
    process.env.SERVICE_ACCOUNT_PASSWORD
  );
  
  // Impersonate user if needed (depends on your auth system)
  const userSession = await impersonateUser(session, userId);
  
  // Capture their dashboard
  const screenshot = await captureAuthenticatedPage(
    `https://app.example.com/dashboard`,
    userSession
  );
  
  return screenshot;
}
```

## Multiple Cookies

Some applications require multiple cookies:

```javascript
{
  url: 'https://app.example.com/admin',
  cookies: [
    {
      name: 'session_id',
      value: 'abc123',
      domain: 'app.example.com',
    },
    {
      name: 'csrf_token',
      value: 'xyz789',
      domain: 'app.example.com',
    },
    {
      name: 'user_preferences',
      value: 'theme=dark',
      domain: 'app.example.com',
    },
  ],
}
```

## JWT/Bearer Token Authentication

For SPAs using JWT authentication in localStorage:

### Option 1: Inject Token via Script

```javascript
{
  url: 'https://app.example.com/dashboard',
  injectScripts: [`
    localStorage.setItem('auth_token', '${jwtToken}');
    location.reload();
  `],
  delay: 2000, // Wait for reload and auth
}
```

### Option 2: Pass as Cookie

If your app can read tokens from cookies:

```javascript
{
  url: 'https://app.example.com/dashboard',
  cookies: [
    {
      name: 'auth_token',
      value: jwtToken,
      domain: 'app.example.com',
    },
  ],
}
```

### Option 3: Use Authorization Header

For APIs that check headers directly:

```javascript
{
  url: 'https://app.example.com/api/render/dashboard',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
  },
}
```

## Basic Authentication

For pages protected with HTTP Basic Auth:

```javascript
{
  url: 'https://username:password@staging.example.com/admin',
  device: 'desktop',
  format: 'png',
}
```

Or encode in headers:

```javascript
{
  url: 'https://staging.example.com/admin',
  headers: {
    'Authorization': `Basic ${Buffer.from('username:password').toString('base64')}`,
  },
}
```

## Security Best Practices

### 1. Use Service Accounts

Create dedicated accounts for screenshot automation:

```javascript
// Don't use real user credentials
const SCREENSHOT_SERVICE_EMAIL = 'screenshot-bot@example.com';
const SCREENSHOT_SERVICE_PASSWORD = process.env.BOT_PASSWORD;
```

### 2. Limit Permissions

Service accounts should have read-only access:

```sql
-- Create a limited role
CREATE ROLE screenshot_viewer;
GRANT SELECT ON dashboards TO screenshot_viewer;
-- No INSERT, UPDATE, DELETE
```

### 3. Short-Lived Sessions

Configure sessions to expire quickly:

```javascript
const session = await createSession({
  userId: 'screenshot-bot',
  expiresIn: '5m', // 5 minutes only
});
```

### 4. IP Whitelisting

If possible, whitelist screenshot service IPs:

```javascript
// In your auth middleware
const allowedIPs = ['api.screenshotly.app'];
if (isServiceAccount(req.user) && !allowedIPs.includes(req.ip)) {
  throw new Error('Service accounts restricted to allowed IPs');
}
```

### 5. Audit Logging

Log all automated screenshot access:

```javascript
await auditLog.create({
  action: 'screenshot_capture',
  user: 'screenshot-service',
  target: url,
  timestamp: new Date(),
  source: 'automation',
});
```

### 6. Rotate Credentials

Regularly rotate service account credentials:

```javascript
// Scheduled job
async function rotateScreenshotCredentials() {
  const newPassword = generateSecurePassword();
  await updateServiceAccountPassword('screenshot-bot', newPassword);
  await updateSecretManager('SCREENSHOT_BOT_PASSWORD', newPassword);
}
```

## Common Use Cases

### Customer Success Screenshots

Capture customer dashboards for success reports:

```javascript
async function generateCustomerReport(customerId) {
  // Get admin session
  const adminSession = await getAdminSession();
  
  // Get customer's dashboard URL
  const customer = await Customer.findById(customerId);
  const dashboardUrl = `https://app.example.com/admin/customers/${customerId}/dashboard`;
  
  // Capture
  const screenshot = await captureAuthenticatedPage(dashboardUrl, adminSession);
  
  // Generate report PDF with screenshot
  return generateReportPDF(customer, screenshot);
}
```

### Automated Documentation

Keep docs screenshots in sync:

```javascript
async function updateDocScreenshots() {
  const session = await getServiceAccountSession();
  
  const pages = [
    { path: '/settings', name: 'settings' },
    { path: '/dashboard', name: 'dashboard' },
    { path: '/reports', name: 'reports' },
  ];
  
  for (const page of pages) {
    const screenshot = await captureAuthenticatedPage(
      `https://app.example.com${page.path}`,
      session
    );
    
    await fs.writeFile(`docs/images/${page.name}.png`, screenshot);
  }
}
```

### User Onboarding Previews

Show users what their dashboard will look like:

```javascript
async function generateOnboardingPreview(planType) {
  // Use demo account with sample data
  const demoSession = await getDemoAccountSession(planType);
  
  const screenshot = await captureAuthenticatedPage(
    'https://app.example.com/dashboard',
    demoSession
  );
  
  return screenshot;
}
```

### Visual Testing

Test authenticated flows:

```javascript
async function testAuthenticatedPages() {
  const session = await getTestUserSession();
  
  const testCases = [
    { url: '/dashboard', baseline: 'dashboard-baseline.png' },
    { url: '/settings', baseline: 'settings-baseline.png' },
    { url: '/profile', baseline: 'profile-baseline.png' },
  ];
  
  for (const test of testCases) {
    const current = await captureAuthenticatedPage(
      `https://staging.example.com${test.url}`,
      session
    );
    
    const diff = await compareImages(current, test.baseline);
    if (diff > 0.1) {
      console.log(`Visual regression detected: ${test.url}`);
    }
  }
}
```

## Handling Common Challenges

### Session Expiration

Handle sessions that expire during batch processing:

```javascript
class AuthenticatedCaptureService {
  constructor() {
    this.session = null;
    this.sessionExpiry = null;
  }
  
  async getValidSession() {
    if (!this.session || Date.now() > this.sessionExpiry) {
      this.session = await this.refreshSession();
      this.sessionExpiry = Date.now() + (4 * 60 * 1000); // 4 minutes
    }
    return this.session;
  }
  
  async capture(url) {
    const session = await this.getValidSession();
    return captureAuthenticatedPage(url, session);
  }
}
```

### Two-Factor Authentication

For 2FA-protected accounts:

1. **Use app passwords**: Many services offer app-specific passwords
2. **TOTP generation**: Generate codes programmatically if needed
3. **Trusted devices**: Mark the automation server as trusted

```javascript
const speakeasy = require('speakeasy');

async function loginWith2FA(email, password, totpSecret) {
  // Get initial session
  const { challengeToken } = await initiateLogin(email, password);
  
  // Generate TOTP code
  const code = speakeasy.totp({
    secret: totpSecret,
    encoding: 'base32',
  });
  
  // Complete 2FA
  const session = await complete2FA(challengeToken, code);
  return session;
}
```

### Rate Limiting

Respect your application's rate limits:

```javascript
const pLimit = require('p-limit');
const limit = pLimit(2); // Only 2 concurrent

async function captureMany(urls, session) {
  const captures = urls.map(url =>
    limit(async () => {
      const result = await captureAuthenticatedPage(url, session);
      await sleep(1000); // 1 second between captures
      return result;
    })
  );
  
  return Promise.all(captures);
}
```

## Troubleshooting

### "Session Invalid" Errors

- Verify cookie domain matches exactly
- Check if `httpOnly` and `secure` flags are correct
- Ensure session hasn't expired

### "Redirected to Login"

- Session may have expired before capture
- Check if your app validates sessions on each request
- Verify all required cookies are included

### "CSRF Token Invalid"

- Include CSRF token in cookies
- Some apps need CSRF in headers too
- Regenerate CSRF with each session

### "Page Loads Empty"

- SPA may need longer delay for auth to complete
- Try using `waitFor` to wait for specific elements
- Inject auth before navigation

## Conclusion

Capturing authenticated screenshots requires careful handling of sessions and security. Key takeaways:

1. **Use session cookies** for most web applications
2. **Create service accounts** with limited permissions
3. **Rotate credentials** regularly
4. **Log all access** for audit trails
5. **Handle expiration** gracefully

With proper implementation, you can safely automate screenshots of any protected content.

---

**Ready to capture authenticated pages?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Documentation Screenshot Automation →](/blog/documentation-screenshot-automation-guide)
