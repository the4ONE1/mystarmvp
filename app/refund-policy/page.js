import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy — MESTAR',
  description: '30-day satisfaction guarantee for MESTAR personalized storybooks. Learn about our refund policy.',
};

export default function RefundPolicyPage() {
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
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: July 2, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Commitment</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              At MESTAR, we are committed to your complete satisfaction with your personalized children's storybook. We understand that creating memories for your child is important, and we want you to love the final product.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              We offer a <strong>30-day satisfaction guarantee</strong> for all our digital storybooks.
            </p>
          </section>

          {/* 30-Day Guarantee */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. 30-Day Satisfaction Guarantee</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              If you are not satisfied with your personalized storybook, you may request a full refund within <strong>30 days</strong> of your purchase date.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              This applies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
              <li>Main personalized storybook ($19.99)</li>
              <li>All add-ons (Audiobook, Coloring Book, Additional Character)</li>
              <li>Complete order packages</li>
            </ul>
          </section>

          {/* Eligible Reasons */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Eligible Refund Reasons</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              You may request a refund for the following reasons:
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Quality Issues</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>The storybook does not match the quality shown in our samples</li>
              <li>Images are poorly integrated or distorted</li>
              <li>Text contains errors or inconsistencies</li>
              <li>The personalization is incorrect despite providing accurate information</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Technical Issues</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>The file cannot be downloaded or opened</li>
              <li>The PDF is corrupted or damaged</li>
              <li>You never received the download link despite multiple attempts</li>
              <li>The file format is incompatible as advertised</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">2.3 Service Issues</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Your storybook was not delivered within the stated timeframe (24-72 hours)</li>
              <li>You were charged incorrectly</li>
              <li>You ordered duplicate items by mistake</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">2.4 Dissatisfaction</h3>
            <p className="text-foreground/90 leading-relaxed">
              If you simply are not satisfied with the final storybook for any reason, we will honor your refund request within the 30-day window.
            </p>
          </section>

          {/* Non-Refundable */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Non-Refundable Situations</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              The following situations are <strong>not eligible</strong> for refunds:
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">3.1 After 30 Days</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Refund requests made more than 30 days after the original purchase date cannot be processed. The 30-day period begins on the date of purchase, not the delivery date.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">3.2 User Error</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Incorrect information provided during order (wrong name, age, theme)</li>
              <li>Low-quality photos uploaded that result in poor final output</li>
              <li>Changed your mind about personalization choices you selected</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mb-2">
              <strong>Exception:</strong> We will offer free re-generation if you made a mistake during ordering (e.g., typo in child's name).
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">3.3 Excessive Downloads</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              If the storybook has been downloaded multiple times across multiple devices, this indicates satisfaction and usage. Refunds may be declined in cases of clear excessive use.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">3.4 Violation of Terms</h3>
            <p className="text-foreground/90 leading-relaxed">
              If your account or order violated our Terms of Service, Privacy Policy, or Acceptable Use Policy, refunds will not be issued.
            </p>
          </section>

          {/* Alternative */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Re-Generation Option</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Instead of a refund</strong>, we offer a <strong>free re-generation</strong> of your storybook if:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>You want to change personalization details</li>
              <li>You want to use different photos</li>
              <li>You want to try a different theme</li>
              <li>There were technical issues with the first version</li>
              <li>The quality didn't meet your expectations, but you'd like to try again</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Benefit:</strong> This option allows you to get the perfect storybook without losing your purchase.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>No Additional Cost:</strong> Re-generation is completely free and does not affect your eligibility for a refund if you're still not satisfied.
            </p>
          </section>

          {/* How to Request */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. How to Request a Refund</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Step 1: Contact Support</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Email us at: <a href="mailto:support@mystarstories.app" className="text-primary hover:underline">support@mystarstories.app</a>
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Step 2: Provide Information</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Please include the following in your email:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li><strong>Order Number:</strong> Found in your confirmation email</li>
              <li><strong>Email Address:</strong> Used at checkout</li>
              <li><strong>Reason for Refund:</strong> Brief explanation of why you're requesting a refund</li>
              <li><strong>Preference:</strong> Refund or re-generation</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Step 3: Review Process</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Our support team will review your request within <strong>1-2 business days</strong> and respond with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Approval of your refund</li>
              <li>Offer to re-generate your storybook</li>
              <li>Additional questions or clarification (if needed)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Step 4: Refund Processing</h3>
            <p className="text-foreground/90 leading-relaxed">
              Once approved, refunds are processed back to your original payment method within <strong>5-10 business days</strong>. The exact timing depends on your bank or card issuer.
            </p>
          </section>

          {/* Refund Method */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Refund Method</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Original Payment Method:</strong> All refunds are issued to the original payment method used at checkout (credit/debit card via Stripe).
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Full Refund:</strong> You will receive a 100% refund of the purchase price, including any add-ons purchased.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>No Hidden Fees:</strong> There are no restocking fees, processing fees, or deductions from your refund.
            </p>
          </section>

          {/* Processing Time */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Refund Processing Timeline</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li><strong>Support Response:</strong> 1-2 business days</li>
              <li><strong>Refund Approval:</strong> Same day or next business day after review</li>
              <li><strong>Stripe Processing:</strong> 5-10 business days to appear in your account</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              <strong>Note:</strong> The refund timeline may vary based on your bank or card issuer's processing times. If you don't see the refund after 10 business days, please contact your bank.
            </p>
          </section>

          {/* Partial Refunds */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Partial Refunds</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              If you purchased add-ons (Audiobook, Coloring Book, Additional Character) and only wish to refund specific items:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>You may request a partial refund for add-ons only</li>
              <li>You may keep the main storybook and refund add-ons, or vice versa</li>
              <li>Partial refunds are subject to the same 30-day guarantee</li>
            </ul>
          </section>

          {/* Chargebacks */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Chargebacks and Disputes</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Please Contact Us First:</strong> Before filing a chargeback or dispute with your bank, please contact us at support@mystarstories.app. We are committed to resolving any issues quickly and fairly.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Chargeback Consequences:</strong> Filing a chargeback before contacting us may result in:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Account suspension</li>
              <li>Inability to process future refunds or re-generations</li>
              <li>Additional fees from Stripe (which we may pass on)</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed">
              We prefer to work directly with you to resolve any concerns.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Frequently Asked Questions</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Can I get a refund if I haven't downloaded the storybook?</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Yes, absolutely. If you never accessed or downloaded your storybook, you are fully eligible for a refund within 30 days.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">What if I downloaded it once but didn't like it?</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              That's fine! Our 30-day guarantee covers dissatisfaction. You can request a refund or re-generation.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Can I get a refund after 30 days?</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Generally no, but we review exceptions on a case-by-case basis. Contact support to explain your situation.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">What if the storybook has a mistake?</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We will offer a free re-generation with corrections. No refund necessary unless you prefer one.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">How long do refunds take?</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              5-10 business days after approval, depending on your bank's processing time.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. Questions About Our Refund Policy?</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We're here to help! Contact our support team:
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Email:</strong> <a href="mailto:support@mystarstories.app" className="text-primary hover:underline">support@mystarstories.app</a><br />
              <strong>Website:</strong> <a href="https://mystarstories.app/contact" className="text-primary hover:underline">mystarstories.app/contact</a><br />
              <strong>Response Time:</strong> Within 24 hours (usually faster!)
            </p>
          </section>

          {/* Thank You */}
          <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Thank You for Choosing MESTAR</h3>
            <p className="text-foreground/90 leading-relaxed">
              We appreciate your trust in us to create special memories for your child. Our goal is your complete satisfaction, and we stand behind our products with this 30-day guarantee. If you have any concerns, please don't hesitate to reach out!
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
