'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Loader2, XCircle, Sparkles, Download, Mail } from 'lucide-react';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [orderStatus, setOrderStatus] = useState('checking'); // checking, paid, error
  const [orderData, setOrderData] = useState(null);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setOrderStatus('error');
      return;
    }

    // Poll for order status (webhook confirmation)
    const pollOrderStatus = async () => {
      try {
        const response = await fetch(`/api/order-status?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          if (data.status === 'paid') {
            setOrderStatus('paid');
            setOrderData(data.order);
            return true; // Stop polling
          } else if (data.status === 'pending') {
            // Keep polling
            return false;
          }
        }
      } catch (error) {
        console.error('Error polling order status:', error);
      }
      return false;
    };

    // Initial check
    pollOrderStatus().then(done => {
      if (done) return;

      // Poll every 2 seconds for up to 30 seconds
      const interval = setInterval(async () => {
        setPollCount(prev => prev + 1);
        
        const done = await pollOrderStatus();
        if (done) {
          clearInterval(interval);
        }

        // Stop polling after 15 attempts (30 seconds)
        if (pollCount >= 15) {
          clearInterval(interval);
          // Still show success after timeout (webhook might be delayed)
          setOrderStatus('paid');
        }
      }, 2000);

      return () => clearInterval(interval);
    });
  }, [sessionId, pollCount]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-card border-2 border-border">
          <CardContent className="p-12 text-center">
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Invalid Session</h1>
            <p className="text-muted-foreground mb-6">
              No order session found. Please try creating a new order.
            </p>
            <Link href="/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display rounded-full">
                Create New Story
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orderStatus === 'checking') {
    return (
      <div className="min-h-screen bg-background stars-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-2xl w-full bg-card border-2 border-primary/30">
            <CardContent className="p-12 text-center">
              <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
              <h1 className="text-3xl font-display font-bold mb-4">Processing Your Order...</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Please wait while we confirm your payment with our payment processor.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
                <span>This usually takes just a few seconds...</span>
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                Don't close this window. You'll be redirected automatically.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (orderStatus === 'paid') {
    return (
      <div className="min-h-screen bg-background stars-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-2xl w-full bg-card border-2 border-primary/30">
            <CardContent className="p-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4 animate-float-up">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-3xl font-display font-bold mb-2">Order Confirmed! ⭐</h1>
                <p className="text-lg text-muted-foreground">
                  Thank you for your order! Your personalized storybook is being created.
                </p>
              </div>
              
              {orderData && (
                <div className="bg-primary/10 rounded-lg p-6 mb-8 text-left border border-primary/30">
                  <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Your Story Details
                  </h2>
                  <div className="space-y-2 text-muted-foreground">
                    {orderData.metadata && (
                      <>
                        <p><strong>Child:</strong> {orderData.metadata.child_name}</p>
                        <p><strong>Theme:</strong> {orderData.metadata.theme}</p>
                        <p><strong>Order Email:</strong> {orderData.customer_email}</p>
                      </>
                    )}
                    <p><strong>Order Date:</strong> {new Date(orderData.created_at).toLocaleDateString()}</p>
                    {orderData.amount_total && (
                      <p><strong>Total Paid:</strong> ${(orderData.amount_total / 100).toFixed(2)}</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="bg-background/50 rounded-lg p-6 mb-8 text-left">
                <h2 className="font-display font-bold mb-3">What Happens Next?</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Check your email for order confirmation and receipt</span>
                  </li>
                  <li className="flex items-start">
                    <Download className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Your personalized PDF will be ready for download within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>You can create additional storybooks at any time!</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display px-8 rounded-full shadow-lg shadow-primary/30 w-full sm:w-auto">
                    Return to Home
                  </Button>
                </Link>
                <Link href="/create">
                  <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-display px-8 rounded-full w-full sm:w-auto">
                    <Sparkles className="mr-2 w-4 h-4" />
                    Create Another Story
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-muted-foreground mt-8">
                Questions? Contact us at support@mystarstories.shop
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
