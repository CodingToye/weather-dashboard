// src/components/ModeSwitcher.tsx

/**
 * ModeSwitcher Component
 * This component renders a switch (leveraging `react-toggle-dark-mode`) for toggling between light and dark themes.
 * It expects the current theme and a setter function for changing the theme, typically provided by a theme context or custom hook.
 *
 * @component
 * @example
 * return (
 *  <ModeSwitcher />
 * )
 */

import React from "react";
import {DarkModeSwitch} from "react-toggle-dark-mode";

import {useTheme} from "../context/themeContext";

const ModeSwitcher: React.FC = () => {
  const {theme, setTheme} = useTheme();

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <DarkModeSwitch
      checked={theme === "light"}
      onChange={(checked) => handleThemeChange(!checked)}
    />
  );
};

export default ModeSwitcher;

// Todo - Write a unit test
