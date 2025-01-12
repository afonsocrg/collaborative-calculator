import { useLocalStorage } from "@uidotdev/usehooks";
import { ConfigProvider, theme } from "antd";
import { getCurrency } from "locale-currency";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useStateTogether } from "react-together";
import colors from "tailwindcss/colors";
import { determineLocale } from "../utils/locale";

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  openSettings: () => void;
  closeSettings: () => void;
  isSettingsOpen: boolean;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean | null) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // null means system default
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean | null>(
    "isDarkMode",
    null
  );

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

  useEffect(() => {
    if (isDarkMode === null) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };

      document.documentElement.classList.toggle("dark", mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          isDarkMode === null
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm
            : isDarkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          // Base colors
          colorPrimary: isDarkMode ? colors.blue[300] : colors.blue[500],
          colorSuccess: isDarkMode ? colors.green[300] : colors.green[500],
          colorWarning: isDarkMode ? colors.yellow[300] : colors.yellow[500],
          colorError: isDarkMode ? colors.red[300] : colors.red[500],
          colorInfo: isDarkMode ? colors.sky[300] : colors.sky[500],

          // Background colors
          colorBgContainer: isDarkMode ? colors.gray[800] : colors.white,
          colorBgElevated: isDarkMode ? colors.gray[900] : colors.white,

          // Text colors
          colorText: isDarkMode ? colors.gray[300] : colors.gray[800],
          colorTextSecondary: isDarkMode ? colors.gray[400] : colors.gray[600],

          // Border colors
          colorBorder: isDarkMode ? colors.gray[700] : colors.gray[200],

          // Other customizations
          borderRadius: 8,
          wireframe: false, // Set to true for a flatter design
        },
        components: {
          Button: {
            primaryColor: isDarkMode ? colors.blue[400] : colors.blue[500],
            defaultBg: isDarkMode ? colors.gray[800] : colors.white,
          },
          Input: {
            colorBgContainer: isDarkMode ? colors.gray[800] : colors.white,
          },
          Slider: {
            colorPrimary: isDarkMode ? colors.blue[400] : colors.blue[500],
            // dotActiveBorderColor: isDarkMode
            //   ? colors.blue[400]
            //   : colors.red[500],
          },
          Select: {
            optionSelectedFontWeight: isDarkMode ? 600 : 600,
          },
          // Add more component-specific customizations as needed
        },
      }}
    >
      <SettingsContext.Provider
        value={{
          currency,
          setCurrency,
          openSettings: () => setIsOpen(true),
          closeSettings: () => setIsOpen(false),
          isSettingsOpen: isOpen,
          isDarkMode: isDarkMode === null ? false : isDarkMode,
          setIsDarkMode,
        }}
      >
        {children}
      </SettingsContext.Provider>
    </ConfigProvider>
  );
}
