import { Metadata } from 'next';
import Link from 'next/link';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from '@/components/seo';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: "Privacy Policy – Data Handling & Your Rights",
  description: "How Screenshotly collects, uses, and protects your data. Read our full privacy policy covering account information, API usage data, and your rights.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy – Data Handling & Your Rights",
    description: "How Screenshotly collects, uses, and protects your data. Read our full privacy policy covering account information, API usage data, and your rights.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy – Data Handling & Your Rights",
    description: "How Screenshotly collects, uses, and protects your data.",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Privacy Policy", url: `${BASE_URL}/privacy` },
  ];

  return (
    <GuestLayout>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: February 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us and data generated through your use of our screenshot API service. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Account data:</strong> Email address and name, collected via Clerk authentication when you sign up or sign in.</li>
              <li><strong>Payment data:</strong> Processed by Stripe. We do not store card numbers; Stripe handles all payment details securely.</li>
              <li><strong>API usage data:</strong> URLs submitted for screenshots, request metadata, timestamps, and usage patterns.</li>
              <li><strong>Screenshot data:</strong> Captured images generated from your requests. Retention is configurable via cache TTL settings.</li>
              <li><strong>Analytics data:</strong> Page views, device information, and usage patterns collected via Google Analytics.</li>
              <li><strong>Communication data:</strong> Messages and support tickets when you contact us.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Process screenshot requests and deliver captured images to you</li>
              <li>Process billing, manage subscriptions, and prevent fraud</li>
              <li>Improve our service quality, performance, and reliability</li>
              <li>Monitor API usage to detect abuse, rate limiting, and security threats</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Analyze usage patterns to develop new features and optimize the product</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Sub-Processors</h2>
            <p className="text-muted-foreground mb-4">
              We use the following sub-processors to operate our service. Each has committed to appropriate data protection standards:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Clerk:</strong> Authentication and user management</li>
              <li><strong>Stripe:</strong> Payment processing and subscription billing</li>
              <li><strong>Google Analytics:</strong> Usage analytics and site performance metrics</li>
              <li><strong>Cloud hosting provider:</strong> Infrastructure, compute, and storage for the API and application</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie Policy</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar technologies for essential functionality, analytics, and preferences. Essential cookies support authentication and security; analytics cookies (e.g., Google Analytics) help us understand site usage; preference cookies remember settings such as theme. For full details, see our{' '}
              <Link href="/cookies" className="text-foreground underline underline-offset-4 hover:opacity-80">
                Cookie Policy
              </Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your data as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Screenshots:</strong> Automatically purged after 24 hours by default. Paid plans may configure longer retention via cache TTL settings. All cached screenshots are deleted when your plan is cancelled.</li>
              <li><strong>Account data:</strong> Retained while your account is active. Deleted upon request or when you cancel your account.</li>
              <li><strong>Logs:</strong> API and security logs are retained for 90 days.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>GDPR (EU/EEA/UK):</strong> Access, rectification, erasure, data portability, objection, and restriction of processing. See our{' '}
                <Link href="/gdpr" className="text-foreground underline underline-offset-4 hover:opacity-80">
                  GDPR page
                </Link> for details.</li>
              <li><strong>CCPA/CPRA (California):</strong> Right to know what data we collect, right to delete, and right to opt out of sale of personal information (we do not sell personal information).</li>
              <li>Access and update your personal information in account settings</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, contact us at privacy@screenshotly.app or through our support channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information. This includes encryption in transit (TLS/HTTPS) for all data transmission, encryption at rest for stored data, access controls and authentication to limit data access to authorized personnel, and regular security assessments. We do not store payment card numbers; payment data is processed exclusively by Stripe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">International Transfers</h2>
            <p className="text-muted-foreground">
              Your data may be processed in the United States and other countries where our sub-processors operate. We ensure appropriate safeguards (such as Standard Contractual Clauses) when transferring data outside the EEA. By using our service, you consent to such transfers where permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              Our service is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email (to the address associated with your account), by posting a notice on our website, or through the dashboard. We encourage you to review this policy periodically. Your continued use of the service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at privacy@screenshotly.app.
            </p>
          </section>
        </div>
      </div>
    </GuestLayout>
  );
}
