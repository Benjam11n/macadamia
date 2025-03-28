import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { LiveAPIProvider } from '@/contexts/LiveAPIContext';
import { Toaster } from 'sonner';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const plusJakartaSans = localFont({
  src: './fonts/PlusJakartaSans-VariableFont_wght.ttf',
  variable: '--font-jakarta-sans',
});

export const metadata: Metadata = {
  title: 'Macadamia',
  description: 'Crack your next interview with confidence',
  icons: {
    icon: '/logo1.png',
  },
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
        <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
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
