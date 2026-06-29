import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mestar - Personalized Children\'s Storybooks | Create Magical Stories',
  description: 'Create unique, personalized storybooks featuring your child as the hero. Choose from magical themes, upload photos, and create memories that last forever. Perfect gifts for birthdays and special occasions.',
  keywords: 'personalized storybooks, children\'s books, custom storybooks, personalized gifts, kids books, photo books for kids',
  authors: [{ name: 'Mestar' }],
  openGraph: {
    title: 'Mestar - Personalized Children\'s Storybooks',
    description: 'Create unique, personalized storybooks featuring your child as the hero.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Mestar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mestar - Personalized Children\'s Storybooks',
    description: 'Create unique, personalized storybooks featuring your child as the hero.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Mestar',
              description: 'Personalized children\'s storybooks',
              url: process.env.NEXT_PUBLIC_BASE_URL,
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}