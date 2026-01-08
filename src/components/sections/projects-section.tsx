'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, ExternalLink, X, TrendingUp, Zap } from 'lucide-react';
import { SectionWrapper } from './section-wrapper';
import { usePortfolio } from '@/context/portfolio-context';
import { cn } from '@/lib/utils';
import { 
  fadeInUpVariants, 
  staggerContainerVariants,
  cardHoverVariants,
  modalBackdropVariants,
  modalContentVariants 
} from '@/lib/animations';
import { useScrollAnimation, useCardTilt } from '@/hooks/use-animation';

interface ProjectModalProps {
  project: any;
  image: any;
  onClose: () => void;
}

function ProjectModal({ project, image, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        variants={modalBackdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalContentVariants}
          className="glass-heavy rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 glass-heavy p-2 rounded-full hover:bg-primary/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {image && (
              <div className="relative h-96 w-full rounded-t-3xl overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
            )}

            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} variant="default" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="text-4xl font-bold mb-4 gradient-text">{project.title}</h3>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

              {project.metrics && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className="glass p-4 rounded-xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                      </div>
                      <p className="text-2xl font-bold gradient-text">{value}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <motion.div
                      key={tech}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button size="lg" className="flex-1" asChild>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, image, isHighlighted, onCardClick }: any) {
  const { tilt, ref } = useCardTilt(8);

  return (
    <motion.div
      ref={ref as any}
      variants={fadeInUpVariants}
      whileHover="hover"
      className="group cursor-pointer"
      onClick={onCardClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      <Card 
        className={cn(
          "overflow-hidden h-full flex flex-col premium-card border-2 relative",
          isHighlighted && "border-primary/50 glow"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative">
          <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
            {image && (
              <Image
                src={image.imageUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isHighlighted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-2 right-2"
              >
                <Badge variant="default" className="glow">★ Featured</Badge>
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <CardTitle className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow relative">
          <p className="text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
          
          {project.metrics && (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                <div key={key} className="glass p-2 rounded-lg">
                  <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  <p className="text-sm font-bold text-primary">{value}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 relative">
          <div className="flex flex-wrap gap-2 w-full">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
          
          <motion.div 
            className="w-full flex items-center justify-between text-primary group-hover:text-primary/80"
            whileHover={{ x: 5 }}
          >
            <span className="text-sm font-semibold">View Details</span>
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { highlightedProjects, logInteraction } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { ref, inView } = useScrollAnimation(0.1);

  return (
    <SectionWrapper id="projects" className="animated-gradient-bg">
      <motion.div
        ref={ref}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={fadeInUpVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Featured Work</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Projects</span> That Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building scalable systems, crafting elegant solutions, and pushing technical boundaries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => {
            const image = PlaceHolderImages.find(p => p.id === project.imagePlaceholder);
            const isHighlighted = highlightedProjects.includes(project.title);

            return (
              <ProjectCard
                key={project.id}
                project={project}
                image={image}
                isHighlighted={isHighlighted}
                onCardClick={() => {
                  logInteraction('project', project.title);
                  setSelectedProject(project);
                }}
              />
            );
          })}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            image={PlaceHolderImages.find(p => p.id === selectedProject.imagePlaceholder)}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </motion.div>
    </SectionWrapper>
  );
}
