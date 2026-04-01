"use client";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

/** Simple markdown-to-HTML: bold, italic, line breaks, bullet lists, blockquotes */
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^[-•]\s+(.+)$/gm, '<li style="margin-left:1.5rem;list-style:disc outside;margin-bottom:0.5rem">$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:4px solid #7B2DBF;padding-left:1rem;margin:1rem 0;font-style:italic;color:#9ca3af">$1</blockquote>')
    .replace(/\n\n/g, '<div style="height:1rem"></div>')
    .replace(/\n/g, "<br/>");
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isAgnaa = message.role !== "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div
      className={`chat-bubble-animate flex w-full mb-8 ${
        isAgnaa ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-[90%] md:max-w-[80%] gap-4 ${
          isAgnaa ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}
        {isAgnaa && (
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0D0D14] flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(123,45,191,0.2)] overflow-hidden">
            <svg
              viewBox="0 0 4000 4000"
              className="w-6 h-6 drop-shadow-[0_0_8px_rgba(123,45,191,0.8)]"
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

        {/* Message Content Container */}
        <div className="flex flex-col gap-2 flex-1">
          <div
            className={`px-6 py-5 rounded-[24px] shadow-2xl relative group ${
              isAgnaa 
                ? "bg-[#1a1a2e]/80 backdrop-blur-md border border-white/5 text-gray-100 rounded-tl-none" 
                : "bg-gradient-to-tr from-[#1C1C72] to-[#7B2DBF] text-white rounded-tr-none border border-white/10"
            }`}
          >
            <div
              className="prose prose-invert prose-sm md:prose-base max-w-none leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
            
            {isAgnaa && (
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                title="Copy response"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              </button>
            )}
          </div>
          {isAgnaa && (
            <span className="text-[10px] text-gray-500 uppercase tracking-widest ml-1 font-bold">
              Agnaa Studio Response
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
