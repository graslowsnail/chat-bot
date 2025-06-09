import { saveChat } from "@/tools/chat-store";

export async function POST(req:Request) {
const {id, messages } = await req.json()
console.log(id, messages)
await saveChat(id, messages)
return new Response('OK');
}