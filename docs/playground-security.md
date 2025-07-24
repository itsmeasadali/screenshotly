# Playground Security Improvements

## Overview

The Screenshotly playground has been enhanced with session-based authentication to provide a more secure and user-friendly experience compared to the previous hardcoded API token approach.

## Security Improvements

### Before (Issues)
- **Hardcoded API Token**: The playground used `process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY` exposed in client-side code
- **Security Risk**: API token was visible in the browser bundle
- **No User Context**: All requests appeared anonymous
- **Static Rate Limiting**: Same limits for all users regardless of authentication

### After (Solutions)
- **Session-Based Authentication**: Uses Clerk session for authentication
- **No Client-Side Tokens**: No API tokens exposed in browser
- **User-Aware**: Differentiates between signed-in and anonymous users
- **Dynamic Rate Limiting**: Different limits based on authentication status

## Implementation Details

### New API Endpoint
- **Route**: `/api/screenshot-playground`
- **Authentication**: Session-based using Clerk `auth()` helper
- **Public Access**: Available to both anonymous and authenticated users

### Rate Limiting Strategy

```typescript
// Different identifiers and limits based on auth status
const rateLimitIdentifier = userId 
  ? `playground-user:${userId}` 
  : `playground-anon:${ip}`;

const tier = userId ? 'free' : 'playground';
```

#### Rate Limits
- **Anonymous Users**: 50 requests per hour
- **Signed-in Users**: 500 requests per day (same as free tier)
- **Pro Users**: 5000 requests per day

### Feature Access Control

#### AI Features
- **Anonymous**: Not available
- **Signed-in**: Available with playground limitations
- **Pro**: Full AI features available

#### Authentication Messages
- Clear feedback about feature availability
- Prompts to sign in for enhanced features
- Rate limit information in responses

## API Response Headers

The playground API includes rate limiting headers:

```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 49
X-RateLimit-Reset: 1634567890123
```

## Error Handling

### Rate Limit Exceeded (429)
```json
{
  "error": "Rate limit exceeded for playground",
  "limit": 50,
  "reset": "2023-10-18T15:30:00.000Z",
  "message": "Rate limit exceeded. Sign in for higher limits or try again later."
}
```

### AI Features Require Auth (401)
```json
{
  "error": "AI features require authentication. Please sign in.",
  "requiresAuth": true
}
```

## Benefits

1. **Enhanced Security**: No API tokens in client-side code
2. **Better UX**: Users understand their current limits and capabilities
3. **Scalable**: Easy to adjust limits and features per user tier
4. **Maintainable**: No hardcoded tokens to manage
5. **Analytics**: Better tracking of user behavior and feature usage

## Migration Notes

- Old playground requests to `/api/screenshot` with hardcoded tokens still work
- New playground uses `/api/screenshot-playground` with session auth
- Gradual migration approach maintains backward compatibility
- Frontend updated to use new endpoint and show auth status

## Security Considerations

- Session validation on every request
- IP-based rate limiting for anonymous users
- User-based rate limiting for authenticated users
- No sensitive data in client-side code
- Rate limiting to prevent abuse

This approach provides a much more secure and user-friendly playground experience while maintaining the same functionality. 