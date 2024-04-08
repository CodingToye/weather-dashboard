import React from "react";
import {render, screen} from "@testing-library/react";
import Input from "../Input";

describe("Input", () => {
  const name = "name";
  const placeholder = "placeholder";
  const register = jest.fn();
  test("renders component", () => {
    render(
      <Input
        name={name}
        placeholder={placeholder}
        register={register}
        icon="my_icon"
      />
    );
    const input = screen.getByTestId("input-test");
    expect(input).toBeInTheDocument();
  });
});
