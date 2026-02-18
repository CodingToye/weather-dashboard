import React from "react";
import {render, screen} from "@testing-library/react";
import {useForm} from "react-hook-form";

import Input from "../Input";

describe("Input", () => {
  const name = "name";
  const placeholder = "placeholder";
  const register = jest.fn();
  const {formState} = useForm();
  const inputType = "password";
  const label = "my label";
  test("renders component", () => {
    render(
      <Input
        name={name}
        placeholder={placeholder}
        register={register}
        icon="my_icon"
        formState={formState}
        inputType={inputType}
        label={label}
      />
    );
    const input = screen.getByTestId("input-test");
    expect(input).toBeInTheDocument();
  });
});
