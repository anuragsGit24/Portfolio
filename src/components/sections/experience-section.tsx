import { EXPERIENCE } from '@/lib/data';
import { SectionWrapper } from './section-wrapper';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-secondary/50">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16">Education Experience</h2>
      <div className="relative max-w-2xl mx-auto" role="list" aria-label="Work experience timeline">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
        {EXPERIENCE.map((job, index) => (
          <article key={job.company} className="relative mb-12" role="listitem">
            <div className="flex items-center">
              <div className="z-10 bg-background p-2 rounded-full border-2 border-primary absolute left-1/2 -translate-x-1/2">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div
              className={`mt-6 w-[calc(50%-2rem)] p-6 bg-card rounded-lg shadow-lg ${
                index % 2 === 0 ? 'mr-auto' : 'ml-auto'
              }`}
            >
              <p className="text-sm text-muted-foreground">{job.period}</p>
              {/* <h3 className="text-xl font-bold font-headline mt-1">{job.role}</h3> */}
              <p className="font-semibold text-primary">{job.company}</p>
              <p className="mt-3 text-muted-foreground">{job.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
