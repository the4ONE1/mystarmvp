import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, BookOpen, Camera, Edit3, Download } from 'lucide-react';

export const metadata = {
  title: 'About Us — MESTAR',
  description: 'Learn about MESTAR - where every child becomes the star of their own personalized storybook adventure.',
};

export default function AboutPage() {
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
              <Link href="/about" className="text-sm font-medium text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-foreground mb-6">
            Every Child Deserves to Be the <span className="text-primary">Star</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            At MESTAR, we believe every child is special and deserves to see themselves as the hero of their own story. We create personalized storybooks that make children the stars of magical adventures.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              To create unforgettable moments of joy and wonder by bringing children into the stories they love, fostering imagination, confidence, and a lifelong love of reading.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Made with Love</h3>
              <p className="text-foreground/70">
                Every storybook is crafted with care and attention to detail, ensuring your child feels special.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Quality Stories</h3>
              <p className="text-foreground/70">
                Engaging narratives designed to captivate young readers and spark imagination.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Magical Memories</h3>
              <p className="text-foreground/70">
                Creating keepsakes that families will treasure and children will remember forever.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-b from-background to-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-center text-foreground mb-12">
              How It Works
            </h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-card border border-border rounded-lg p-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl">
                  1
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Upload Photos</h3>
                  <p className="text-foreground/70">
                    Start by uploading your child's photos. We'll integrate them seamlessly into the story, making your child the star.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-card border border-border rounded-lg p-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl">
                  2
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Edit3 className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Personalize Your Story</h3>
                  <p className="text-foreground/70">
                    Choose from enchanting themes like Space Adventure, Royal Princess, Superhero Mission, and more. Add your child's name, age, and a special dedication.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-card border border-border rounded-lg p-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl">
                  3
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Download className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Receive Your Storybook</h3>
                  <p className="text-foreground/70">
                    Within 24-48 hours, receive your beautiful personalized storybook as a high-quality PDF. Print it, share it, or read it on any device!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center text-foreground mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/80 leading-relaxed mb-6">
              MESTAR was born from a simple belief: every child should see themselves as capable of extraordinary things. When children see themselves as heroes, princesses, astronauts, or adventurers in their own stories, it builds confidence, sparks imagination, and creates lasting memories.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-6">
              As parents, we know how magical it is to watch a child's face light up when they recognize themselves in a story. That moment of joy and wonder is what drives us every day.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-6">
              We've helped thousands of families create special moments and treasured keepsakes. Each storybook is more than just pages—it's a celebration of childhood, a confidence booster, and a memory that lasts a lifetime.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-center text-foreground mb-12">
              Why Families Choose MESTAR
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Quick & Easy</h3>
                  <p className="text-foreground/70">Simple 3-step process. Create your storybook in minutes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">High-Quality Output</h3>
                  <p className="text-foreground/70">Professional-grade illustrations and seamless photo integration.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Affordable Pricing</h3>
                  <p className="text-foreground/70">Just $19.99 for a one-of-a-kind personalized storybook.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">30-Day Guarantee</h3>
                  <p className="text-foreground/70">Love it or get your money back. No questions asked.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Instant Delivery</h3>
                  <p className="text-foreground/70">Digital download means no shipping costs or wait times.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Secure & Private</h3>
                  <p className="text-foreground/70">Your photos are protected and automatically deleted after 90 days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-background to-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-display font-bold text-foreground mb-6">
              Ready to Make Your Child the Star?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Create a magical personalized storybook that your child will treasure forever. It only takes a few minutes to get started!
            </p>
            <Link href="/create">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 font-display">
                <Sparkles className="mr-2 w-5 h-5" />
                Create Your Story Now
              </Button>
            </Link>
            <p className="text-sm text-foreground/60 mt-4">
              30-day satisfaction guarantee • Just $19.99 • Instant digital delivery
            </p>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto border-t border-border pt-8">
          <Link href="/" className="text-primary hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
