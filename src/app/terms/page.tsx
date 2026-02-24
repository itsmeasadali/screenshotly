import { Metadata } from 'next';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from '@/components/seo';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Screenshotly screenshot API service. Covers API usage guidelines, rate limits, payment terms, and service availability.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service",
    description: "Terms governing use of the Screenshotly screenshot API service. Covers API usage guidelines, rate limits, payment terms, and service availability.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service",
    description: "Terms governing use of the Screenshotly screenshot API service.",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Terms of Service", url: `${BASE_URL}/terms` },
  ];

  return (
    <GuestLayout>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: February 24, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Screenshotly&apos;s API services, you accept and agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use our services.
              These terms apply to all users of the service, including API consumers, account holders, and
              visitors to the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Screenshotly provides an AI-powered screenshot API service that allows users to capture
              website screenshots with automated element removal, device mockups, and multiple output
              formats (PNG, JPEG, WebP, PDF). The service is accessed via a RESTful API using
              API keys issued to authenticated accounts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Account Registration</h2>
            <p className="text-muted-foreground mb-4">
              You must create an account to use the API. You are responsible for maintaining the
              confidentiality of your account credentials and API keys. You agree to notify us
              immediately of any unauthorized use of your account. You must be at least 18 years old
              or have the legal capacity to enter into a binding agreement in your jurisdiction.
            </p>
            <p className="text-muted-foreground">
              Each account is for a single entity. You may not share API keys across unrelated
              organizations without separate accounts for each.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. API Usage Guidelines</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You must comply with all applicable laws and regulations</li>
              <li>Do not use the service to capture content without proper authorization</li>
              <li>Respect rate limits and usage quotas for your plan</li>
              <li>Do not attempt to reverse engineer, decompile, or disassemble the service</li>
              <li>Do not use the service for illegal, harmful, or abusive activities</li>
              <li>Do not resell, sublicense, or redistribute the API as a standalone service</li>
              <li>Do not use automated means to exceed your plan&apos;s rate limits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Rate Limits and Fair Use</h2>
            <p className="text-muted-foreground mb-4">
              Your use of the API is subject to rate limits based on your subscription plan:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Free Tier: 100 screenshots (lifetime)</li>
              <li>Basic Plan: 2,500 screenshots per month</li>
              <li>Growth Plan: 12,000 screenshots per month</li>
              <li>Scale Plan: 50,000 screenshots per month</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Exceeding your plan limits may result in throttled requests (HTTP 429). Persistent abuse
              of rate limits may lead to temporary or permanent suspension. We reserve the right to
              enforce fair-use policies to protect service quality for all users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              Paid plans are billed monthly or annually via Stripe. All prices are listed in USD.
              We offer a 14-day money-back guarantee on all paid plans — if you are not satisfied,
              contact support within 14 days of purchase for a full refund. Beyond this period, fees
              are non-refundable except as required by law.
            </p>
            <p className="text-muted-foreground mb-4">
              We reserve the right to change pricing with 30 days&apos; written notice. Existing subscribers
              will be notified via email before any price increase takes effect. You may cancel at any
              time; your plan remains active until the end of the current billing period.
            </p>
            <p className="text-muted-foreground">
              Failed payments will be retried up to 3 times. If payment cannot be collected after
              the retry period, your account may be downgraded to the Free tier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              You retain all rights to screenshots generated through the API using your content. We
              do not claim ownership of the output produced by the service on your behalf.
            </p>
            <p className="text-muted-foreground">
              The Screenshotly name, logo, API design, documentation, and website content are
              protected by intellectual property laws. You may not use our trademarks without prior
              written consent, except to factually reference the service (e.g., &quot;powered by
              Screenshotly&quot;).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Handling and Privacy</h2>
            <p className="text-muted-foreground mb-4">
              We process URLs and page content solely to render screenshots. Screenshot data is
              temporarily cached for delivery and automatically purged after 24 hours by default.
              Paid plans may configure longer retention via cache TTL settings. We do not sell,
              share, or use your screenshot data for purposes other than providing the service.
            </p>
            <p className="text-muted-foreground">
              For full details on how we collect, use, and protect your information, please refer
              to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Service Availability</h2>
            <p className="text-muted-foreground mb-4">
              We target 99.9% uptime but do not guarantee uninterrupted service. Planned maintenance
              windows will be communicated at least 48 hours in advance via email or our status page.
            </p>
            <p className="text-muted-foreground">
              We are not responsible for outages caused by factors outside our reasonable control,
              including internet connectivity issues, third-party infrastructure failures, or
              force majeure events.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless Screenshotly, its officers, and employees
              from any claims, damages, or expenses arising from your use of the service, your
              violation of these terms, or your infringement of any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
              whether express or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement. We do not
              warrant that screenshots will perfectly replicate the target page&apos;s appearance in
              all cases.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, our aggregate liability for any claims arising
              from or related to the service is limited to the amount you paid for the service in the
              12 months preceding the claim. We are not liable for indirect, incidental, special,
              consequential, or punitive damages of any kind.
            </p>
            <p className="text-muted-foreground">
              This limitation applies whether the claim is based on warranty, contract, tort,
              negligence, strict liability, or any other legal theory.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Termination</h2>
            <p className="text-muted-foreground mb-4">
              Either party may terminate this agreement at any time. You may cancel your account
              through the dashboard or by contacting support. We may suspend or terminate your
              access immediately for material violations of these terms, including abuse, fraud,
              or illegal activity.
            </p>
            <p className="text-muted-foreground">
              Upon termination, your API keys are revoked and any cached screenshot data is
              deleted. Provisions that by their nature should survive termination (including
              indemnification, limitation of liability, and intellectual property) will continue
              to apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Governing Law and Disputes</h2>
            <p className="text-muted-foreground mb-4">
              These terms are governed by the laws of the State of Delaware, United States, without
              regard to conflict-of-law provisions.
            </p>
            <p className="text-muted-foreground">
              Any dispute arising from these terms will first be resolved through good-faith
              negotiation. If unresolved within 30 days, disputes will be submitted to binding
              arbitration under the rules of the American Arbitration Association. Nothing in
              this section prevents either party from seeking injunctive relief in a court of
              competent jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">15. Changes to These Terms</h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Material changes will be communicated
              via email or a prominent notice on the website at least 30 days before they take
              effect. Your continued use of the service after changes become effective constitutes
              acceptance of the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">16. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these terms is found to be unenforceable or invalid, that
              provision will be limited or eliminated to the minimum extent necessary so that
              the remaining terms remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">17. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, contact us
              at <a href="mailto:legal@screenshotly.app" className="text-primary hover:underline">legal@screenshotly.app</a>.
            </p>
          </section>
        </div>
      </div>
    </GuestLayout>
  );
} 