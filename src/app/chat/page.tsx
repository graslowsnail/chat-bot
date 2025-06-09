import { redirect } from 'next/navigation';
import { generateId } from 'ai';
import { createChat } from '@/tools/chat-store';

export default async function ChatPage() {
  const id = await createChat(); // creates chat in DB + returns ID
  redirect(`/chat/${id}`);
}