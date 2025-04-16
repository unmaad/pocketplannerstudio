// src/ai/flows/suggest-calendar-events.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting calendar events based on user notes.
 *
 * - suggestCalendarEvents - A function that suggests calendar events from notes.
 * - SuggestCalendarEventsInput - The input type for the suggestCalendarEvents function.
 * - SuggestCalendarEventsOutput - The return type for the suggestCalendarEvents function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestCalendarEventsInputSchema = z.object({
  notes: z.string().describe('The notes to extract calendar events from.'),
});
export type SuggestCalendarEventsInput = z.infer<typeof SuggestCalendarEventsInputSchema>;

const SuggestCalendarEventsOutputSchema = z.object({
  events: z.array(
    z.object({
      title: z.string().describe('The title of the event.'),
      date: z.string().describe('The date of the event in ISO format.'),
      time: z.string().describe('The time of the event in HH:MM format.'),
      description: z.string().describe('A description of the event.'),
    })
  ).describe('The suggested calendar events.'),
});
export type SuggestCalendarEventsOutput = z.infer<typeof SuggestCalendarEventsOutputSchema>;

export async function suggestCalendarEvents(input: SuggestCalendarEventsInput): Promise<SuggestCalendarEventsOutput> {
  return suggestCalendarEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCalendarEventsPrompt',
  input: {
    schema: z.object({
      notes: z.string().describe('The notes to extract calendar events from.'),
    }),
  },
  output: {
    schema: z.object({
      events: z.array(
        z.object({
          title: z.string().describe('The title of the event.'),
          date: z.string().describe('The date of the event in ISO format.'),
          time: z.string().describe('The time of the event in HH:MM format.'),
          description: z.string().describe('A description of the event.'),
        })
      ).describe('The suggested calendar events.'),
    }),
  },
  prompt: `You are a personal assistant that extracts calendar events from notes.

  Given the following notes, extract any calendar events that can be created.
  Each event must have a title, date, time and description.

  Return the events in a JSON array.

  Notes: {{{notes}}}
  `,
});

const suggestCalendarEventsFlow = ai.defineFlow<
  typeof SuggestCalendarEventsInputSchema,
  typeof SuggestCalendarEventsOutputSchema
>({
  name: 'suggestCalendarEventsFlow',
  inputSchema: SuggestCalendarEventsInputSchema,
  outputSchema: SuggestCalendarEventsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
