import { Typography } from "antd";
import { useMyId, useStateTogetherWithPerUserValues } from "react-together";
import { UserHighlighter } from "./UserHighlighter";

const { Text } = Typography;

interface PresenceEditableTextProps {
  rtKey: string;
  value: string;
  onChange: (value: string) => void;
}
export function PresenceEditableText({
  rtKey,
  value,
  onChange,
}: PresenceEditableTextProps) {
  const myId = useMyId();
  const [isEditing, setIsEditing, allEditing] =
    useStateTogetherWithPerUserValues(rtKey, false);

  const othersEditing = Object.entries(allEditing)
    .filter(([id, editing]) => id !== myId && editing)
    .map(([id]) => id);

  const triggerType: ("text" | "icon")[] = ["text"];
  const inputClassName = "font-bold underline cursor-pointer";

  return (
    <UserHighlighter highlight={!isEditing} userIds={othersEditing}>
      <Text
        className={inputClassName}
        editable={{
          triggerType,
          enterIcon: null,
          onStart: () => setIsEditing(true),
          onChange: (v) => {
            onChange(v);
            setIsEditing(false);
          },
          onEnd: () => setIsEditing(false),
          onCancel: () => setIsEditing(false),
        }}
      >
        {value}
      </Text>
    </UserHighlighter>
  );
}
