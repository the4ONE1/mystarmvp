'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Lock, Sparkles } from 'lucide-react';

export default function CheckoutPage() {
  const [orderData, setOrderData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load order data from sessionStorage
    const stored = sessionStorage.getItem('storyOrder');
    if (stored) {
      setOrderData(JSON.parse(stored));
    }
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const { url, sessionId } = await response.json();
        window.location.href = '/checkout/success';
      } else {
        alert('Checkout creation failed. Please ensure Stripe keys are configured.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-2 border-border">
          <CardContent className="p-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">No order data found</p>
            <Link href="/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display">
                <Sparkles className="mr-2 w-4 h-4" />
                Create a Story
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-sm font-display font-bold">
          ⭐ Personalized digital storybooks — $29.99 one-time payment — instant digital download
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-primary drop-shadow-[0_0_10px_hsl(43_75%_62%/0.5)]">MESTAR</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8 flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            Secure Checkout
          </h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center font-display">
                    <CreditCard className="w-5 h-5 mr-2 text-primary" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="font-display">Email Address</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required className="bg-background border-border" />
                      </div>
                      
                      <div>
                        <Label htmlFor="name" className="font-display">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required className="bg-background border-border" />
                      </div>
                      
                      <Separator className="bg-border" />
                      
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-display font-semibold text-primary">Stripe Integration Ready</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              To complete checkout, add your Stripe API keys to the .env file. 
                              The payment form will appear here once configured.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg py-6 shadow-xl shadow-primary/30 rounded-full"
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order - $29.99 ⭐'}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      🔒 Secure payment powered by Stripe. Your payment information is encrypted.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4 bg-card border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="font-display">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-display font-semibold mb-2">Personalized Storybook</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Child:</strong> {orderData.childName}</p>
                      <p><strong>Age:</strong> {orderData.age}</p>
                      <p><strong>Gender:</strong> {orderData.gender}</p>
                      <p><strong>Theme:</strong> {orderData.theme}</p>
                      {orderData.dedication && (
                        <p className="pt-2 border-t border-border mt-2">
                          <strong>Dedication:</strong><br />
                          <span className="italic">"{orderData.dedication}"</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="bg-border" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Storybook</span>
                      <span>$29.99</span>
                    </div>
                    <div className="flex justify-between text-primary">
                      <span>Instant Download</span>
                      <span>FREE</span>
                    </div>
                    <Separator className="bg-border" />
                    <div className="flex justify-between font-display font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">$29.99</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>✓ Instant digital download</p>
                    <p>✓ 32 full-color pages</p>
                    <p>✓ Print-ready PDF format</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}