import { config } from 'dotenv';
config();

import '@/ai/flows/answer-question.ts';
import '@/ai/flows/generate-flashcards.ts';
import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/generate-mind-map.ts';