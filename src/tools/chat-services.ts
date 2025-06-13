//import { generateId } from 'ai';
import type { Message } from 'ai';
import { db } from '@/server/db'
import { chats } from '@/server/db/schema';
//import { eq } from 'drizzle-orm'

export async function getAllChats() {
    const chatList = await db.select().from(chats).orderBy(chats.createdAt)
    console.log(chatList, "#### ALL CHATS FROM DB")
    return chatList
}