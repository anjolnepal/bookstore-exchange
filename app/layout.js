import { Fraunces, Work_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

// Same three fonts the prototype loaded from Google Fonts, now self-hosted
// via next/font (faster, no external request, no layout shift).
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['500', '600'],
});

export const metadata = {
  title: 'BookSwap',
  description: 'Online Book Store and Exchange book',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      {/*
        Header and Footer live here instead of in page.js now — every route
        under app/ (browse, exchange, cart, account, ...) gets the same
        nav/footer automatically without re-importing them on each page.
        This satisfies FR-22 (consistent site-wide navigation) by
        construction rather than by convention.
      */}
      <body className="min-h-full flex flex-col font-sans bg-paper text-ink">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
