import { loadChat } from '@/tools/chat-store';
import type { Message } from 'ai/react';
import Chat from '@/components/Chat';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ChatPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  // Try to load existing chat, or start with empty messages
  let initialMessages: Message[] = [];
  let notFound = false;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    console.log('User not authenticated, redirecting to login');
    redirect('/login');
  }

  try {
    initialMessages = await loadChat(session.user.id, id);
  } catch (error) {
    notFound = true;
    // Chat doesn't exist yet, start fresh
    console.log(`Error loading chat ${id}:`, error);
  }

  if(notFound){
    redirect('/')
  }

  return <Chat id={id} initialMessages={initialMessages} />;
}