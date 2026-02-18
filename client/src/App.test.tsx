import {screen, waitFor} from "@testing-library/react";

import {render} from "./utils/test.utils";
import App from "./App";

describe("App", () => {
  test("renders component", async () => {
    render(<App />);
    const comp = await waitFor(() => {
      screen.getByTestId("app-test");
    });
    expect(comp).toBeInTheDocument();
  });
});
