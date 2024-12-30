import { Avatar, Slider, SliderSingleProps } from "antd";
import { useMyId, useStateTogetherWithPerUserValues } from "react-together";

interface SliderProps extends SliderSingleProps {
  rtKey: string;
}

export function PresenceSlider({ rtKey, ...sliderProps }: SliderProps) {
  const myId = useMyId();
  const [isEditing, setIsEditing, allEditing] =
    useStateTogetherWithPerUserValues(rtKey, false);

  const othersEditing = Object.entries(allEditing)
    .filter(([id, editing]) => id !== myId && editing)
    .map(([id]) => id);

  const tooltip =
    othersEditing.length > 0
      ? {
          open: true,
          formatter: () => (
            <Avatar.Group max={{ count: 3 }} size={16}>
              {!isEditing &&
                othersEditing.map((id) => (
                  <Avatar
                    key={id}
                    size={16}
                    src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${id}&backgroundColor=eeeeee`}
                  />
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
