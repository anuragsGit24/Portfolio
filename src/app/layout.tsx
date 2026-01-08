import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CommandPalette } from '@/components/command-palette';
import { PortfolioProvider } from '@/context/portfolio-context';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { PageTransition } from '@/components/page-transition';
import { CustomCursor } from '@/components/custom-cursor';
import { AnimatedBackground } from '@/components/animated-background';

export const metadata: Metadata = {
  title: 'Anurag Singh | Backend & Full-Stack Engineer',
  description: 'Award-winning portfolio of Anurag Singh - Computer Engineering student specializing in Backend Development, Full-Stack Engineering, and AI/ML solutions. 650+ competitive programming problems solved.',
  keywords: ['Backend Engineer', 'Full-Stack Developer', 'Java', 'Spring Boot', 'React', 'AI/ML', 'Competitive Programming'],
  authors: [{ name: 'Anurag Singh' }],
  openGraph: {
    title: 'Anurag Singh | Backend & Full-Stack Engineer',
    description: 'Elite developer portfolio showcasing backend engineering excellence and full-stack capabilities',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="no-transitions">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          <SmoothScrollProvider>
            <PortfolioProvider>
              <CustomCursor />
              <AnimatedBackground />
              <div className="relative flex min-h-screen flex-col z-10">
                <SiteHeader />
                <PageTransition>
                  <main className="flex-1">{children}</main>
                </PageTransition>
                <SiteFooter />
              </div>
              <Toaster />
              <CommandPalette />
            </PortfolioProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
