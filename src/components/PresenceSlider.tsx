import { Avatar, Slider, SliderSingleProps, theme } from "antd";
import { useStateTogetherWithPerUserValues } from "react-together";
import { getUserAvatarUrl } from "../utils/users";

const { useToken } = theme;

interface SliderProps extends SliderSingleProps {
  rtKey: string;
}

export function PresenceSlider({ rtKey, ...sliderProps }: SliderProps) {
  const { token } = useToken();

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
      : {
          open: false,
        };

  return (
    <Slider
      styles={{
        track: {
          backgroundColor: token.colorPrimary,
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
