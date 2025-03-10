# Screenshotly

![Screenshotly](public/demo-screenshot.png)

Screenshotly is an AI-powered screenshot API that automatically removes unwanted elements like cookie banners, ads, and popups to create clean, professional screenshots.

## Features

### 🤖 AI-Powered Cleaning
- Automatic detection and removal of:
  - Cookie consent banners
  - Advertisement elements
  - Chat widgets
  - Newsletter popups
  - Social media overlays
- Adjustable confidence thresholds for precise control
- Smart element detection using GPT-4 Vision

### 📱 Device Support
- Multiple device viewports:
  - Desktop (1920×1080)
  - Laptop (1366×768)
  - Tablet (768×1024)
  - Mobile (375×812)
- Custom viewport sizes supported

### 🖼️ Device Mockups
- Professional device frames:
  - Browser window (Light/Dark)
  - iPhone 14 Pro
  - MacBook Pro
- High-quality mockup templates

### 💪 Powerful Features
- Full-page screenshots
- Custom element capture
- Multiple output formats:
  - PNG (Best for transparency)
  - JPEG (Adjustable quality)
  - PDF (Document format)
- Configurable capture delay
- Intuitive UI with tooltips and feedback
- Real-time format preview

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4 Vision API
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma
- **Rate Limiting**: Upstash Redis
- **Screenshot Engine**: Puppeteer
- **Image Processing**: Sharp

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key
- Upstash Redis account
- Clerk account

### Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your_postgresql_url"
DIRECT_URL="your_direct_postgresql_url"

# OpenAI
OPENAI_API_KEY="your_openai_api_key"

# Redis Configuration (Upstash)
UPSTASH_REDIS_REST_URL="your_upstash_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_token"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# API Configuration
NEXT_PUBLIC_PLAYGROUND_API_KEY="your_playground_api_key"
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/screenshotly.git
   cd screenshotly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## API Usage

### Basic Screenshot

```typescript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'desktop',
    format: 'png'
  }),
});

const screenshot = await response.blob();
```

### With AI Element Removal

```typescript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'ad', 'chat-widget'],
      confidence: 0.8
    }
  }),
});
```

### With Device Mockup

```typescript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'mobile',
    mockup: 'iphone-14'
  }),
});
```

## Rate Limits

- **Free Plan**: 500 requests/day
- **Pro Plan**: 5000 requests/day

Rate limit information is included in response headers:
```bash
X-RateLimit-Limit: Your plan's limit
X-RateLimit-Remaining: Requests remaining
X-RateLimit-Reset: Timestamp when limit resets
```

## Development

### Project Structure

```
screenshotly/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── prisma/              # Database schema
├── public/             # Static assets
└── docs/              # Documentation
```

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [https://docs.screenshotly.app](https://docs.screenshotly.app)
- Email: support@screenshotly.app
- GitHub Issues: [Report a bug](https://github.com/yourusername/screenshotly/issues)