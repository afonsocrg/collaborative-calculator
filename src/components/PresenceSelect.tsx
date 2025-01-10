import { SelectProps as AntdSelectProps, Select } from "antd";
import { useStateTogetherWithPerUserValues } from "react-together";
import { UserHighlighter } from "./UserHighlighter";

interface SelectProps extends AntdSelectProps {
  rtKey: string;
}
export function PresenceSelect({ rtKey, ...selectProps }: SelectProps) {
  const [isEditing, setIsEditing, allEditing] =
    useStateTogetherWithPerUserValues(rtKey, false, { omitMyValue: true });

  const othersEditing = Object.entries(allEditing)
    .filter(([, editing]) => editing)
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
