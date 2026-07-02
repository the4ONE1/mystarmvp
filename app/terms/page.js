import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — MESTAR',
  description: 'Terms of Service for MESTAR personalized children\'s storybooks. Read our terms and conditions.',
};

export default function TermsPage() {
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
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: July 2, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Welcome to MESTAR (also known as "My Star Stories"). These Terms of Service ("Terms") govern your access to and use of our website mystarstories.app and our personalized children's storybook services.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              By accessing or using our service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our service.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Company Information:</strong><br />
              MESTAR / My Star Stories<br />
              Website: mystarstories.app<br />
              Email: support@mystarstories.app<br />
              Jurisdiction: United States
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Service Description</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              MESTAR provides personalized digital storybook creation services where customers can:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Upload photos of their child</li>
              <li>Select story themes and personalization options</li>
              <li>Receive a custom-generated digital storybook featuring their child as the main character</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Our service is a <strong>digital product only</strong>. We do not offer physical books or shipping. All storybooks are delivered electronically via email download link.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Age Requirement:</strong> You must be 18 years or older to use our service. Our service is intended for purchase by adults (parents/guardians) on behalf of children.
            </p>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Pricing and Payment</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Product Pricing</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li><strong>Main Personalized Storybook:</strong> $19.99 (one-time payment)</li>
              <li><strong>Optional Add-ons:</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Audiobook Narration: $9.99</li>
                  <li>Coloring Book Pages: $3.99</li>
                  <li>Additional Character: $9.99</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Payment Processing</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              All payments are processed securely through Stripe. We accept major credit and debit cards. Payment is required in full at the time of order.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">3.3 Pricing Changes</h3>
            <p className="text-foreground/90 leading-relaxed">
              We reserve the right to modify pricing at any time. Price changes will not affect orders already placed. All prices are in USD.
            </p>
          </section>

          {/* Digital Product Delivery */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Digital Product Delivery</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Delivery Method:</strong> Your personalized storybook will be delivered via email download link to the email address provided at checkout.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Delivery Timeframe:</strong> Most storybooks are generated and delivered within 24-48 hours after payment confirmation. Complex customizations may take up to 72 hours.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Download Access:</strong> Download links remain active for 30 days. After 30 days, you may request a new download link by contacting support@mystarstories.app.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>File Format:</strong> Storybooks are delivered as PDF files compatible with most devices and e-readers.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. User Content and Photos</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">5.1 Your Responsibilities</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">When you upload photos, you represent and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>You own the photos or have permission to use them</li>
              <li>The photos do not infringe on any third-party rights</li>
              <li>You are the parent or legal guardian of the child in the photos</li>
              <li>The photos do not contain inappropriate, offensive, or illegal content</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">5.2 License Grant</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              By uploading photos, you grant MESTAR a limited, non-exclusive, worldwide license to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Process and modify your photos for storybook creation</li>
              <li>Store your photos on secure servers (AWS S3) for the duration necessary to fulfill your order</li>
              <li>Use your photos solely for the purpose of creating your personalized storybook</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">5.3 Photo Storage and Deletion</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Your photos are stored securely and automatically deleted 90 days after order completion. You may request immediate deletion at any time by emailing support@mystarstories.app.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">5.4 Prohibited Content</h3>
            <p className="text-foreground/90 leading-relaxed">
              We reserve the right to refuse service or delete content that violates our policies, including photos that are inappropriate, offensive, violent, or violate any laws.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">6.1 Your Storybook</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>You own the personalized storybook created for you.</strong> Once delivered, you may:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Download, print, and share your storybook for personal, non-commercial use</li>
              <li>Share with family and friends</li>
              <li>Print physical copies for personal use</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>You may NOT:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Resell, redistribute, or commercially exploit the storybook</li>
              <li>Remove or modify any copyright or trademark notices</li>
              <li>Claim the underlying story template or generation technology as your own</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">6.2 Our Platform and Technology</h3>
            <p className="text-foreground/90 leading-relaxed">
              MESTAR retains all rights to our website, story generation technology, templates, designs, branding, and underlying intellectual property. The license to use your personalized storybook does not grant you any rights to our platform or technology.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Acceptable Use Policy</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Use our service for any illegal or unauthorized purpose</li>
              <li>Violate any laws or regulations</li>
              <li>Upload viruses, malware, or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our service</li>
              <li>Reverse engineer or copy our technology</li>
              <li>Impersonate another person or entity</li>
              <li>Harass, abuse, or harm others</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Disclaimers and Warranties</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We strive to provide high-quality personalized storybooks, but we do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Our service will be uninterrupted or error-free</li>
              <li>All defects will be corrected</li>
              <li>Our service is free from viruses or harmful components</li>
              <li>The results will meet your specific expectations</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Quality Commitment:</strong> We are committed to delivering quality products. If you are unsatisfied with the quality of your storybook, please see our Refund Policy or contact support for re-generation.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Limitation of Liability</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, MESTAR SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Costs of replacement goods or services</li>
              <li>Damages arising from your use or inability to use our service</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed">
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SPECIFIC STORYBOOK ORDER GIVING RISE TO THE CLAIM (NOT TO EXCEED $100).
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Indemnification</h2>
            <p className="text-foreground/90 leading-relaxed">
              You agree to indemnify, defend, and hold harmless MESTAR and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
              <li>Your use of our service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights, including intellectual property rights</li>
              <li>Content you upload or submit</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">11.1 Informal Resolution</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Before filing a claim, please contact us at support@mystarstories.app to attempt to resolve the dispute informally. We are committed to working with you to find a fair resolution.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">11.2 Governing Law</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">11.3 Arbitration</h3>
            <p className="text-foreground/90 leading-relaxed">
              Any dispute arising from these Terms or your use of our service shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules, rather than in court, except that you may assert claims in small claims court if they qualify.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">12. Termination</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We may terminate or suspend your access to our service immediately, without prior notice, if you violate these Terms or engage in conduct that we deem harmful to our service or other users.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Upon termination, your right to use our service will cease immediately. Provisions that should survive termination (including intellectual property, disclaimers, limitation of liability, and dispute resolution) will remain in effect.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">13. Changes to Terms</h2>
            <p className="text-foreground/90 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by email or prominent notice on our website. Your continued use after changes indicates acceptance of the updated Terms. We recommend reviewing these Terms periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">14. Contact Information</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              For questions about these Terms:
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Email:</strong> support@mystarstories.app<br />
              <strong>Website:</strong> <a href="https://mystarstories.app/contact" className="text-primary hover:underline">mystarstories.app/contact</a>
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">15. Miscellaneous</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and MESTAR regarding our service.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>No Waiver:</strong> Our failure to enforce any provision does not constitute a waiver of that provision.
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
