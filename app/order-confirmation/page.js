'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Loader2, XCircle, Sparkles, Download, Mail } from 'lucide-react';
import { getOrderStatus } from '@/lib/backendClient';

const PROGRESS_LABELS = {
  pending_payment: 'Waiting for payment to finish...',
  queued: 'Payment confirmed — queueing your story...',
  generating_story: 'Crafting your unique story...',
  generating_images: 'Creating beautiful illustrations...',
  assembling_pdf: 'Assembling your PDF storybook...',
  complete: 'Ready!',
};

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get('order_id');

  const [orderId, setOrderId] = useState(null);
  const [status, setStatus] = useState('pending_payment');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  // Resolve which order to poll: the return_url param is primary, the
  // sessionStorage record from /create fills in as a fallback.
  useEffect(() => {
    let storedOrderId = null;
    try {
      const stored = sessionStorage.getItem('storyOrder');
      if (stored) {
        storedOrderId = JSON.parse(stored).orderId || null;
      }
    } catch {
      // ignore
    }

    const resolvedOrderId = orderIdFromUrl || storedOrderId;
    if (!resolvedOrderId) {
      setError('No order found. If you just paid, check your email — your storybook will arrive there shortly.');
      return;
    }

    setOrderId(resolvedOrderId);
  }, [orderIdFromUrl]);

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    const startedAt = Date.now();

    const poll = async () => {
      if (cancelled) return;

      try {
        const data = await getOrderStatus(orderId);
        if (cancelled) return;

        if (data.status === 'not_found') {
          setError('We couldn\'t find this order in our system. If you were charged, please contact support with your payment confirmation.');
          return;
        }

        setStatus(data.status);
        setOrderData(data);

        if (data.status === 'complete' || data.status === 'failed') {
          return; // stop polling
        }
      } catch (e) {
        console.error('Error polling order status:', e);
      }

      if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
        setError('This is taking longer than expected. Check your email — your storybook will arrive there once it\'s ready.');
        return;
      }

      if (!cancelled) {
        setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();
    return () => { cancelled = true; };
  }, [orderId]);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <ConfirmationNav />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-2 border-destructive/20">
              <CardContent className="pt-12 pb-12 text-center">
                <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
                <h1 className="text-3xl font-display font-bold text-foreground mb-4">Order Not Found</h1>
                <p className="text-muted-foreground mb-8">{error}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/create">Try Again</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const isComplete = status === 'complete';

  return (
    <div className="min-h-screen bg-background">
      <ConfirmationNav />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className={isComplete ? 'bg-gradient-to-br from-primary/5 to-background border-2 border-primary/30' : 'bg-card border-2 border-primary/20'}>
            <CardContent className="pt-12 pb-12 text-center">
              {!isComplete ? (
                <>
                  <Loader2 className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
                  <h1 className="text-3xl font-display font-bold text-foreground mb-4">
                    {orderData?.status ? PROGRESS_LABELS[orderData.status] || 'Processing your order...' : 'Confirming Your Order...'}
                  </h1>
                  <p className="text-muted-foreground">
                    Please wait while we process your payment and prepare your personalized storybook.
                  </p>
                </>
              ) : (
                <>
                  <div className="relative mb-6">
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                    <Sparkles className="w-8 h-8 text-primary absolute top-0 right-1/4 animate-pulse" />
                  </div>

                  <h1 className="text-4xl font-display font-bold text-foreground mb-4">Order Confirmed! 🎉</h1>
                  <p className="text-xl text-foreground/80 mb-8">
                    Thank you for your purchase! {orderData?.story_title ? `"${orderData.story_title}" is ready.` : 'Your personalized storybook is ready.'}
                  </p>

                  {orderData?.pdf_url && (
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
                      <a
                        href={orderData.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                      >
                        <Download className="w-5 h-5" />
                        Download Your Storybook PDF
                      </a>
                    </div>
                  )}

                  {!orderData?.pdf_url && (
                    <div className="bg-muted/50 rounded-lg p-6 mb-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Check your email for your download link.
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/create">
                        <Sparkles className="mr-2 w-5 h-5" />
                        Create Another Story
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/">Back to Home</Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ConfirmationNav() {
  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-primary drop-shadow-[0_0_10px_hsl(43_75%_62%/0.5)]">
              MESTAR
            </span>
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-primary">Back to Home</Link>
        </div>
      </div>
    </nav>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
