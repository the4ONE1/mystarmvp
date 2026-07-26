import { Baloo_2, Nunito } from 'next/font/google';
import './globals.css';
import { MetaPixel } from '@/components/MetaPixel';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { GoogleTagManager } from '@/components/GoogleTagManager';
import { SpeedInsights } from '@vercel/speed-insights/next';

const baloo2 = Baloo_2({ 
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'MESTAR — Personalized Storybooks Starring Your Child',
  description: 'Create a personalized children\'s storybook in minutes. Upload a photo, pick a theme, and download a print-ready PDF starring your child.',
  keywords: 'personalized storybooks, children\'s books, custom storybooks, personalized gifts, kids books, photo books for kids',
  authors: [{ name: 'MESTAR' }],
  openGraph: {
    title: 'MESTAR — Personalized Storybooks Starring Your Child',
    description: 'Create a personalized children\'s storybook in minutes.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MESTAR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MESTAR — Personalized Storybooks Starring Your Child',
    description: 'Create a personalized children\'s storybook in minutes.',
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
    <html lang="en" className={`${baloo2.variable} ${nunito.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MESTAR',
              description: 'Personalized children\'s storybooks',
              url: process.env.NEXT_PUBLIC_BASE_URL,
            }),
          }}
        />
      </head>
      <body className="font-body">
        <GoogleTagManager />
        <MetaPixel />
        <GoogleAnalytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}