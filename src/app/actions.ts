'use server';

import { personalizePortfolioPresentation, PersonalizePortfolioPresentationInput, PersonalizePortfolioPresentationOutput } from "@/ai/flows/personalized-portfolio-presentation";
import { PROJECTS, SKILLS } from "@/lib/data";

export async function personalizePortfolioAction(
  interactionData: string
): Promise<PersonalizePortfolioPresentationOutput | undefined> {
  
  const projectsString = JSON.stringify(PROJECTS.map(p => ({ name: p.title, description: p.description })));
  const skillsString = JSON.stringify(SKILLS.flatMap(category => category.skills.map(skill => ({ name: skill.name, description: '' }))));

  const input: PersonalizePortfolioPresentationInput = {
    interactionData,
    projects: projectsString,
    skills: skillsString,
  };

  try {
    const output = await personalizePortfolioPresentation(input);
    return output;
  } catch (error) {
    console.error('Error in personalizePortfolioAction:', error);
    // In a real app, you might want to return a more structured error
    return undefined;
  }
}
