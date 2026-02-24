import { Metadata } from 'next';
import Link from 'next/link';
import GuestLayout from '@/components/layouts/GuestLayout';
import PlaygroundContent from '@/components/PlaygroundContent';
import { JsonLd } from '@/components/seo';
import { getFAQSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Free Screenshot Playground – Test URLs Instantly',
  description:
    'Capture website screenshots instantly with our free online tool. Enter any URL and download a high-quality PNG — no sign-up, no API key needed.',
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    title: 'Free Screenshot Playground – Test URLs Instantly',
    description:
      'Capture website screenshots instantly with our free online tool. Enter any URL and download a high-quality PNG — no sign-up, no API key needed.',
    type: 'website',
    url: '/playground',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Screenshot Playground – Test URLs Instantly',
    description:
      'Capture website screenshots instantly with our free online tool. Enter any URL and download a high-quality PNG — no sign-up, no API key needed.',
  },
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Screenshotly Screenshot Playground',
  description:
    'Free online tool to capture website screenshots instantly. Enter any URL, configure options, and download high-quality screenshots.',
  url: 'https://screenshotly.app/playground',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const playgroundFAQs = [
  {
    question: 'Is the screenshot playground really free?',
    answer: 'Yes. The playground is completely free with no sign-up required. You can capture screenshots of any public URL instantly and download the result. There are no watermarks or quality restrictions on free captures. For higher volumes or programmatic access, see our paid API plans starting at $14/month.',
  },
  {
    question: 'What file formats can I download?',
    answer: 'The playground supports PNG (best for crisp UI screenshots with transparency), JPEG (smaller file sizes, ideal for photos and previews), and WebP (modern format with excellent compression for web use). You can also choose different device viewports and wrap your screenshot in mockup frames like browser windows or iPhone bezels before downloading.',
  },
  {
    question: 'Do I need an API key to use the playground?',
    answer: 'No. The playground works without an API key or account — just enter a URL and click capture. It is designed for quick one-off tests and evaluations. When you are ready to integrate screenshots into your application or workflow programmatically, sign up for a free account to get an API key with 100 free captures.',
  },
  {
    question: "What's the difference between the playground and the API?",
    answer: 'The playground is a visual, interactive tool for testing screenshots in your browser — you configure options with dropdowns and see the result immediately. The API is a programmatic REST endpoint you call from your own code (Python, JavaScript, Go, etc.) to automate captures at scale. The API also supports advanced features like webhooks, authenticated page capture, batch processing, and caching that are not available in the playground.',
  },
  {
    question: 'Are there usage limits on the playground?',
    answer: 'The playground is rate-limited to a few requests per minute to prevent abuse, but there is no hard daily cap for normal use. If you hit the rate limit, wait a moment and try again. For high-volume captures — batch processing, CI/CD pipelines, or real-time generation — the API with a paid plan provides much higher throughput (up to 200 requests/minute on the Scale plan).',
  },
];

export default function PlaygroundPage() {
  return (
    <GuestLayout>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={getFAQSchema(playgroundFAQs)} />
      <PlaygroundContent />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Screenshot Playground FAQ
        </h2>
        <div className="space-y-6">
          {playgroundFAQs.map((faq, i) => (
            <div key={i} className="border-b border-border pb-4">
              <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Looking for a simpler tool?{' '}
          <Link href="/tools/website-screenshot" className="text-primary hover:underline">
            Try our one-click website screenshot tool
          </Link>{' '}
          or explore the full{' '}
          <Link href="/pricing" className="text-primary hover:underline">
            API plans
          </Link>.
        </p>
      </div>
    </GuestLayout>
  );
}
