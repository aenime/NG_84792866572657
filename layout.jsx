import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-family'
});

export const metadata = {
  title: {
    default: 'Animal Welfare NGO',
    template: '%s | Animal Welfare NGO'
  },
  description: 'Supporting animals in need through rescue, healthcare, and awareness programs.',
  keywords: ['animal welfare', 'ngo', 'animal rescue', 'animal adoption', 'donate for animals']
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
