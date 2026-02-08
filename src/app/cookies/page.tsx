import GuestLayout from '@/components/layouts/GuestLayout';

export default function CookiePage() {
  return (
    <GuestLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Performance Cookies:</strong> Improve website performance and user experience</li>
              <li><strong>Preference Cookies:</strong> Remember your settings like theme preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Strictly Necessary Cookies</h3>
                <p className="text-muted-foreground mb-2">
                  These cookies are essential for the website to function and cannot be disabled:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Authentication tokens</li>
                  <li>Security measures</li>
                  <li>API session management</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground mb-2">
                  Help us understand website usage patterns:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Google Analytics (anonymized)</li>
                  <li>Page view tracking</li>
                  <li>API usage statistics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Functional Cookies</h3>
                <p className="text-muted-foreground mb-2">
                  Remember your preferences and settings:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Theme preferences (light/dark mode)</li>
                  <li>Language settings</li>
                  <li>Dashboard customizations</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use services from trusted third parties that may set their own cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>Clerk:</strong> For user authentication and management</li>
              <li><strong>Vercel:</strong> For website hosting and performance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control cookies through your browser settings:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Block all cookies (may affect website functionality)</li>
              <li>Delete existing cookies</li>
              <li>Set preferences for specific websites</li>
              <li>Get notifications when cookies are set</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Note: Disabling essential cookies may prevent you from using certain features of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our cookie policy, please contact us at privacy@screenshotly.app
            </p>
          </section>
        </div>
      </div>
    </GuestLayout>
  );
} 