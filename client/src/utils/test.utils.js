// src/utils/test.utils.js

import React from "react";
import {render as rtlRender} from "@testing-library/react";
import {ThemeProvider} from "../context/themeContext";

function render(ui, {...renderOptions} = {}) {
  function Wrapper({children}) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

// export * from "@testing-library/react";
export {render};
