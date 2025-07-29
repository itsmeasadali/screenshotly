import GuestLayout from '@/components/layouts/GuestLayout';

export default function GDPRPage() {
  return (
    <GuestLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">GDPR Compliance</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment to GDPR</h2>
            <p className="text-muted-foreground mb-4">
              Screenshotly is committed to protecting your personal data and respecting your privacy rights under the 
              General Data Protection Regulation (GDPR). This page outlines how we comply with GDPR requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Legal Basis for Processing</h2>
            <p className="text-muted-foreground mb-4">
              We process your personal data based on the following legal grounds:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Contract:</strong> To provide our screenshot API service and process payments</li>
              <li><strong>Legitimate Interests:</strong> To improve our service, prevent fraud, and ensure security</li>
              <li><strong>Consent:</strong> For marketing communications and optional analytics</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights Under GDPR</h2>
            <p className="text-muted-foreground mb-4">
              As a data subject, you have the following rights:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Right of Access</h3>
                <p className="text-muted-foreground text-sm">
                  You can request access to your personal data and information about how we process it.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Right to Rectification</h3>
                <p className="text-muted-foreground text-sm">
                  You can request correction of inaccurate or incomplete personal data.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Right to Erasure</h3>
                <p className="text-muted-foreground text-sm">
                  You can request deletion of your personal data under certain circumstances.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Right to Restrict Processing</h3>
                <p className="text-muted-foreground text-sm">
                  You can request limitation of processing in specific situations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Right to Data Portability</h3>
                <p className="text-muted-foreground text-sm">
                  You can request your data in a structured, machine-readable format.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Right to Object</h3>
                <p className="text-muted-foreground text-sm">
                  You can object to processing based on legitimate interests or for direct marketing.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Protection Measures</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure data storage with regular backups</li>
              <li>Access controls and authentication measures</li>
              <li>Regular security audits and assessments</li>
              <li>Data minimization - we only collect necessary data</li>
              <li>Purpose limitation - data used only for stated purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain personal data only as long as necessary:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Account Data:</strong> Retained while your account is active</li>
              <li><strong>API Logs:</strong> Automatically deleted after 30 days</li>
              <li><strong>Payment Data:</strong> Retained for 7 years for tax compliance</li>
              <li><strong>Marketing Data:</strong> Until you withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">International Transfers</h2>
            <p className="text-muted-foreground mb-4">
              Our services are hosted on secure infrastructure with appropriate safeguards:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>EU data is processed within the EU where possible</li>
              <li>Third-party processors are carefully vetted</li>
              <li>Standard Contractual Clauses used for transfers outside EU</li>
              <li>Regular monitoring of data protection compliance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Breach Procedures</h2>
            <p className="text-muted-foreground mb-4">
              In the unlikely event of a data breach:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>We will assess the breach within 24 hours</li>
              <li>Relevant authorities will be notified within 72 hours if required</li>
              <li>Affected individuals will be informed without undue delay</li>
              <li>Immediate steps will be taken to contain and remedy the breach</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Exercising Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              To exercise any of your GDPR rights, please contact us at:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-muted-foreground">
                <strong>Email:</strong> gdpr@screenshotly.app<br/>
                <strong>Subject:</strong> GDPR Request - [Your Request Type]<br/>
                <strong>Response Time:</strong> Within 30 days
              </p>
            </div>
            <p className="text-muted-foreground mt-4">
              We may need to verify your identity before processing your request to ensure data security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Our DPO</h2>
            <p className="text-muted-foreground">
              If you have any questions about our GDPR compliance or wish to file a complaint, 
              you can contact our Data Protection Officer at dpo@screenshotly.app or lodge a 
              complaint with your local supervisory authority.
            </p>
          </section>
        </div>
      </div>
    </GuestLayout>
  );
} 