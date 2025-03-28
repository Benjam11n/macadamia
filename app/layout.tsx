import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { LiveAPIProvider } from '@/contexts/LiveAPIContext';
import { Toaster } from 'sonner';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const montserrat = localFont({
  src: './fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat-regular',
});

export const metadata: Metadata = {
  title: 'Macadamia',
  description: 'Crack your next interview with confidence',
};

const API_KEY = process.env.GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('set GEMINI_API_KEY in .env.local');
}

const host = 'generativelanguage.googleapis.com';
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${montserrat.variable}
          font-sans
          antialiased
          `}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LiveAPIProvider url={uri} apiKey={API_KEY}>
              <div className="flex min-h-screen flex-col">
                <main className="w-full flex-1 bg-background/85">
                  {children}
                  <Toaster />
                </main>
              </div>
            </LiveAPIProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
