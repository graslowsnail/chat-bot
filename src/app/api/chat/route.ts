import { google } from '@ai-sdk/google';
import { streamText, type CoreMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  const body = await req.json() as { messages: CoreMessage[] };
  const { messages } = body;

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}