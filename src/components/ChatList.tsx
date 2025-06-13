import { getAllChats, getChatsByUserId } from "@/tools/chat-services";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type ChatRowProps = {
  isLast: boolean;
  id: string;
  date: string;
  title?: string; // or some chat-specific prop
};
const ChatRow = ({ isLast, id, date }: ChatRowProps) => {
  let rowBorder = isLast
    ? "relative hover:bg-violet-100 cursor-pointer"
    : "relative border-b border-violet-200 hover:bg-violet-100 cursor-pointer";

  return (
    <tr className={rowBorder}>
      <td className="px-2 py-4 font-mono">{date}</td>
      <td className="px-2 py-4 font-mono">Chat #{id}</td>
      <td className="px-2 py-4 text-right font-mono">
        <Link href={`/chat/${id}`} className="absolute inset-0 pt-5">
          Open Chat
        </Link>
      </td>
    </tr>
  );
};

export default async function ChatList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session?.user) {
    return (
      <div className="text-center py-8 flex flex-col items-center gap-4">
        <div>This is an AI chat that surfs the web for you. Just don’t annoy it, or it might get a little salty.</div>
        <div>Please log in to see your chats.</div>
        <Link href="/auth/sign-in">
          <Button className="bg-violet-300 text-black">Log In Here</Button>
        </Link>
      </div>
    )
  }

  const chats = await getChatsByUserId(session.user.id);

  return (
    <>
      <h1 className="mb-4 text-center font-mono text-4xl">Ai Chats</h1>
      <div className="mb-4 flex justify-end">
        <Link href="/chat">
          <Button className="bg-violet-300 text-black">Add Chat</Button>
        </Link>
      </div>

      <table className="mx-auto w-full max-w-4xl text-left">
        <thead>
          <tr className="border-b border-violet-300">
            <th className="px-2 py-4 font-mono font-normal text-gray-600">
              Date
            </th>
            <th className="px-2 py-4 font-mono font-normal text-gray-600">
              Chat
            </th>
            <th className="px-2 py-4 text-right font-mono font-normal text-gray-600">
              Info
            </th>
          </tr>
        </thead>
        <tbody>
          {chats.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="py-8 text-center font-mono text-gray-500"
              >
                No chats yet.
              </td>
            </tr>
          ) : (
            chats.map((chat, idx) => (
              <ChatRow
                key={chat.id}
                isLast={idx === chats.length - 1}
                id={chat.id}
                date={chat.createdAt.toDateString()}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
