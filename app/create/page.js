'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoUpload } from '@/components/PhotoUpload';
import { PersonalizationForm } from '@/components/PersonalizationForm';
import { createPendingOrder } from '@/lib/backendClient';
import { ArrowLeft, Camera, Edit3, ShoppingCart, Sparkles } from 'lucide-react';

export default function CreateStoryPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [personalizationData, setPersonalizationData] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Load saved progress on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mestar_draft');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSavedData(parsed);
        } catch (e) {
          console.error('Error loading saved data:', e);
        }
      }
    }
  }, []);

  const handlePhotosChange = (newPhotos) => {
    setPhotos(newPhotos);
    // Auto-save to localStorage
    saveDraft({ photos: newPhotos });
  };

  const saveDraft = (data) => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('mestar_draft');
      const current = existing ? JSON.parse(existing) : {};
      localStorage.setItem('mestar_draft', JSON.stringify({
        ...current,
        ...data,
        lastSaved: new Date().toISOString(),
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
      saveDraft({ step: 2 });
    }
  };

  const handlePersonalizationSubmit = async (formData) => {
    setPersonalizationData(formData);
    setSubmitError('');
    setIsSubmitting(true);

    try {
      // Creates the order and uploads the photo (if any) server-side,
      // before we ever touch Stripe checkout.
      const { orderId } = await createPendingOrder({
        childName: formData.childName,
        age: formData.age,
        theme: formData.theme,
        photoDataUrl: photos[0]?.dataUrl,
      });

      sessionStorage.setItem('storyOrder', JSON.stringify({
        ...formData,
        orderId,
        photos: photos.map(p => p.preview),
        timestamp: new Date().toISOString(),
      }));

      // Clear draft on successful submission
      localStorage.removeItem('mestar_draft');

      router.push('/checkout');
    } catch (error) {
      console.error('createPendingOrder failed:', error);
      setSubmitError(error.message || 'Could not start your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-sm font-display font-bold">
          ⭐ Personalized digital storybooks — $19.99 one-time payment — instant digital download
        </p>
      </div>

      <nav className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-primary drop-shadow-[0_0_10px_hsl(43_75%_62%/0.5)]">MESTAR</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= 1 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted text-muted-foreground'
              }`}>
                <Camera className="w-5 h-5" />
              </div>
              <div className={`w-24 h-1 mx-2 ${
                step >= 2 ? 'bg-primary' : 'bg-muted'
              }`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= 2 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted text-muted-foreground'
              }`}>
                <Edit3 className="w-5 h-5" />
              </div>
              <div className="w-24 h-1 mx-2 bg-muted" />
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-muted text-muted-foreground">
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-center w-32">
              <p className={`text-sm font-display font-semibold ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>Upload Photos</p>
            </div>
            <div className="text-center w-32">
              <p className={`text-sm font-display font-semibold ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>Personalize</p>
            </div>
            <div className="text-center w-32">
              <p className="text-sm font-display font-semibold text-muted-foreground">Checkout</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <Card className="bg-card border-2 border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Upload Your Child's Photos
                </CardTitle>
                <p className="text-muted-foreground">Add photos to personalize your storybook (optional but recommended)</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <PhotoUpload onPhotosChange={handlePhotosChange} />
                
                <div className="flex justify-between pt-6 border-t border-border">
                  <Link href="/">
                    <Button variant="outline" className="border-border hover:bg-muted">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    onClick={handleNextStep}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-display shadow-lg shadow-primary/30"
                  >
                    Continue
                    <Sparkles className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-card border-2 border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Personalize Your Story
                </CardTitle>
                <p className="text-muted-foreground">Tell us about your child to create a magical personalized storybook</p>
              </CardHeader>
              <CardContent>
                <PersonalizationForm onSubmit={handlePersonalizationSubmit} isSubmitting={isSubmitting} />
                {submitError && (
                  <p className="text-sm text-red-500 mt-4">{submitError}</p>
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                    className="border-border hover:bg-muted"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <Card className="bg-card/50 border-2 border-primary/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-display font-bold text-lg">Personalized Storybook</h3>
                  <p className="text-sm text-muted-foreground">Digital PDF, 32 full-color pages</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-display font-extrabold text-primary">$19.99</p>
                  <p className="text-sm text-muted-foreground">+ Instant Download</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
