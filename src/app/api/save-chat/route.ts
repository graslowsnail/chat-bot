import { saveChat } from "@/tools/chat-store";
import { type Message } from "ai";

export async function POST(req:Request):Promise<Response> {
const {id, messages }: {id: string, messages: Message[]} = await req.json()
await saveChat(id, messages)
return new Response('OK');
}