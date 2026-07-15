import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: {
    default: 'UniBangla — Compare Every Private University in Bangladesh',
    template: '%s | UniBangla',
  },
  description:
    'Compare tuition, programs, rankings, IEB accreditation, scholarships, campus facilities and more for every private university in Bangladesh. Make an informed admission decision.',
  keywords: [
    'Bangladesh private university',
    'university comparison Bangladesh',
    'HSC admission',
    'UGC approved university',
    'IEB accreditation',
    'university tuition calculator',
  ],
  openGraph: {
    title: 'UniBangla — Compare Every Private University in Bangladesh',
    description:
      'Tuition, programs, rankings, scholarships, IEB accreditation and more — all in one trusted place.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
