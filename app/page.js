import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ThemeShowcase } from '@/components/landing/ThemeShowcase';
import { Testimonials } from '@/components/landing/Testimonials';
import { ArrowRight, Shield, Truck, Heart } from 'lucide-react';

export const metadata = {
  title: 'Mestar - Personalized Children\'s Storybooks | Create Magical Stories',
  description: 'Create unique, personalized storybooks featuring your child as the hero. Choose from magical themes, upload photos, and create memories that last forever.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">📚 Mestar</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/create">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Create Story
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Theme Showcase */}
      <ThemeShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <Shield className="w-12 h-12 text-purple-600" />
              <h3 className="font-bold text-lg">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">Your data and photos are protected</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <Truck className="w-12 h-12 text-purple-600" />
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Printed and shipped within 3-5 days</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <Heart className="w-12 h-12 text-purple-600" />
              <h3 className="font-bold text-lg">100% Satisfaction</h3>
              <p className="text-gray-600 text-sm">Money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start creating your personalized storybook today and give your child a gift they'll treasure forever
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Create Your Story Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">📚 Mestar</h3>
              <p className="text-gray-400">Creating magical personalized storybooks for children</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/create" className="hover:text-white">Create Story</Link></li>
                <li><Link href="#" className="hover:text-white">How It Works</Link></li>
                <li><Link href="#" className="hover:text-white">Themes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mestar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}