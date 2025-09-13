'use server';

/**
 * @fileOverview Flow to generate a mind map from a document.
 *
 * - generateMindMap - A function that handles the mind map generation process.
 * - GenerateMindMapInput - The input type for the generateMindMap function.
 * - GenerateMindMapOutput - The return type for the generateMindMap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMindMapInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to generate a mind map from.'),
});
export type GenerateMindMapInput = z.infer<typeof GenerateMindMapInputSchema>;

const GenerateMindMapOutputSchema = z.object({
  mindMapJson: z
    .string()
    .describe(
      'A JSON string representing the hierarchical mind map generated from the document.'
    ),
});
export type GenerateMindMapOutput = z.infer<typeof GenerateMindMapOutputSchema>;

export async function generateMindMap(
  input: GenerateMindMapInput
): Promise<GenerateMindMapOutput> {
  return generateMindMapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMindMapPrompt',
  input: {schema: GenerateMindMapInputSchema},
  output: {schema: GenerateMindMapOutputSchema},
  prompt: `You are an expert at creating mind maps from text documents.  Your output MUST be valid JSON.

  Analyze the following document and generate a hierarchical mind map in JSON format. The JSON should represent the main topics, subtopics, and their relationships within the document.

  Document: {{{documentText}}}

  Ensure the JSON is well-structured and easy to parse.
  `,
});

const generateMindMapFlow = ai.defineFlow(
  {
    name: 'generateMindMapFlow',
    inputSchema: GenerateMindMapInputSchema,
    outputSchema: GenerateMindMapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
