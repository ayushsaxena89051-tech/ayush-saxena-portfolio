import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Shimmer } from "@/components/ai-elements/shimmer";

const suggestions = ["Who is Ayush?", "What is Ayush studying?", "Tell me about his projects", "How can I connect with Ayush?"];
const transport = new DefaultChatTransport({ api: "/api/public/portfolio-chat", fetch: async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    const data = await response.json().catch(() => ({})) as { message?: string };
    throw new Error(data.message ?? "The chatbot is temporarily unavailable.");
  }
  return response;
} });

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, stop, error, clearError } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => {
    if (!open) return;
    const active = document.activeElement;
    if (active instanceof HTMLInputElement || (active instanceof HTMLTextAreaElement && active !== textarea.current)) return;
    textarea.current?.focus();
  }, [open, status]);
  function send(text: string) {
    if (busy || !text.trim()) return;
    clearError();
    setInput("");
    void sendMessage({ text: text.trim() });
    textarea.current?.focus();
  }
  const last = messages.at(-1);
  const waiting = busy && (last?.role !== "assistant" || !last.parts.some(part => part.type === "text" && part.text.length > 0));
  return <>
    <Button variant="portfolio" className="chat-launcher" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="ayush-chat" aria-label={open ? "Close Ayush chatbot" : "Ask about Ayush"}>{open ? <X /> : <MessageCircle />}<span>{open ? "Close chat" : "Ask about Ayush"}</span></Button>
    {open && <aside id="ayush-chat" className="chat-panel" aria-label="Ayush’s portfolio chatbot">
      <div className="chat-header"><div className="chat-monogram" aria-hidden="true">AS.</div><div className="flex-1"><h2 className="font-display text-lg font-semibold">Meet Ayush</h2><p className="text-xs text-muted-foreground">Your portfolio guide</p></div><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Minimize chatbot"><X /></Button></div>
      <Conversation><ConversationContent className="gap-5 p-5">
        {messages.length === 0 && <div className="py-4"><p className="font-display text-2xl font-semibold">A little curious?</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Hi! What would you like to know about Ayush?</p><div className="mt-6 grid gap-2">{suggestions.map(question => <Button key={question} variant="navigation" className="h-auto justify-between whitespace-normal px-3 py-3 text-left text-xs" onClick={() => send(question)}>{question}<ArrowUpRight /></Button>)}</div></div>}
        {messages.map(message => <Message key={message.id} from={message.role}><MessageContent className={message.role === "user" ? "chat-user" : "chat-assistant"}>{message.parts.map((part, index) => {
          if (part.type === "text") return <MessageResponse key={index}>{part.text}</MessageResponse>;
          if (part.type === "reasoning" && part.text) return <Reasoning key={index} defaultOpen={false} isStreaming={busy && message.id === last?.id}><ReasoningTrigger /><ReasoningContent>{part.text}</ReasoningContent></Reasoning>;
          return null;
        })}</MessageContent></Message>)}
        {waiting && <Message from="assistant"><MessageContent><Shimmer>Thinking about your question…</Shimmer></MessageContent></Message>}
        {error && <p role="alert" className="text-sm leading-6 text-destructive">{error.message}</p>}
      </ConversationContent><ConversationScrollButton aria-label="Scroll to latest reply" /></Conversation>
      <div className="chat-composer"><PromptInput onSubmit={({ text }) => send(text)}><PromptInputTextarea ref={textarea} value={input} onChange={event => setInput(event.target.value)} maxLength={2000} placeholder="Ask a question about Ayush…" aria-label="Your question about Ayush" /><PromptInputFooter className="justify-end"><PromptInputSubmit status={status} onStop={() => { void stop(); textarea.current?.focus(); }} disabled={!busy && !input.trim()} aria-label={busy ? "Stop reply" : "Send question"} /></PromptInputFooter></PromptInput><p className="mt-2 text-center text-[10px] text-muted-foreground">AI-powered · Chats aren’t saved</p></div>
    </aside>}
  </>;
}