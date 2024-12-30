import { Avatar, Badge, Select, SelectProps } from "antd";
import { useMyId, useStateTogetherWithPerUserValues } from "react-together";
import { getUserColor } from "../utils/random";

export function PresenceSelect({
  rtKey,
  selectProps,
}: {
  rtKey: string;
  selectProps: SelectProps;
}) {
  const myId = useMyId();
  const [isEditing, setIsEditing, allEditing] =
    useStateTogetherWithPerUserValues(rtKey, false);

  const othersEditing = Object.entries(allEditing)
    .filter(([id, editing]) => id !== myId && editing)
    .map(([id]) => id);

  const color = isEditing
    ? "transparent"
    : othersEditing.length > 0
    ? getUserColor(othersEditing[0])
    : "transparent";

  const borderClassName = `border-solid border-${color} border-2 rounded-md p-1`;

  return (
    <Badge
      count={
        <Avatar.Group max={{ count: 1 }} size={16}>
          {!isEditing &&
            othersEditing.map((id) => (
              <Avatar
                key={id}
                size={16}
                src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${id}&backgroundColor=eeeeee`}
              />
            ))}
        </Avatar.Group>
      }
      size="small"
    >
      <span className={borderClassName}>
        <Select
          onDropdownVisibleChange={(open) => setIsEditing(open)}
          {...selectProps}
        />
      </span>
    </Badge>
  );
}
