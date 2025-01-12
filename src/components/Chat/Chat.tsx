import { useState } from "react";
import { useChat, useIsTogether } from "react-together";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";

export function Chat() {
  const isTogether = useIsTogether();
  const [open, setOpen] = useState(false);
  const { messages, sendMessage } = useChat("chat");

  if (!isTogether) {
    return null;
  }

  return (
    <div className="rounded-t-xl border bg-card text-card-foreground shadow fixed bottom-0 right-4 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
      <div onClick={() => setOpen(!open)}>
        <ChatHeader />
      </div>
      {open && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <MessageList messages={messages} />
          </div>
          <ChatFooter
            sendMessage={(msg: string) => {
              sendMessage(msg);
            }}
          />
        </>
      )}
    </div>
  );
}
