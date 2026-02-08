import GuestLayout from '@/components/layouts/GuestLayout';

export default function PrivacyPage() {
  return (
    <GuestLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: September 22, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, such as when you create an account,
              make API requests, or contact us for support.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Account information (email, name)</li>
              <li>API usage data and logs</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>Communication data when you contact support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide and maintain our screenshot API service</li>
              <li>Process payments and manage subscriptions</li>
              <li>Monitor API usage and prevent abuse</li>
              <li>Provide customer support</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. All data is encrypted in
              transit and at rest.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information only as long as necessary to provide our services
              and comply with legal obligations. API logs are typically retained for 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at privacy@screenshotly.app
            </p>
          </section>
        </div>
      </div>
    </GuestLayout>
  );
} 