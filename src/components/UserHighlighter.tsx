import { Avatar, Badge } from "antd";
import { getUserAvatarUrl, getUserColor } from "../utils/users";

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
  const avatarSize = 16;
  const color =
    highlight && userIds.length > 0 ? getUserColor(userIds[0]) : "transparent";

  return (
    <Badge
      count={
        highlight ? (
          <Avatar.Group max={{ count: 1 }} size={avatarSize}>
            {userIds.map((id) => (
              <Avatar key={id} size={avatarSize} src={getUserAvatarUrl(id)} />
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
