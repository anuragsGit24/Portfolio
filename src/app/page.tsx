import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/hero-section';

// Lazy load heavy sections for better performance
const AboutSection = dynamic(() => import('@/components/sections/about-section').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

const ProjectsSection = dynamic(() => import('@/components/sections/projects-section').then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

const SkillsSection = dynamic(() => import('@/components/sections/skills-section').then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

const AchievementsSection = dynamic(() => import('@/components/sections/achievements-section').then(mod => ({ default: mod.AchievementsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

const ExperienceSection = dynamic(() => import('@/components/sections/experience-section').then(mod => ({ default: mod.ExperienceSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials-section').then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

const ContactSection = dynamic(() => import('@/components/sections/contact-section').then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

const GithubActivitySection = dynamic(() => import('@/components/sections/github-activity-section').then(mod => ({ default: mod.GithubActivitySection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />
});

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <GithubActivitySection />
      <ContactSection />
    </main>
  );
}
