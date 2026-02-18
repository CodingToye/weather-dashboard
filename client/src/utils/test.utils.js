// src/utils/test.utils.js

import React from "react";
import {render as rtlRender} from "@testing-library/react";

import {AuthProvider} from "../context/authContext"; // Adjust the import path as needed
import {ThemeProvider} from "../context/themeContext";

function render(
  ui,
  {mockUser = {firstName: "Test User"}, ...renderOptions} = {}
) {
  const Wrapper = ({children}) => (
    <ThemeProvider>
      <AuthProvider value={{user: mockUser}}>{children}</AuthProvider>
    </ThemeProvider>
  );

  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

// export * from "@testing-library/react";
export {render};
