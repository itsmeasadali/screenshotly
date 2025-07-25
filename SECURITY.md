# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Measures Implemented

### 🔐 Authentication & Authorization
- **API Key Authentication**: All API requests require valid Bearer tokens
- **Clerk Integration**: Secure user authentication with built-in protection
- **Route Protection**: Middleware enforces authentication on protected routes
- **User ID Validation**: Input validation to prevent injection attacks

### 🛡️ Data Protection
- **Database Security**: Type-safe Prisma queries prevent SQL injection
- **Input Validation**: Zod schemas validate all API inputs
- **Environment Variables**: Validated env vars with proper error handling
- **API Key Hashing**: SHA-256 hashing for stored API keys

### 🌐 Network Security
- **Security Headers**: CSP, HSTS, X-Frame-Options, and more
- **Rate Limiting**: Redis-based rate limiting per API key and IP
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **SSL/TLS**: HTTPS enforcement in production

### 📊 Monitoring & Logging
- **Request Logging**: Comprehensive API request tracking
- **Error Handling**: Secure error responses without information leakage
- **Development Logging**: Sensitive data only logged in development
- **Audit Trail**: Database tracking of API usage and access

### 🔄 Infrastructure Security
- **Environment Isolation**: Separate configs for dev/staging/production
- **Dependency Management**: Regular security updates and vulnerability scanning
- **Secret Management**: No hardcoded secrets, environment-based configuration
- **Database Connections**: Secure connection pooling with proper timeouts

## Security Best Practices for Users

### API Key Management
1. **Store Securely**: Never commit API keys to version control
2. **Environment Variables**: Use `.env` files and secure environment management
3. **Rotate Regularly**: Generate new keys periodically and revoke old ones
4. **Scope Appropriately**: Use different keys for different environments
5. **Monitor Usage**: Regular check API key usage patterns

### Implementation Guidelines
```typescript
// ✅ Good: Use environment variables
const apiKey = process.env.SCREENSHOTLY_API_KEY;

// ❌ Bad: Hardcoded in source
const apiKey = 'scr_1234567890abcdef';

// ✅ Good: Validate before use
if (!apiKey) {
  throw new Error('API key not configured');
}
```

### Rate Limit Management
- Monitor your usage to stay within limits
- Implement exponential backoff for retries
- Cache results when appropriate to reduce API calls
- Use webhooks instead of polling when possible

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### 🚨 For Critical Security Issues
If you find a critical vulnerability that could compromise user data or system security:

1. **DO NOT** create a public GitHub issue
2. **DO NOT** disclose the vulnerability publicly
3. Email us immediately at: **security@screenshotly.app**

### 📧 What to Include in Your Report
Please include as much detail as possible:

- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to replicate the issue
- **Impact Assessment**: Your assessment of the potential impact
- **Suggested Fix**: If you have ideas for fixing the issue
- **Environment**: OS, browser, Node.js version, etc.

### 🎯 Scope
We consider the following to be in scope for security reports:

- **Authentication bypass**
- **Authorization flaws**
- **SQL injection**
- **XSS (Cross-Site Scripting)**
- **CSRF (Cross-Site Request Forgery)**
- **Server-side request forgery (SSRF)**
- **Remote code execution**
- **Information disclosure**
- **API security issues**
- **Rate limiting bypasses**

### ⚡ Response Timeline
- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 72 hours
- **Status Updates**: Weekly until resolved
- **Resolution**: Varies by severity and complexity

### 🏆 Recognition
We appreciate security researchers who help improve our security. With your permission, we'll:

- Credit you in our security acknowledgments
- Provide updates on the fix progress
- Work with you on responsible disclosure timing

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed and fixed. Users will be notified through:

- GitHub security advisories
- Release notes
- Email notifications (for critical issues)

## Compliance

Our security measures align with:

- **OWASP Top 10** security risks
- **SOC 2 Type II** controls
- **GDPR** data protection requirements
- **Industry best practices** for SaaS applications

## Debugging CSP Issues

If you encounter Content Security Policy violations:

1. **Check Browser Console**: Look for CSP error messages starting with "Content Security Policy"
2. **Identify Blocked Resource**: Note the exact URL being blocked
3. **Update CSP**: Add the domain to appropriate directive in `next.config.ts`

### Common CSP Fixes
```typescript
// For Clerk authentication and CAPTCHA
"script-src": "... blob: https://*.clerk.com https://challenges.cloudflare.com https://*.hcaptcha.com"
"worker-src": "'self' blob:"
"frame-src": "... https://www.google.com https://challenges.cloudflare.com"

// For Stripe payments  
"script-src": "... https://js.stripe.com"
"frame-src": "... https://checkout.stripe.com"

// For development (more permissive)
"script-src": "... https: http: blob:"
```

### ⚠️ Invalid CSP Patterns
**AVOID** these patterns (they will be ignored by browsers):
```typescript
// ❌ INVALID - wildcard in middle of domain
"script-src": "https://clerk.*.com"  // Will be ignored!

// ✅ VALID - subdomain wildcard
"script-src": "https://*.clerk.com"  // Works correctly
```

### CAPTCHA Support
The application supports multiple CAPTCHA providers:
- **Cloudflare Turnstile**: `challenges.cloudflare.com`
- **hCaptcha**: `*.hcaptcha.com`, `hcaptcha.com`
- **Google reCAPTCHA**: `www.google.com`, `www.gstatic.com`

### Key CSP Directives for Clerk
- **`worker-src 'self' blob:`**: Required for Clerk's Web Workers
- **`script-src blob:`**: Allows dynamic script loading from blob URLs
- **`frame-src`**: For embedded CAPTCHA frames

### Current Valid Clerk Domains
Our CSP supports these Clerk domain patterns:
- `https://*.clerk.com` - API and assets (api.clerk.com, js.clerk.com)
- `https://*.clerk.accounts.dev` - Development accounts
- `https://*.clerk.dev` - Development instances
- `https://clerk.screenshotly.app` - Your specific Clerk instance

**Note**: Patterns like `https://clerk.*.com` are invalid CSP syntax and will be ignored by browsers.

## Contact

For security-related questions or concerns:
- **Security Team**: security@screenshotly.app
- **General Contact**: hello@screenshotly.app

---

**Last Updated**: January 2025
**Version**: 1.0 