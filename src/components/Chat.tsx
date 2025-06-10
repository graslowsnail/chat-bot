"use client";
import { useEffect, useRef } from "react";
import { useChat, type Message } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchResults } from "./search-results";

export default function Chat({ id, initialMessages }: { id:string, initialMessages:Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, error, reload } =
    useChat({
      id,//hey useChat this conva is abc123
      initialMessages,// start with these old msgs
      api: '/api/chat',// send req to this endpoint
    });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <div className="flex h-screen max-w-4xl mx-auto flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="mb-4">
            <strong>{m.role}: </strong>
            {m.content}
            <div>
              {m.toolInvocations?.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;
                if (state === 'result'){
                  if(toolName === 'webSearch'){
                    const { result } = toolInvocation;
                    return(
                      <div key={toolCallId} className="mt-5">
                        <SearchResults query={result.query} results={result.result}/>
                      </div>
                    )
                  }
                } else {
                  return (
                    <div key={toolCallId} className="mt-2 text-gray-500">
                      Searching...
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <div>An error occurred.</div>
            <button type="button" onClick={() => reload()}>
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="border-t p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="flex-1"
            disabled={error != null}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
