'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Lock, Sparkles, Plus } from 'lucide-react';
import { StripeEmbeddedCheckout } from '@/components/StripeEmbeddedCheckout';
import { PRICE_LOOKUP_KEYS } from '@/lib/backendClient';

// "additional-character" isn't offered yet — mystarmvp's personalization form
// doesn't collect a supporting-character name/photo, and mestar's pipeline
// needs both to fulfill that add-on.
const ADDONS = [
  {
    id: 'audiobook',
    name: 'Audiobook Add-on',
    description: 'Professional narration of your personalized story',
    price: 999,
    priceDisplay: '$9.99',
    lookupKey: PRICE_LOOKUP_KEYS.audiobook,
  },
  {
    id: 'coloring-book',
    name: 'Coloring Book Add-on',
    description: 'Printable coloring pages featuring your story',
    price: 399,
    priceDisplay: '$3.99',
    lookupKey: PRICE_LOOKUP_KEYS.coloringBook,
  },
];

export default function CheckoutPage() {
  const [orderData, setOrderData] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [showEmbeddedCheckout, setShowEmbeddedCheckout] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('storyOrder');
    if (stored) {
      setOrderData(JSON.parse(stored));
    }
  }, []);

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    let total = 1999; // Main story $19.99
    selectedAddons.forEach(addonId => {
      const addon = ADDONS.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const priceIds = [
    PRICE_LOOKUP_KEYS.mainStory,
    ...selectedAddons.map(id => ADDONS.find(a => a.id === id)?.lookupKey).filter(Boolean),
  ];

  const returnUrl = orderData
    ? `${window.location.origin}/order-confirmation?order_id=${orderData.orderId}&session_id={CHECKOUT_SESSION_ID}`
    : '';

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
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-sm font-display font-bold">
          ⭐ Personalized digital storybooks — Secure checkout powered by Stripe
        </p>
      </div>

      <nav className="bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-primary drop-shadow-[0_0_10px_hsl(43_75%_62%/0.5)]">MESTAR</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8 flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            Secure Checkout
          </h1>

          {showEmbeddedCheckout ? (
            <StripeEmbeddedCheckout
              priceIds={priceIds}
              orderId={orderData.orderId}
              customerEmail={customerEmail}
              returnUrl={returnUrl}
            />
          ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="bg-card border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center font-display">
                    <CreditCard className="w-5 h-5 mr-2 text-primary" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="font-display">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="name" className="font-display">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card className="bg-card border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center font-display">
                    <Plus className="w-5 h-5 mr-2 text-primary" />
                    Optional Add-ons
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ADDONS.map(addon => (
                    <div
                      key={addon.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedAddons.includes(addon.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <Checkbox
                        checked={selectedAddons.includes(addon.id)}
                        onCheckedChange={() => toggleAddon(addon.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display font-bold">{addon.name}</h3>
                          <span className="font-bold text-primary">{addon.priceDisplay}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{addon.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button
                onClick={() => setShowEmbeddedCheckout(true)}
                disabled={!customerEmail || !customerName}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg py-6 shadow-xl shadow-primary/30 rounded-full"
                data-track-event="checkout-submit"
              >
                {`Place Order - ${formatPrice(calculateTotal())}`}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                🔒 Secure payment powered by Stripe. Your payment information is encrypted.
              </p>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4 bg-card border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="font-display">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-display font-semibold mb-2">Your Story</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Child:</strong> {orderData.childName}</p>
                      <p><strong>Age:</strong> {orderData.age}</p>
                      <p><strong>Theme:</strong> {orderData.theme}</p>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Personalized Storybook</span>
                      <span>$19.99</span>
                    </div>

                    {selectedAddons.map(addonId => {
                      const addon = ADDONS.find(a => a.id === addonId);
                      return addon ? (
                        <div key={addonId} className="flex justify-between text-sm">
                          <span className="text-primary">+ {addon.name}</span>
                          <span className="text-primary">{addon.priceDisplay}</span>
                        </div>
                      ) : null;
                    })}

                    <Separator className="bg-border" />

                    <div className="flex justify-between font-display font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>✓ Instant digital download</p>
                    <p>✓ 32 full-color pages</p>
                    <p>✓ Print-ready PDF format</p>
                    {selectedAddons.length > 0 && (
                      <p className="text-primary font-semibold">✓ {selectedAddons.length} add-on{selectedAddons.length > 1 ? 's' : ''} included</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
