'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionWrapper } from './section-wrapper';
import { usePortfolio } from '@/context/portfolio-context';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  fadeInUpVariants, 
  staggerContainerVariants,
  staggerFastContainerVariants 
} from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/use-animation';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export function SkillsSection() {
  const { highlightedSkills, logInteraction } = usePortfolio();
  const { ref, inView } = useScrollAnimation(0.1);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <SectionWrapper id="skills" className="bg-secondary/30">
      <motion.div
        ref={ref}
        variants={prefersReducedMotion ? {} : staggerContainerVariants}
        initial={prefersReducedMotion ? {} : "hidden"}
        animate={prefersReducedMotion ? {} : (inView ? 'visible' : 'hidden')}
      >
        <motion.div variants={prefersReducedMotion ? {} : fadeInUpVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Technical Excellence</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Skills</span> & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Backend-first engineer with full-stack capabilities and a passion for solving complex problems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((category, idx) => (
            <motion.div
              key={category.name}
              variants={fadeInUpVariants}
              custom={idx}
            >
              <Card className="h-full border border-border hover:border-primary/50 transition-colors">
                <CardHeader className="flex-row items-center gap-4 pb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => {
                      const isHighlighted = highlightedSkills.includes(skill.name);
                      return (
                        <li
                          key={skill.name}
                          onMouseEnter={() => logInteraction('skill', skill.name)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-default",
                            isHighlighted 
                              ? "bg-primary/10 border border-primary/30" 
                              : "bg-background/50 hover:bg-background"
                          )}
                        >
                          <skill.icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">{skill.name}</span>
                          {isHighlighted && (
                            <div className="ml-auto">
                              <Badge variant="default" className="text-xs">★</Badge>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Backend Emphasis Section */}
        <motion.div
          variants={prefersReducedMotion ? {} : fadeInUpVariants}
          className="mt-16 text-center glass-heavy p-8 rounded-3xl border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">
            <span className="gradient-text">Backend-First</span> Mindset
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Specialized in building scalable, high-performance backend systems with Java & Spring Boot.
            Strong foundation in system design, database optimization, and microservices architecture.
            Combined with modern full-stack capabilities for end-to-end development.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['System Design', 'REST APIs', 'Microservices', 'Database Optimization', 'Performance Tuning', 'Cloud Architecture'].map((item) => (
              <Badge key={item} variant="outline" className="px-4 py-2 text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
