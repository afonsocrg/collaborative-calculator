import { useMyId } from "react-together";
import { getUserAvatarUrl } from "../../utils/users";
import type { MessageGroup } from "./types";

function formatDate(date: number) {
  return new Date(date).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function MessageBlock({ senderId, messages }: MessageGroup) {
  const myId = useMyId();
  const isMe = senderId === myId;
  const flexDirection = isMe ? "flex-row-reverse" : "flex-row";

  const rowBaseClassName = "flex gap-1 items-end";
  const rowClassName = `${rowBaseClassName} ${flexDirection}`;

  const messageBubbleBaseClass =
    "flex flex-col gap-2 rounded-lg px-3 py-2 text-sm max-w-[250px]";

  const messageBubbleClassName = isMe
    ? `${messageBubbleBaseClass} bg-blue-500 text-white`
    : `${messageBubbleBaseClass} bg-gray-100`;
  return (
    <div className={rowClassName}>
      <span className="relative flex h-5 w-5 shrink-0 overflow-hidden rounded-full">
        <img
          className="aspect-square h-full w-full"
          alt="Image"
          src={getUserAvatarUrl(senderId)}
        />
      </span>
      <div className="space-y-1">
        {messages.map((message) => (
          <div className={`flex ${flexDirection} gap-2 items-center group`}>
            <div className={messageBubbleClassName}>{message.message}</div>
            <div
              className={`text-xs text-gray-400 text-muted-foreground invisible group-hover:visible text-${
                isMe ? "right" : "left"
              }`}
            >
              {formatDate(message.sentAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
