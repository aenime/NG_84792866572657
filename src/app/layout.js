import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { NGOSettingsProvider } from '@/lib/ngo-settings-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-family' });

export const metadata = {
  title: {
    default: 'Animal Welfare NGO',
    template: '%s | Animal Welfare NGO',
  },
  description: 'Supporting animals in need through rescue, healthcare, and awareness programs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <NGOSettingsProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </NGOSettingsProvider>
      </body>
    </html>
  );
}
