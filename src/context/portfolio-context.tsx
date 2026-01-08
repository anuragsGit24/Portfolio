"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { PersonalizePortfolioPresentationOutput } from '@/ai/flows/personalized-portfolio-presentation';
import { personalizePortfolioAction } from '@/app/actions';
import { PROJECTS, SKILLS } from '@/lib/data';

type InteractionData = {
  viewedProjects: Set<string>;
  viewedSkills: Set<string>;
  timeOnPage: number;
};

type PortfolioContextType = {
  highlightedProjects: string[];
  highlightedSkills: string[];
  suggestedLayoutChanges: string | null;
  logInteraction: (type: 'project' | 'skill', id: string) => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([]);
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [suggestedLayoutChanges, setSuggestedLayoutChanges] = useState<string | null>(null);
  const [interactions, setInteractions] = useState<InteractionData>({
    viewedProjects: new Set(),
    viewedSkills: new Set(),
    timeOnPage: 0,
  });

  const logInteraction = useCallback((type: 'project' | 'skill', id: string) => {
    setInteractions(prev => {
      const newInteractions = { ...prev };
      if (type === 'project') {
        newInteractions.viewedProjects.add(id);
      } else if (type === 'skill') {
        newInteractions.viewedSkills.add(id);
      }
      return newInteractions;
    });
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setInteractions(prev => ({ ...prev, timeOnPage: prev.timeOnPage + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interactionCount = interactions.viewedProjects.size + interactions.viewedSkills.size;
    if (interactionCount > 3 || interactions.timeOnPage > 15) {
      const runAI = async () => {
        const interactionPayload = {
          ...interactions,
          viewedProjects: Array.from(interactions.viewedProjects),
          viewedSkills: Array.from(interactions.viewedSkills),
        };
        
        try {
          const result: PersonalizePortfolioPresentationOutput | undefined = await personalizePortfolioAction(JSON.stringify(interactionPayload));

          if (result) {
            setHighlightedProjects(JSON.parse(result.highlightedProjects));
            setHighlightedSkills(JSON.parse(result.highlightedSkills));
            setSuggestedLayoutChanges(result.suggestedLayoutChanges);
          }
        } catch (error) {
          console.error("Error personalizing portfolio:", error);
        }
      };
      
      // Only run once
      if (highlightedProjects.length === 0 && highlightedSkills.length === 0) {
        runAI();
      }
    }
  }, [interactions, highlightedProjects, highlightedSkills]);


  return (
    <PortfolioContext.Provider value={{ highlightedProjects, highlightedSkills, suggestedLayoutChanges, logInteraction }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
