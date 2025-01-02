import { SelectProps as AntdSelectProps, Select } from "antd";
import { useMyId, useStateTogetherWithPerUserValues } from "react-together";
import { UserHighlighter } from "./UserHighlighter";

interface SelectProps extends AntdSelectProps {
  rtKey: string;
}
export function PresenceSelect({ rtKey, ...selectProps }: SelectProps) {
  const myId = useMyId();
  const [isEditing, setIsEditing, allEditing] =
    useStateTogetherWithPerUserValues(rtKey, false);

  const othersEditing = Object.entries(allEditing)
    .filter(([id, editing]) => id !== myId && editing)
    .map(([id]) => id);

  return (
    <UserHighlighter highlight={!isEditing} userIds={othersEditing}>
      <Select
        onDropdownVisibleChange={(open) => setIsEditing(open)}
        {...selectProps}
      />
    </UserHighlighter>
  );
}
