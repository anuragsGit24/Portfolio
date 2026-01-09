'use client';

import { useState, useEffect, useRef, memo } from 'react';
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
  staggerContainerVariants
} from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/use-animation';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

interface ProjectModalProps {
  project: any;
  image: any;
  onClose: () => void;
}

const ProjectModal = memo(function ProjectModal({ project, image, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      
      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="sticky top-4 left-full ml-4 z-10 bg-background border border-border p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close project details"
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {image && (
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
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

              <h3 id="modal-title" className="text-3xl font-bold mb-4">{project.title}</h3>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

              {project.metrics && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-muted/50 p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                      </div>
                    <p className="text-2xl font-bold text-primary">{String(value)}</p>
                    </div>
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
                    <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                      {tech}
                    </Badge>
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
});

const ProjectCard = memo(function ProjectCard({ project, image, isHighlighted, onCardClick, prefersReducedMotion }: any) {
  return (
    <motion.div
      variants={prefersReducedMotion ? {} : fadeInUpVariants}
      className="group cursor-pointer h-full"
      onClick={onCardClick}
    >
      <Card 
        className={cn(
          "overflow-hidden h-full flex flex-col border hover:border-primary/50 transition-colors",
          isHighlighted && "border-primary"
        )}
      >
        <CardHeader className="relative">
          <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
            {image && (
              <Image
                src={image.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                loading="lazy"
              />
            )}
            {isHighlighted && (
              <div className="absolute top-2 right-2">
                <Badge variant="default">★ Featured</Badge>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <CardTitle className="text-xl font-bold">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
          
          {project.metrics && (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                <div key={key} className="bg-muted/50 p-2 rounded border border-border">
                  <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  <p className="text-sm font-semibold text-primary">{String(value)}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
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
          
          <div className="w-full flex items-center justify-between text-primary group-hover:text-primary/80 transition-colors">
            <span className="text-sm font-semibold">View Details</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

export function ProjectsSection() {
  const { highlightedProjects, logInteraction } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { ref, inView } = useScrollAnimation(0.1);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <SectionWrapper id="projects" className="animated-gradient-bg">
      <motion.div
        ref={ref}
        variants={prefersReducedMotion ? {} : staggerContainerVariants}
        initial={prefersReducedMotion ? {} : "hidden"}
        animate={prefersReducedMotion ? {} : (inView ? 'visible' : 'hidden')}
      >
        <motion.div variants={prefersReducedMotion ? {} : fadeInUpVariants} className="text-center mb-16">
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
                prefersReducedMotion={prefersReducedMotion}
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
