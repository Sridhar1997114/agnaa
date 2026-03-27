"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatBubble } from "@/components/ai/chat-bubble";
import { InputBar } from "@/components/ai/input-bar";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AgnaaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            data.reply ||
            "I apologize, I couldn't generate a response. Please try again.",
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        console.error("Chat error:", err);
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Apologies — I encountered a connectivity issue. Please refresh and try again, or contact Agnaa Studio: +91-8179261230 | hello@agnaa.in\n\n– Agnaa Design Studio | Transform visions into structures™",
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D14]">
      {/* Hidden SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="agnaa-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1C1C72" />
            <stop offset="100%" stopColor="#7B2DBF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0D0D14]/80 border-b border-white/5 p-4 md:px-8 py-5 flex items-center gap-3">
        <svg
          viewBox="0 0 4000 4000"
          className="w-12 h-12 drop-shadow-[0_0_15px_rgba(123,45,191,0.5)]"
          fill="url(#agnaa-gradient)"
          fillRule="evenodd"
        >
          <path d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z" />
          <path d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z" />
          <polygon points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1" />
          <path d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z" />
          <path d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z" />
        </svg>
        <span
          className="text-transparent bg-clip-text bg-gradient-to-tr from-[#1C1C72] to-[#7B2DBF] text-2xl font-bold tracking-wide mt-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          AI
        </span>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto pt-8 pb-32 px-4 md:px-0">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="chat-bubble-animate flex flex-col items-center justify-center h-[50vh] text-center px-4">
              <svg
                viewBox="0 0 4000 4000"
                className="w-24 h-24 mb-6 animate-pulse drop-shadow-[0_0_30px_rgba(123,45,191,0.6)]"
                fill="url(#agnaa-gradient)"
                fillRule="evenodd"
              >
                <path d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z" />
                <path d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z" />
                <polygon points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1" />
                <path d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z" />
                <path d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z" />
              </svg>
              <h2
                className="text-2xl md:text-3xl text-white font-semibold mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ready to design your vision?
              </h2>
              <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
                Ask about layouts, materials, G+5 RERA rules, or the Vikarabad
                10/30/10/50 agroforestry model.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-end pt-10">
              {messages.map((m) => (
                <ChatBubble key={m.id} message={m} />
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="chat-bubble-animate flex justify-start w-full mb-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center border border-white/10 overflow-hidden shadow-lg">
                      <svg
                        viewBox="0 0 4000 4000"
                        className="w-5 h-5 drop-shadow-[0_0_5px_rgba(123,45,191,0.8)]"
                        fill="url(#agnaa-gradient)"
                        fillRule="evenodd"
                      >
                        <path d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z" />
                        <path d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z" />
                        <polygon points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1" />
                        <path d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z" />
                        <path d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z" />
                      </svg>
                    </div>
                    <div className="px-5 py-3 bg-[#1a1a2e] rounded-[20px_20px_5px_20px] shadow-sm border border-white/5 flex items-center overflow-hidden relative">
                      <span className="text-sm text-gray-300 mr-4">
                        Agnaa thinking...
                      </span>
                      <div className="flex gap-1.5 ml-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7B2DBF] animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7B2DBF] animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7B2DBF] animate-bounce" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <InputBar
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
