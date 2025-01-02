export function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
