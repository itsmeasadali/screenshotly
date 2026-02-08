import GuestLayout from '@/components/layouts/GuestLayout';

export default function TermsPage() {
  return (
    <GuestLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: September 22, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Screenshotly&apos;s API services, you accept and agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Screenshotly provides an AI-powered screenshot API service that allows users to capture
              website screenshots with automated element removal and device mockups.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">API Usage Guidelines</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You must comply with all applicable laws and regulations</li>
              <li>Do not use the service to capture content without proper authorization</li>
              <li>Respect rate limits and usage quotas for your plan</li>
              <li>Do not attempt to reverse engineer or abuse the service</li>
              <li>Do not use the service for illegal or harmful activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Rate Limits and Fair Use</h2>
            <p className="text-muted-foreground mb-4">
              Your use of the API is subject to rate limits based on your subscription plan:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Free Tier: 100 screenshots (lifetime)</li>
              <li>Basic Plan: 2,500 screenshots per month</li>
              <li>Growth Plan: 12,000 screenshots per month</li>
              <li>Scale Plan: 50,000 screenshots per month</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Payment Terms</h2>
            <p className="text-muted-foreground">
              Paid plans are billed monthly or annually. All fees are non-refundable except as
              required by law. We reserve the right to change pricing with 30 days notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Service Availability</h2>
            <p className="text-muted-foreground">
              We strive to maintain 99.9% uptime but do not guarantee uninterrupted service.
              We may perform maintenance that temporarily affects service availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
            <p className="text-muted-foreground">
              We may suspend or terminate your access to the service for violations of these terms
              or for any other reason with reasonable notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Our liability is limited to the amount you paid for the service in the past 12 months.
              We are not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, contact us at legal@screenshotly.app
            </p>
          </section>
        </div>
      </div>
    </GuestLayout>
  );
} 