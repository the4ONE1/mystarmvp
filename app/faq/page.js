import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions | MESTAR',
  description: 'Find answers to common questions about our personalized children\'s storybooks, ordering, shipping, and customization options.',
};

const faqs = [
  {
    question: 'How does the personalization work?',
    answer: 'Simply enter your child\'s name, age, gender, and choose a story theme. You can also upload photos to make the story even more personal. Our system creates a unique storybook where your child is the main character.',
  },
  {
    question: 'What format is the storybook delivered in?',
    answer: 'You\'ll receive a high-quality, print-ready PDF file (32 full-color pages) via email immediately after purchase. You can read it on any device or print it at home or a local print shop.',
  },
  {
    question: 'How quickly will I receive my storybook?',
    answer: 'Instantly! Once your order is complete, you\'ll receive a download link via email within minutes. You can start reading or printing right away.',
  },
  {
    question: 'Can I order a printed version?',
    answer: 'Currently, we provide the PDF file which you can print yourself or take to a local print shop. We recommend printing on high-quality paper for the best results.',
  },
  {
    question: 'What age range are the stories suitable for?',
    answer: 'Our stories are designed for children ages 1-12. Each story theme is crafted to be engaging and age-appropriate, with vocabulary and themes that resonate with different age groups.',
  },
  {
    question: 'Can I include multiple children in one story?',
    answer: 'Currently, each storybook is personalized for one child. However, you can purchase multiple books for siblings and create a special collection!',
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Absolutely! We use Stripe for payment processing, which is one of the most secure payment platforms available. We never store your credit card information on our servers.',
  },
  {
    question: 'What if I make a mistake in the personalization?',
    answer: 'Please double-check all information before completing your order. If you notice an error after purchase, contact us immediately at support@mystarstories.com and we\'ll do our best to help.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Due to the personalized nature of our products, all sales are final. However, if there\'s a technical issue with your download or quality problem, please contact us and we\'ll make it right.',
  },
  {
    question: 'Can I use the storybook for commercial purposes?',
    answer: 'The storybook is for personal use only. You may print multiple copies for your family, but commercial reproduction or resale is not permitted.',
  },
  {
    question: 'What story themes are available?',
    answer: 'We offer six magical themes: Space Adventure, Royal Princess, Superhero Mission, Fairy Tale Magic, Animal Friends, and Medieval Quest. Each theme is carefully crafted with engaging storylines and beautiful illustrations.',
  },
  {
    question: 'How do the photos get incorporated into the story?',
    answer: 'Photos you upload can be featured as the main character illustration in your storybook. We use secure, encrypted storage for all photos, and they\'re only used for your personalized book.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-sm font-display font-bold">
          ⭐ Personalized digital storybooks — $19.99 one-time payment — instant digital download
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
              <Link href="/">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
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

      {/* Hero Section */}
      <section className="py-16 bg-card/30">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-extrabold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our personalized storybooks
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border-2 border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="font-display font-semibold text-left hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still Have Questions CTA */}
          <div className="mt-16 text-center bg-primary/10 border border-primary/30 rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              We're here to help! Reach out to our friendly support team.
            </p>
            <Button 
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display rounded-full shadow-lg"
            >
              <a href="mailto:support@mystarstories.com">
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 stars-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-3xl font-bold mb-6">Ready to Create Your Story?</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Start creating a magical personalized storybook for your child today!
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
    </div>
  );
}