import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, BookOpen, Shield, Download, FileText, CheckCircle2, Clock } from 'lucide-react';

export const metadata = {
  title: 'MESTAR — Personalized Storybooks Starring Your Child',
  description: 'Create a personalized children\'s storybook in minutes. Upload a photo, pick a theme, and download a print-ready PDF starring your child.',
};

const ProductCard = ({ title, description, price, image }) => {
  return (
    <Link href="/create" className="group block h-full">
      <div className="relative h-full flex flex-col bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
        {/* Top ribbon */}
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 shadow-md">
          <Sparkles className="h-3 w-3" /> Bestseller
        </div>
        <div className="absolute top-3 right-3 z-10 bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 shadow-md border border-border">
          Instant PDF
        </div>

        <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary/30 to-primary/5">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Rating row */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 text-primary fill-primary" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">Loved by 2,000+ families</span>
          </div>

          <h3 className="font-display text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>

          {/* Mini feature ticks */}
          <ul className="text-xs text-muted-foreground space-y-1 mb-4">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Your child as the hero</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Coloring pages included</li>
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-primary leading-none">
                ${price}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">one-time payment</span>
            </div>
            <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground font-display rounded-full px-4 py-2.5 text-sm font-bold shadow-lg shadow-primary/30 group-hover:bg-primary/90 group-hover:scale-105 transition-all">
              <Sparkles className="h-4 w-4" />
              Personalize
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function HomePage() {
  const products = [
    {
      title: 'Space Adventure',
      description: 'Explore galaxies and discover new planets in this cosmic adventure',
      price: '29.99',
      image: 'https://images.unsplash.com/photo-1620190133480-6a462f034658?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwyfHxtYWdpY2FsJTIwc3Rvcnlib29rfGVufDB8fHx8MTc4MjcwMDA2M3ww&ixlib=rb-4.1.0&q=85'
    },
    {
      title: 'Royal Princess',
      description: 'Rule a magical kingdom with grace and courage in this royal tale',
      price: '29.99',
      image: 'https://images.pexels.com/photos/6157218/pexels-photo-6157218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      title: 'Superhero Mission',
      description: 'Save the day with special powers and become the hero everyone needs',
      price: '29.99',
      image: 'https://images.pexels.com/photos/35610365/pexels-photo-35610365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-sm font-display font-bold">
          ⭐ Personalized digital storybooks — $29.99 one-time payment — instant digital download
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold text-primary drop-shadow-[0_0_10px_hsl(43_75%_62%/0.5)]">MESTAR</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/create">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display rounded-full shadow-lg shadow-primary/30">
                  Create Story
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden stars-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="relative z-10 container text-center pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">Personalized Bedtime Magic</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Your Child Is
            <br />
            <span className="text-primary drop-shadow-[0_0_20px_hsl(43_75%_62%/0.5)]">the ⭐</span>
          </h1>
          
          <p className="text-lg text-foreground/90 max-w-lg mx-auto mb-8 leading-relaxed drop-shadow-md">
            A one-of-a-kind digital storybook where your little one is the hero. Instantly download and start the magic tonight.
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg rounded-full px-10 py-7 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          >
            <Link href="/create">Start Your Magical Journey ⭐</Link>
          </Button>

          {/* Social proof */}
          <div className="mt-8 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-primary fill-primary" />
            ))}
            <span className="ml-2 text-sm text-foreground/80 font-medium">Loved by 2,000+ families</span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Shield, text: 'Secure Checkout' },
              { icon: Download, text: 'Instant Download' },
              { icon: FileText, text: 'Digital PDF' },
              { icon: CheckCircle2, text: 'Satisfaction Guaranteed' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-2 text-center py-3">
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', icon: Sparkles, title: 'Personalize It', desc: 'Upload a photo, choose a theme & add details' },
              { step: '2', icon: BookOpen, title: 'Place Your Order', desc: 'Complete checkout — optionally add a second character' },
              { step: '3', icon: Download, title: 'Download & Enjoy', desc: 'Get your personalized PDF storybook instantly' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-extrabold text-primary">{step}</span>
                </div>
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 bg-card/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-3">Shop Our Stories</h2>
            <p className="text-muted-foreground">Every story is a new adventure — pick your child's today ✨</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {products.map((product) => (
              <div key={product.title} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency / Final CTA */}
      <section className="py-16 stars-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="container relative z-10 text-center">
          <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold mb-3">Don't Miss Out!</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Download instantly after purchase. Give your child a gift they'll never forget.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg rounded-full px-10 py-7 shadow-xl shadow-primary/30 hover:scale-105 transition-all"
          >
            <Link href="/create">Create Your Story Now ⭐</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold mb-4 text-primary">MESTAR</h3>
              <p className="text-muted-foreground text-sm">Creating magical personalized storybooks for children</p>
            </div>
            <div>
              <h4 className="font-display font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/create" className="hover:text-primary transition-colors">Create Story</Link></li>
                <li><Link href="/#products" className="hover:text-primary transition-colors">Shop Stories</Link></li>
                <li><Link href="/#" className="hover:text-primary transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 MESTAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
