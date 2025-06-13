//import { generateId } from 'ai';
import type { Message } from 'ai';
import { db } from '@/server/db'
import { chats } from '@/server/db/schema';
import { eq } from 'drizzle-orm'

export async function getAllChats() {
    const chatList = await db.select().from(chats).orderBy(chats.createdAt)
    return chatList
}

export async function getChatsByUserId(userId:string) {
    const userChatList = await db.select().from(chats).where(eq(chats.userId, userId)).orderBy(chats.createdAt)
    return  userChatList;
}