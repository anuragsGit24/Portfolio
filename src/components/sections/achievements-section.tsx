'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Code, Users, Award, Target, Zap } from 'lucide-react';
import { SectionWrapper } from './section-wrapper';
import { 
  fadeInUpVariants, 
  staggerContainerVariants 
} from '@/lib/animations';
import { useScrollAnimation, useAnimatedCounter } from '@/hooks/use-animation';

const achievements = [
  {
    icon: Code,
    title: '650+ Problems Solved',
    description: 'Competitive Programming across LeetCode, Codeforces, and CodeChef',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Trophy,
    title: 'Hackathon Winner',
    description: 'Multiple wins in national and university-level hackathons',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Technical Excellence',
    description: 'Awards for innovation in backend architecture and system design',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Team Leadership',
    description: 'Led technical teams in multiple collaborative projects',
    color: 'from-orange-500 to-red-500',
  },
];

const stats = [
  { label: 'Problems Solved', value: 650, suffix: '+', icon: Target },
  { label: 'Hackathons', value: 12, suffix: '+', icon: Trophy },
  { label: 'Projects Built', value: 25, suffix: '+', icon: Code },
  { label: 'Team Members Led', value: 30, suffix: '+', icon: Users },
];

const platforms = [
  { name: 'LeetCode', problems: 350, rank: 'Knight' },
  { name: 'CodeChef', problems: 200, rank: '4★' },
  { name: 'Codeforces', problems: 100, rank: 'Specialist' },
];

export function AchievementsSection() {
  const { ref, inView } = useScrollAnimation(0.1);

  return (
    <SectionWrapper id="achievements" className="animated-gradient-bg">
      <motion.div
        ref={ref}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={fadeInUpVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Competitive Edge</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Achievements</span> & Recognition
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proven track record in competitive programming, hackathons, and technical leadership
          </p>
        </motion.div>

        {/* Stats Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const { count, ref: counterRef } = useAnimatedCounter(stat.value, 2000);
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                ref={counterRef as any}
                variants={fadeInUpVariants}
                custom={idx}
              >
                <Card className="premium-card text-center border-2 border-primary/10 hover:border-primary/30 group">
                  <CardContent className="pt-6">
                    <motion.div
                      className="inline-flex p-4 rounded-2xl glass mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                      {count}{stat.suffix}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Competitive Programming Platforms */}
        <motion.div variants={fadeInUpVariants} className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Competitive Programming <span className="gradient-text">Profile</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform, idx) => (
              <motion.div
                key={platform.name}
                variants={fadeInUpVariants}
                custom={idx}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="premium-card border-2 border-primary/10 hover:border-primary/30">
                  <CardContent className="pt-6 text-center">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold">{platform.name}</h4>
                      <Badge variant="default" className="glow">{platform.rank}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Problems Solved</span>
                        <span className="font-bold text-primary text-xl">{platform.problems}+</span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: '85%' } : { width: 0 }}
                          transition={{ duration: 1.5, delay: idx * 0.2 }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Cards */}
        <motion.div variants={fadeInUpVariants}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Key <span className="gradient-text">Milestones</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  variants={fadeInUpVariants}
                  custom={idx}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="premium-card h-full border-2 border-primary/10 hover:border-primary/30 group overflow-hidden">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${achievement.color} transition-opacity duration-300`} />
                    <CardContent className="pt-6 relative">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} text-white flex-shrink-0`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                            {achievement.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUpVariants}
          className="mt-16 text-center glass-heavy p-8 rounded-3xl border border-primary/20"
        >
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Driven by <span className="gradient-text">Excellence</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Constantly pushing boundaries through competitive programming, building impactful projects,
            and contributing to the developer community. Always learning, always growing.
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
