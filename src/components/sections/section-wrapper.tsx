"use client"

import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function SectionWrapper({ children, className, ...props }: SectionWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "container section-padding transition-opacity duration-1000",
        inView ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...props}
    >
      <div className={cn("mx-auto max-w-screen-xl", inView ? 'animate-[fade-in-up_1s_ease-in-out]' : '')}>
        {children}
      </div>
    </section>
  );
}
