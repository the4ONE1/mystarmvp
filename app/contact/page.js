'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Clock, HelpCircle } from 'lucide-react';

export default function ContactPage() {
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
              <Link href="/contact" className="text-sm font-medium text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-12">
            We're here to help! Have a question or need assistance? Reach out to our support team.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <Card className="bg-card border-2 border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-semibold">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-base font-semibold">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        className="text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help..."
                        rows={6}
                        className="text-base resize-none"
                        required
                      />
                    </div>

                    <div className="bg-muted/50 border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> This is a demo form. To actually contact us, please email{' '}
                        <a href="mailto:support@mystarstories.app" className="text-primary hover:underline">
                          support@mystarstories.app
                        </a>
                        {' '}directly.
                      </p>
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display"
                      onClick={() => window.location.href = 'mailto:support@mystarstories.app'}
                    >
                      <Mail className="mr-2 w-5 h-5" />
                      Send Email
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email */}
              <Card className="bg-card border border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Email Support</h3>
                      <p className="text-foreground/70 mb-3">
                        For all inquiries, questions, or support requests:
                      </p>
                      <a
                        href="mailto:support@mystarstories.app"
                        className="text-lg text-primary hover:underline font-medium"
                      >
                        support@mystarstories.app
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        We aim to respond within 24 hours (usually much faster!)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-card border border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Business Hours</h3>
                      <div className="space-y-1 text-foreground/70">
                        <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM CT</p>
                        <p><strong>Saturday - Sunday:</strong> Closed</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Emails received outside business hours will be answered on the next business day.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Quick Answers</h3>
                      <p className="text-foreground/70 mb-3">
                        Looking for quick answers? Check out our FAQ page for common questions about:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/70 mb-4">
                        <li>How the service works</li>
                        <li>Pricing and payment</li>
                        <li>Delivery times</li>
                        <li>Photo requirements</li>
                        <li>Refunds and returns</li>
                      </ul>
                      <Link href="/faq">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                          View FAQ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Common Inquiries */}
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Common Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>• Order status and tracking</li>
                    <li>• Technical issues with downloads</li>
                    <li>• Refund requests</li>
                    <li>• Re-generation requests</li>
                    <li>• Photo upload assistance</li>
                    <li>• Custom theme requests</li>
                    <li>• Bulk orders for schools/organizations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Before You Contact Us</h2>
            <div className="space-y-3 text-foreground/80">
              <p>
                <strong>For faster service, please include:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your order number (if applicable)</li>
                <li>Email address used at checkout</li>
                <li>Detailed description of your question or issue</li>
                <li>Screenshots (if reporting a technical problem)</li>
              </ul>
              <p className="mt-4">
                <strong>Privacy:</strong> We take your privacy seriously. All information shared with our support team is confidential and handled in accordance with our{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
