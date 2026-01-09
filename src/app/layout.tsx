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
import { ServiceWorkerRegistration } from '@/components/service-worker-registration';

export const metadata: Metadata = {
  title: 'Anurag Singh | Backend & Full-Stack Engineer',
  description: 'Portfolio of Anurag Singh - Computer Engineering student specializing in Backend Development, Full-Stack Web Devlopment, and AI/ML solutions. 650+ competitive programming problems solved.',
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
        {/* Preload critical resources */}
        <link rel="preload" href="/favicon.ico" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          <ServiceWorkerRegistration />
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
