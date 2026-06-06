import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI 塔罗 - 免费在线抽牌 · AI专业解读',
  description: '免费在线塔罗牌抽牌，AI驱动的专业解读。多种牌阵可选，涵盖爱情、事业、运程、自我探索。用心倾听你内在的声音。',
  keywords: ['塔罗牌', '在线抽牌', 'AI解读', '免费塔罗', '塔罗牌阵', '爱情塔罗', '事业塔罗'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
