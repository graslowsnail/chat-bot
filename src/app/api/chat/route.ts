import { google } from '@ai-sdk/google';
import { streamText, type CoreMessage } from 'ai';
import { tool } from 'ai';
import { z } from 'zod';

interface SearchItem {

  title: string;
  snippet: string;
  link: string;
}

async function searchWeb(query:string) {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.items?.slice(0, 3).map((item: SearchItem) => ({
    title: item.title,
    snippet: item.snippet,
    link: item.link
  })) || [] // return data or empty array
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  const body = await req.json() as { messages: CoreMessage[] };
  const { messages } = body;

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: 'You are a helpful assistant.',
    messages,
    maxSteps: 5,
    tools: {
      webSearch: tool ({
        description: 'Search the web for current information',
        parameters: z.object({
          query: z.string().describe('The search query to look up')
        }),
        execute: async ({ query }) => {
          const result = await searchWeb(query)
          return { query, result: result };
        }
      })
    }

  });

  return result.toDataStreamResponse();
}