"use client";
import { useEffect } from "react";
import { useChat, type Message } from "ai/react";

export default function Chat({ id, initialMessages }: { id:string, initialMessages:Message[] }) {
  const { messages, input, handleInputChange, handleSubmit, error, reload } =
    useChat({
      id,//jey useCat this vonvo is abc123
      initialMessages,// start with these old msgs
      api: '/api/chat',// send req to this endpoint
    });

    // save every new message, when the messages array changes 
    useEffect(() => {
      const saveMessages = async () => {
        try {
          await fetch('/api/save-chat',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id,
              messages: messages
            })
          })
          console.log('message added ')
        } catch (error) {
          console.log(`Error saving chat ${id}:`, error);
        }
      }
      saveMessages()
    }, [messages, id])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className="mb-4">
            <strong>{m.role}: </strong>
            {m.content}
          </div>
        ))}

        {error && (
          <>
            <div>An error occurred.</div>
            <button type="button" onClick={() => reload()}>
              Retry
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          className="flex-1 rounded border p-2"
          disabled={error != null}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
