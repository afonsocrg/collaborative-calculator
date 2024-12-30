import { useLocalStorage } from "@uidotdev/usehooks";
import { getCurrency } from "locale-currency";
import { ReactNode, createContext } from "react";
import { determineLocale } from "../utils/locale";

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useLocalStorage(
    "currency",
    getCurrency(determineLocale()) || "USD"
  );

  return (
    <SettingsContext.Provider value={{ currency, setCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
}
