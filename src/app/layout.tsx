import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Yachtsea',
  description: 'Ye Olde Dice Game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
