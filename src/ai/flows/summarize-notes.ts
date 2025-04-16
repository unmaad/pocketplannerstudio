'use server';
/**
 * @fileOverview Summarizes notes using an AI model.
 *
 * - summarizeNotes - A function that summarizes notes.
 * - SummarizeNotesInput - The input type for the summarizeNotes function.
 * - SummarizeNotesOutput - The return type for the summarizeNotes function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeNotesInputSchema = z.object({
  notes: z.string().describe('The notes to summarize.'),
});
export type SummarizeNotesInput = z.infer<typeof SummarizeNotesInputSchema>;

const SummarizeNotesOutputSchema = z.object({
  summary: z.string().describe('The summary of the notes.'),
});
export type SummarizeNotesOutput = z.infer<typeof SummarizeNotesOutputSchema>;

export async function summarizeNotes(input: SummarizeNotesInput): Promise<SummarizeNotesOutput> {
  return summarizeNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNotesPrompt',
  input: {
    schema: z.object({
      notes: z.string().describe('The notes to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('The summary of the notes.'),
    }),
  },
  prompt: `Summarize the following notes:\n\n{{notes}}`,
});

const summarizeNotesFlow = ai.defineFlow<
  typeof SummarizeNotesInputSchema,
  typeof SummarizeNotesOutputSchema
>({
  name: 'summarizeNotesFlow',
  inputSchema: SummarizeNotesInputSchema,
  outputSchema: SummarizeNotesOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
