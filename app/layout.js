import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SessionWrapper from './components/SessionWrapper';
import { Work_Sans, Fraunces } from 'next/font/google';
import { IBM_Plex_Mono } from 'next/font/google';

// Font declarations with proper configuration
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
      className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-paper text-ink antialiased">
        <SessionWrapper>
          <Header />

          <main className="flex-1 flex flex-col">
            {children}
          </main>

          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}