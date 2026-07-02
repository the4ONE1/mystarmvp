import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-display font-bold mb-4 text-primary">MESTAR</h3>
            <p className="text-muted-foreground text-sm">
              Creating magical personalized storybooks for children
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Making every child the star of their own story.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/create" className="hover:text-primary transition-colors">Create Story</Link></li>
              <li><Link href="/#products" className="hover:text-primary transition-colors">Shop Stories</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-display font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-display font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="mailto:support@mystarstories.app" className="hover:text-primary transition-colors">support@mystarstories.app</a></li>
              <li className="pt-2 text-xs">Mon-Fri: 9am-5pm CT</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 MESTAR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
