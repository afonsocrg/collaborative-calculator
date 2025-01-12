import { hashString } from "./random";

export function getUserColor(userId: string, isDarkMode: boolean): string {
  const brightness = isDarkMode ? 300 : 300;
  const colors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];
  const h = hashString(userId);
  const color = colors[h % colors.length] + `-${brightness}`;
  return color;
}

export function getUserAvatarUrl(userId: string): string {
  return `https://api.dicebear.com/9.x/miniavs/svg?seed=${userId}&backgroundColor=eeeeee`;
}
