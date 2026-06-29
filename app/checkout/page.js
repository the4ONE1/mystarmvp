'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

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
      // In production, this would create a Stripe checkout session
      // For now with placeholder keys, we'll simulate the flow
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const { url, sessionId } = await response.json();
        
        // With real Stripe keys, would redirect to checkout
        // window.location.href = url;
        
        // For demo, redirect to success page
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-lg text-gray-600 mb-4">No order data found</p>
            <Link href="/create">
              <Button>Create a Story</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">📚 Mestar</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-green-600" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      
                      <Separator />
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-blue-900">Stripe Integration Ready</p>
                            <p className="text-sm text-blue-700 mt-1">
                              To complete checkout, add your Stripe API keys to the .env file. 
                              The payment form will appear here once configured.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Shipping Address</Label>
                        <div className="space-y-3 mt-2">
                          <Input placeholder="Street Address" required />
                          <div className="grid grid-cols-2 gap-3">
                            <Input placeholder="City" required />
                            <Input placeholder="State" required />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Input placeholder="ZIP Code" required />
                            <Input placeholder="Country" defaultValue="United States" required />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order - $29.99'}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500">
                      🔒 Secure payment powered by Stripe. Your payment information is encrypted.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Personalized Storybook</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Child:</strong> {orderData.childName}</p>
                      <p><strong>Age:</strong> {orderData.age}</p>
                      <p><strong>Gender:</strong> {orderData.gender}</p>
                      <p><strong>Theme:</strong> {orderData.theme}</p>
                      {orderData.dedication && (
                        <p className="pt-2 border-t mt-2">
                          <strong>Dedication:</strong><br />
                          <span className="italic">"{orderData.dedication}"</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Storybook</span>
                      <span>$29.99</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-purple-600">$29.99</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>✓ 30-day money-back guarantee</p>
                    <p>✓ Ships within 3-5 business days</p>
                    <p>✓ Professional quality printing</p>
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