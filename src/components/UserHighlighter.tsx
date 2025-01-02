import { Avatar, Badge } from "antd";
import { getUserColor } from "../utils/random";

interface UserHighlighterProps {
  highlight: boolean;
  userIds: string[];
  children: React.ReactNode;
}
export function UserHighlighter({
  highlight,
  userIds,
  children,
}: UserHighlighterProps) {
  const color =
    highlight && userIds.length > 0 ? getUserColor(userIds[0]) : "transparent";

  return (
    <Badge
      count={
        highlight ? (
          <Avatar.Group max={{ count: 1 }} size={16}>
            {userIds.map((id) => (
              <Avatar
                key={id}
                size={16}
                src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${id}&backgroundColor=eeeeee`}
              />
            ))}
          </Avatar.Group>
        ) : null
      }
      size="small"
    >
      <span className={`border-solid border-${color} border-2 rounded-md p-1`}>
        {children}
      </span>
    </Badge>
  );
}
