import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { AchievementsSection } from '@/components/sections/achievements-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import { GithubActivityLoader } from '@/components/github-activity-loader';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <GithubActivityLoader />
      <ContactSection />
    </>
  );
}
