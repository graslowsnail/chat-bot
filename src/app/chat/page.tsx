import { redirect } from 'next/navigation';
import { createChat } from '@/tools/chat-store';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function ChatPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user){
    console.log('User not authenticated, redirecting to login');
    redirect('/login')
  }

  const id = await createChat(session.user.id); // creates chat in DB + returns ID
  redirect(`/chat/${id}`);
}