import { getCurrency } from "locale-currency";
import { ReactNode, createContext, useState } from "react";
import { useStateTogether } from "react-together";
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
  const [isOpen, setIsOpen] = useState(false);

  const [currency, _setCurrency] = useStateTogether(
    "currency",
    localStorage.getItem("currency")?.replace(/"/g, "") ||
      getCurrency(determineLocale()) ||
      "USD"
  );

  const setCurrency = (currency: string) => {
    localStorage.setItem("currency", currency);
    _setCurrency(currency);
  };

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
