import {screen} from "@testing-library/react";

import {render} from "./utils/test.utils";
import App from "./App";

test("renders component", () => {
  render(<App />);
  const comp = screen.getByTestId("app-test");
  expect(comp).toBeInTheDocument();
});
