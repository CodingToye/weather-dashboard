// src/components/Input.tsx

/**
 * Input Component
 * Renders a form input element
 *
 * @component
 * @example
 * return (
 *  <Input
          name="myInputName"
          placeholder="myPlaceholder"
          register={register}
          icon="my_icon"
        />
 * )
 */

import React from "react";
import {UseFormRegister, FieldValues, Path} from "react-hook-form";
import Icon from "./Icon";

/** Properties for the Input component
 *
 * Defines the props accepted by the Input component.
 *
 * @interface
 */
export interface InputProps<TFieldValues extends FieldValues> {
  /** Adds a name for reference */
  name: keyof TFieldValues;
  /** Adds a placeholder text for when the input element has no value */
  placeholder?: string;
  /** UNKNOWN */
  register: UseFormRegister<TFieldValues>;
  /** Adds an icon using the Google Fonts library https://fonts.google.com/icons */
  icon?: string;
}

const Input = <TFieldValues extends FieldValues>({
  name,
  placeholder,
  register,
  icon,
}: InputProps<TFieldValues>) => {
  return (
    <fieldset className="relative">
      {icon && (
        <Icon
          iconName={icon}
          extraClasses="text-white dark:text-neutral-darkGrey/50 w-16 absolute left-2 top-1/2 -translate-y-1/2"
          ariaLabel="search icon"
        />
      )}
      <input
        {...register(name as Path<TFieldValues>)}
        type="text"
        name={name as string}
        className={`text-white dark:text-neutral-darkGrey bg-neutral-midGrey dark:bg-white placeholder:text-white/50  dark:placeholder:text-neutral-darkGrey/50  focus:placeholder:text-white/50 outline-none focus:bg-primary focus:shadow-soft-secondary-outline dark:focus:shadow-soft-primary-outline focus:border-primary focus:outline-none p-2 w-full lg:w-72 rounded-lg transition-all ${
          icon && "pl-10"
        }`}
        placeholder={placeholder}
        data-testid="input-test"
      />
    </fieldset>
  );
};

export default Input;
