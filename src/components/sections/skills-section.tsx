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

export function SkillsSection() {
  const { highlightedSkills, logInteraction } = usePortfolio();
  const { ref, inView } = useScrollAnimation(0.1);

  return (
    <SectionWrapper id="skills" className="bg-secondary/20">
      <motion.div
        ref={ref}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={fadeInUpVariants} className="text-center mb-16">
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
              <Card className="premium-card h-full border-2 border-primary/10 hover:border-primary/30 group">
                <CardHeader className="flex-row items-center gap-4 pb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="glass p-3 rounded-xl"
                  >
                    <category.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <motion.ul 
                    variants={staggerFastContainerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="space-y-2"
                  >
                    {category.skills.map((skill) => {
                      const isHighlighted = highlightedSkills.includes(skill.name);
                      return (
                        <motion.li
                          key={skill.name}
                          variants={fadeInUpVariants}
                          onMouseEnter={() => logInteraction('skill', skill.name)}
                          whileHover={{ x: 8, scale: 1.02 }}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-default",
                            isHighlighted 
                              ? "glass-heavy border border-primary/30 glow" 
                              : "glass hover:glass-heavy"
                          )}
                        >
                          <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <skill.icon className="w-4 h-4 text-primary" />
                          </motion.div>
                          <span className="font-medium text-sm">{skill.name}</span>
                          {isHighlighted && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-auto"
                            >
                              <Badge variant="default" className="text-xs">★</Badge>
                            </motion.div>
                          )}
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Backend Emphasis Section */}
        <motion.div
          variants={fadeInUpVariants}
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
              <motion.div
                key={item}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {item}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
