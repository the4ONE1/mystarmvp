'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoUpload } from '@/components/PhotoUpload';
import { PersonalizationForm } from '@/components/PersonalizationForm';
import { ArrowLeft, Camera, Edit3, ShoppingCart } from 'lucide-react';

export default function CreateStoryPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [personalizationData, setPersonalizationData] = useState(null);

  const handlePhotosChange = (newPhotos) => {
    setPhotos(newPhotos);
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handlePersonalizationSubmit = async (formData) => {
    setPersonalizationData(formData);
    
    // Store in sessionStorage for checkout
    sessionStorage.setItem('storyOrder', JSON.stringify({
      ...formData,
      photos: photos.map(p => p.preview),
      timestamp: new Date().toISOString(),
    }));
    
    // Redirect to checkout
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">📚 Mestar</span>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <Camera className="w-5 h-5" />
              </div>
              <div className={`w-24 h-1 mx-2 ${
                step >= 2 ? 'bg-purple-600' : 'bg-gray-200'
              }`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <Edit3 className="w-5 h-5" />
              </div>
              <div className={`w-24 h-1 mx-2 bg-gray-200`} />
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600">
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-center w-32">
              <p className="text-sm font-semibold text-purple-600">Upload Photos</p>
            </div>
            <div className="text-center w-32">
              <p className={`text-sm font-semibold ${
                step >= 2 ? 'text-purple-600' : 'text-gray-400'
              }`}>Personalize</p>
            </div>
            <div className="text-center w-32">
              <p className="text-sm font-semibold text-gray-400">Checkout</p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Upload Your Child's Photos</CardTitle>
                <p className="text-gray-600">Add photos to personalize your storybook (optional but recommended)</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <PhotoUpload onPhotosChange={handlePhotosChange} />
                
                <div className="flex justify-between pt-6 border-t">
                  <Link href="/">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    onClick={handleNextStep}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Personalize Your Story</CardTitle>
                <p className="text-gray-600">Tell us about your child to create a magical personalized storybook</p>
              </CardHeader>
              <CardContent>
                <PersonalizationForm onSubmit={handlePersonalizationSubmit} />
                
                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Personalized Storybook</h3>
                  <p className="text-sm text-gray-600">32 full-color pages, hardcover</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-purple-600">$29.99</p>
                  <p className="text-sm text-gray-600">+ Free Shipping</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}