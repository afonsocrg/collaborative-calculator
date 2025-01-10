import { Avatar, Slider, SliderSingleProps } from "antd";
import { useStateTogetherWithPerUserValues } from "react-together";
import { getUserAvatarUrl } from "../utils/users";

interface SliderProps extends SliderSingleProps {
  rtKey: string;
}

export function PresenceSlider({ rtKey, ...sliderProps }: SliderProps) {
  const [isEditing, setIsEditing, allEditing] =
    useStateTogetherWithPerUserValues(rtKey, false, { omitMyValue: true });

  const othersEditing = Object.entries(allEditing)
    .filter(([, editing]) => editing)
    .map(([id]) => id);

  const tooltip =
    othersEditing.length > 0
      ? {
          open: true,
          formatter: () => (
            <Avatar.Group max={{ count: 3 }} size={16}>
              {!isEditing &&
                othersEditing.map((id) => (
                  <Avatar key={id} size={16} src={getUserAvatarUrl(id)} />
                ))}
            </Avatar.Group>
          ),
        }
      : undefined;

  return (
    <Slider
      styles={{
        track: {
          backgroundColor: othersEditing.length > 0 ? "#1677ff" : undefined,
        },
      }}
      tooltip={tooltip}
      onFocus={() => setIsEditing(true)}
      onChange={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      onChangeComplete={() => setIsEditing(false)}
      {...sliderProps}
    />
  );
}
