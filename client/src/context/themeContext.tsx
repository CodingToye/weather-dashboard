import React, {createContext, useContext, ReactNode} from "react";
import useDarkMode from "../hooks/useDarkMode";

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}) {
  const [theme, setTheme] = useDarkMode();

  const value = {theme, setTheme};

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
