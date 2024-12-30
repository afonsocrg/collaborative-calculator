// From: https://stackoverflow.com/questions/673905/how-can-i-determine-a-users-locale-within-the-browser
export function determineLocale(): string {
  // All modern browsers support this. Should match what's used by localeCompare() etc.
  const intl = window.Intl;
  if (intl !== undefined) {
    return intl.NumberFormat().resolvedOptions().locale;
  }

  // Fall back to ranked choice locales, which are configured in the browser but aren't necessarily
  // what's used in functions like localeCompare().
  const languages = navigator.languages as string[] | undefined;
  if (languages !== undefined && languages.length > 0) {
    return languages[0];
  }

  // Old standard.
  return navigator.language ?? "en-US";
}
