import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — MESTAR',
  description: 'Privacy Policy for MESTAR personalized children\'s storybooks. Learn how we protect your data and your child\'s information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-primary drop-shadow-[0_0_10px_hsl(43_75%_62%/0.5)]">
                MESTAR
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/faq" className="text-sm font-medium hover:text-primary">
                FAQ
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: July 2, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Welcome to MESTAR (also known as "My Star Stories"). We are committed to protecting your privacy and the privacy of your children. This Privacy Policy explains how we collect, use, store, and protect information when you use our website at mystarstories.app and our personalized children's storybook services.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Company Information:</strong><br />
              MESTAR / My Star Stories<br />
              Website: mystarstories.app<br />
              Email: support@mystarstories.app
            </p>
            <p className="text-foreground/90 leading-relaxed">
              This policy complies with the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and the Children's Online Privacy Protection Act (COPPA).
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Personal Information</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              When you create a personalized storybook, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li><strong>Your Information:</strong> Name, email address</li>
              <li><strong>Child's Information:</strong> First name, age (optional), gender (optional)</li>
              <li><strong>Story Details:</strong> Theme selection, dedication message (optional)</li>
              <li><strong>Photos:</strong> Images you upload for personalization</li>
              <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store payment card details)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Usage data (pages visited, time spent, interactions)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">2.3 Children's Privacy (COPPA Compliance)</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Our service is designed for purchase by adults (parents/guardians) on behalf of children. We do not knowingly collect personal information directly from children under 13 without verifiable parental consent. Parents provide their child's first name and optional details solely for story personalization purposes.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Parental Rights:</strong> Parents have the right to review, delete, or refuse further collection of their child's information by contacting support@mystarstories.app.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Create and deliver your personalized storybook</li>
              <li>Process payments and send order confirmations</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send important updates about your order</li>
              <li>Improve our service and user experience</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              <strong>We will NOT:</strong> Sell your information to third parties, send marketing emails without consent, or use your child's information for advertising purposes.
            </p>
          </section>

          {/* Photo Storage and Usage */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Photo Storage and Usage</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Storage:</strong> Photos you upload are securely stored on Amazon Web Services (AWS) S3 infrastructure in the United States. AWS employs industry-standard security measures including encryption at rest and in transit.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Usage:</strong> Your photos are used exclusively to generate your personalized storybook. We do not use uploaded photos for any other purpose, including marketing, AI training, or sharing with third parties.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Retention:</strong> Photos are retained for 90 days after your order is completed to allow for potential redelivery or corrections. After 90 days, photos are automatically deleted from our servers.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Deletion Request:</strong> You may request immediate deletion of your photos at any time by emailing support@mystarstories.app. We will delete all associated photos within 48 hours.
            </p>
          </section>

          {/* Payment Processing */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Payment Processing</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              All payment transactions are processed through Stripe, a PCI-DSS compliant payment processor. We do not store or have access to your full payment card information. Stripe collects and processes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Payment card information</li>
              <li>Billing address</li>
              <li>Transaction details</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              For Stripe's privacy practices, please visit: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://stripe.com/privacy</a>
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality (e.g., session management, checkout process)</li>
              <li><strong>Analytics Cookies:</strong> Google Analytics to understand site usage (anonymized data)</li>
              <li><strong>Marketing Cookies:</strong> Meta Pixel for advertising measurement (optional, requires consent)</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed">
              You can control cookies through your browser settings. Note that disabling essential cookies may affect site functionality.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Third-Party Services</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">We work with trusted third-party providers:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li><strong>AWS S3:</strong> Photo and file storage</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>Google Analytics:</strong> Website analytics</li>
              <li><strong>Meta (Facebook):</strong> Advertising analytics (optional)</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              These providers have their own privacy policies and are bound by data protection agreements.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Data Security</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Encrypted storage for photos and personal data</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure backup systems</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to protect your data.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Your Rights</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Depending on your location, you have the following rights:
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">GDPR Rights (EU Residents)</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate information</li>
              <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Restriction:</strong> Limit processing of your data</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">CCPA Rights (California Residents)</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li><strong>Know:</strong> Request details about data collected, used, disclosed</li>
              <li><strong>Delete:</strong> Request deletion of personal information</li>
              <li><strong>Opt-Out:</strong> Opt-out of sale of personal information (we do not sell data)</li>
              <li><strong>Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
            </ul>

            <p className="text-foreground/90 leading-relaxed">
              To exercise your rights, contact us at: support@mystarstories.app. We will respond within 30 days.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li><strong>Account Information:</strong> Retained while you have an active account</li>
              <li><strong>Order History:</strong> Retained for 7 years for tax and legal purposes</li>
              <li><strong>Photos:</strong> Deleted 90 days after order completion (or upon request)</li>
              <li><strong>Support Communications:</strong> Retained for 2 years</li>
              <li><strong>Analytics Data:</strong> Anonymized and retained for business analysis</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. International Data Transfers</h2>
            <p className="text-foreground/90 leading-relaxed">
              Your information may be transferred to and processed in the United States or other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers, including Standard Contractual Clauses approved by the European Commission.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">12. Changes to This Policy</h2>
            <p className="text-foreground/90 leading-relaxed">
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes by email or prominent notice on our website. Your continued use after changes indicates acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">13. Contact Us</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              For privacy-related questions, concerns, or to exercise your rights:
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Email:</strong> support@mystarstories.app<br />
              <strong>Website:</strong> <a href="https://mystarstories.app/contact" className="text-primary hover:underline">mystarstories.app/contact</a>
            </p>
            <p className="text-foreground/90 leading-relaxed mt-4">
              We aim to respond to all inquiries within 48 hours during business days.
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
