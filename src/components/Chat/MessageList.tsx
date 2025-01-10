import { useEffect, useRef } from "react";
import { MessageBlock } from "./MessageBlock";
import type { ChatMessage, MessageGroup } from "./types";

function groupMessagesBySender(messages: ChatMessage[]) {
  const groupedMessages: MessageGroup[] = [];
  messages.forEach((message) => {
    const senderId = message.senderId;
    const lastGroup =
      groupedMessages.length > 0
        ? groupedMessages[groupedMessages.length - 1]
        : null;
    if (senderId === lastGroup?.senderId) {
      lastGroup.messages.push(message);
    } else {
      groupedMessages.push({
        id: message.id,
        senderId,
        messages: [message],
      });
    }
  });
  return groupedMessages;
}

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  // Add ref for the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupedMessages = groupMessagesBySender(messages);

  return (
    <div className="p-6 pt-2 h-[300px] w-[350px] overflow-y-auto">
      <div className="space-y-4">
        {groupedMessages.map((group) => (
          <MessageBlock {...group} />
        ))}
        {/* Add empty div as scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
