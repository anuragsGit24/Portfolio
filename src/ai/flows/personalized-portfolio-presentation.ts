'use server';

/**
 * @fileOverview A flow that uses AI to personalize the portfolio presentation based on user interaction and engagement metrics.
 *
 * - personalizePortfolioPresentation - A function that handles the portfolio presentation personalization process.
 * - PersonalizePortfolioPresentationInput - The input type for the personalizePortfolioPresentation function.
 * - PersonalizePortfolioPresentationOutput - The return type for the personalizePortfolioPresentation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizePortfolioPresentationInputSchema = z.object({
  interactionData: z
    .string()
    .describe(
      'A stringified JSON containing data on user interactions with the portfolio, including viewed projects, time spent on each section, and skills of interest.'
    ),
  projects: z
    .string()
    .describe(
      'A stringified JSON array containing available project names and descriptions.'
    ),
  skills: z
    .string()
    .describe(
      'A stringified JSON array containing available skills and descriptions.'
    ),
});
export type PersonalizePortfolioPresentationInput = z.infer<
  typeof PersonalizePortfolioPresentationInputSchema
>;

const PersonalizePortfolioPresentationOutputSchema = z.object({
  highlightedProjects: z
    .string()
    .describe(
      'A stringified JSON array containing the names of the projects to highlight, tailored to the user interaction data.'
    ),
  highlightedSkills: z
    .string()
    .describe(
      'A stringified JSON array containing the names of the skills to highlight, tailored to the user interaction data.'
    ),
  suggestedLayoutChanges: z.string().describe('Suggested changes to the portfolio layout to improve user engagement'),
});
export type PersonalizePortfolioPresentationOutput = z.infer<
  typeof PersonalizePortfolioPresentationOutputSchema
>;

export async function personalizePortfolioPresentation(
  input: PersonalizePortfolioPresentationInput
): Promise<PersonalizePortfolioPresentationOutput> {
  return personalizePortfolioPresentationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizePortfolioPresentationPrompt',
  input: {schema: PersonalizePortfolioPresentationInputSchema},
  output: {schema: PersonalizePortfolioPresentationOutputSchema},
  prompt: `You are an AI portfolio personalization expert.

  Based on the provided user interaction data, projects, and skills, determine which projects and skills should be highlighted to the user.  Also, provide some suggestions on the portfolio layout to improve user engagement.

  User Interaction Data: {{{interactionData}}}

  Available Projects: {{{projects}}}

  Available Skills: {{{skills}}}

  Output the highlighted projects as a JSON array of project names.
  Output the highlighted skills as a JSON array of skill names.
  Output the suggested layout changes as a string.
  Make sure the highlighted projects and skills are selected from the available projects and skills.
  Do not suggest to highlight projects or skills that are not in the provided data.
  Do not invent new projects or skills.
  Make sure highlighted projects and skills are returned as a JSON string.
  Do not include any additional text besides the JSON output and layout suggestions.
`,
});

const personalizePortfolioPresentationFlow = ai.defineFlow(
  {
    name: 'personalizePortfolioPresentationFlow',
    inputSchema: PersonalizePortfolioPresentationInputSchema,
    outputSchema: PersonalizePortfolioPresentationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
