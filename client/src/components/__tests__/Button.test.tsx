import React from "react";
import {render, screen} from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  const children = "Example Button";
  const title = "Example Title";
  test("renders with default props", () => {
    render(<Button title={title}>{children}</Button>);
    const button = screen.getByText(children);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("title", title);
  });

  test("renders with default title attribute when not provided", () => {
    render(<Button>{children}</Button>);
    const button = screen.getByText(children);
    expect(button).toHaveAttribute("title", "default title");
  });
});
