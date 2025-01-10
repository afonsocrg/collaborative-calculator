import { useState } from "react";

export interface ChatFooterProps {
  sendMessage: (msg: string) => void;
}

export function ChatFooter({ sendMessage }: ChatFooterProps) {
  const [input, setInput] = useState("");
  const inputLength = input.trim().length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputLength === 0) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex items-center justify-center px-5 py-2 pt-0">
      <form
        className="flex w-full items-center space-x-1"
        onSubmit={handleSubmit}
      >
        <input
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
          id="message"
          autoComplete="off"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-blue-500 hover:bg-primary/90 h-8 w-8"
          disabled={inputLength === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-send "
          >
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
          </svg>
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  );
}
