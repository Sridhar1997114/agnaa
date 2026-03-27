"use client";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

/** Simple markdown-to-HTML: bold, italic, line breaks, bullet lists */
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^[-•]\s+(.+)$/gm, '<li style="margin-left:1rem;list-style:disc inside">$1</li>')
    .replace(/\n/g, "<br/>");
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isAgnaa = message.role !== "user";

  return (
    <div
      className={`chat-bubble-animate flex w-full mb-6 ${
        isAgnaa ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${
          isAgnaa ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}
        {isAgnaa && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(123,45,191,0.3)] overflow-hidden">
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
        )}

        {/* Message Content */}
        <div
          className={`px-5 py-4 ${
            isAgnaa ? "chat-bubble-agn" : "chat-bubble-user text-agn-card"
          }`}
        >
          <div
            className="prose prose-sm md:prose-base dark:prose-invert max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
          />
        </div>
      </div>
    </div>
  );
}
