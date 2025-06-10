import { getAllChats } from "@/tools/chat-services";
import Link from "next/link";

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
  <td className="py-4 px-2 font-mono">{date}</td>
  <td className="py-4 px-2 font-mono">Chat #{id}</td>
  <td className="py-4 px-2 text-right font-mono">
    <Link href={`/chat/${id}`} className="absolute inset-0">
      Open Chat
    </Link>
  </td>
</tr>
    );
  };



  export default async function ChatList() {
    const chats = await getAllChats();
  
    return (
        <>
        <h1 className="text-4xl text-center mb-12 font-mono">Ai Chats</h1>
        <table className="w-full text-left max-w-4xl mx-auto">
          <thead>
            <tr className="border-b border-violet-300">
              <th className="py-4 px-2 text-gray-600 font-normal font-mono">Date</th>
              <th className="py-4 px-2 text-gray-600 font-normal font-mono">Chat</th>
              <th className="py-4 px-2 text-gray-600 font-normal text-right font-mono">Info</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat, idx) => (
              <ChatRow
                key={chat.id}
                isLast={idx === chats.length - 1}
                id={chat.id}
                date={chat.createdAt.toDateString()}
              />
            ))}
          </tbody>
        </table>
        </>

    );
  }