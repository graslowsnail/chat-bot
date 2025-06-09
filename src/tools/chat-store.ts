import { generateId } from 'ai';
import type { Message } from 'ai';
import { db } from '@/server/db'
import { chats } from '@/server/db/schema';
import { eq } from 'drizzle-orm'

export async function createChat(): Promise<string> {
    const id = generateId();
    // Insert new chat into database
    await db.insert(chats).values({
      id,
      messages: [],
    });
    
    return id;
  }

export async function loadChat(id: string): Promise<Message []> {
    const chat = await db.select().from(chats).where(eq(chats.id, id)).limit(1)

    if(!chat.length) {
        throw new Error(`Chat ${id} not found`);
    }

    return chat[0]?.messages as Message[];
}

export async function saveChat(chatId: string, messagesList: Message[]): Promise<void> {
  // Find the chat with this ID and update it

  await db.update(chats)         // "Hey database, update the chats table"
    .set({                       // "Set these new values:"
      messages: messagesList,    // "Save these messages"
      updatedAt: new Date()      // "Mark it as updated now"
    })
    .where(eq(chats.id, chatId)); // "But only for the chat with this ID"
}