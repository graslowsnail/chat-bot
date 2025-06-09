import { loadChat } from '@/tools/chat-store';
import type { Message } from 'ai/react';
import Chat from '@/components/Chat';

export default async function ChatPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  // Try to load existing chat, or start with empty messages
  let initialMessages: Message[] = [];
  try {
    initialMessages = await loadChat(id);
  } catch (error) {
    // Chat doesn't exist yet, start fresh
    console.log('New chat starting:', id);
  }

  return <Chat id={id} initialMessages={initialMessages} />;
}