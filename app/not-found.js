import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-display font-extrabold text-primary mb-4 animate-twinkle">404</h1>
          <h2 className="text-3xl font-display font-bold mb-4">Story Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! Looks like this page wandered off to a magical adventure. Let's get you back on track.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display rounded-full shadow-lg w-full sm:w-auto">
              <Home className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/create">
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-display rounded-full w-full sm:w-auto">
              <Sparkles className="mr-2 w-4 h-4" />
              Create Story
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/#products" className="hover:text-primary transition-colors">Browse Stories</Link>
            <span>•</span>
            <Link href="/#" className="hover:text-primary transition-colors">How It Works</Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}