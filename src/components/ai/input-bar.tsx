"use client";

interface InputBarProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18.168-8.215a.5.5 0 0 0 0-.904L3.714 3.048z" />
    </svg>
  );
}

export function InputBar({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: InputBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0D0D14] via-[#0D0D14] to-transparent z-50">
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-[#1a1a2e]/70 border border-white/10 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-base py-3 pl-5"
            placeholder="Ask Agnaa about your project..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-full flex items-center justify-center transition-all duration-200 ${
              input.trim() && !isLoading
                ? "bg-gradient-to-tr from-[#1C1C72] to-[#7B2DBF] text-white shadow-[0_0_15px_rgba(123,45,191,0.5)] cursor-pointer hover:scale-105 active:scale-95"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            <SendIcon />
          </button>
        </form>
      </div>
      <div className="max-w-3xl mx-auto text-center mt-3">
        <p className="text-xs text-gray-500 tracking-wide">
          Powered by Agnaa Intelligence™
        </p>
      </div>
    </div>
  );
}
