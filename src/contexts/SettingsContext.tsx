import { useLocalStorage } from "@uidotdev/usehooks";
import { getCurrency } from "locale-currency";
import { ReactNode, createContext, useState } from "react";
import { determineLocale } from "../utils/locale";

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  openSettings: () => void;
  closeSettings: () => void;
  isSettingsOpen: boolean;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useLocalStorage(
    "currency",
    getCurrency(determineLocale()) || "USD"
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsContext.Provider
        value={{
          currency,
          setCurrency,
          openSettings: () => setIsOpen(true),
          closeSettings: () => setIsOpen(false),
          isSettingsOpen: isOpen,
        }}
      >
        {children}
      </SettingsContext.Provider>
    </>
  );
}
