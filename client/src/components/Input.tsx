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

import {UseFormRegister, FieldValues, Path, FormState} from "react-hook-form";

import {getErrorMessage} from "../utils/formUtils";

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
  formState: FormState<TFieldValues>;
  inputType?: string;
  label?: string | null;
}

const Input = <TFieldValues extends FieldValues>({
  name,
  placeholder,
  register,
  formState,
  icon,
  inputType = "text",
  label,
}: InputProps<TFieldValues>) => {
  const errorMessage = getErrorMessage(formState.errors, name);
  return (
    <>
      <fieldset>
        {label && (
          <label htmlFor={`${String(name)}`} className="text-sm ">
            {label}
          </label>
        )}
        <div className="flex items-center relative">
          {icon && (
            <Icon
              iconName={icon}
              extraClasses="text-base text-white dark:text-neutral-darkGrey/50 w-16 absolute left-2 top-1/2 -translate-y-1/2"
              ariaLabel="search icon"
            />
          )}
          <input
            {...register(name as Path<TFieldValues>, {required: true})}
            type={inputType}
            name={name as string}
            className={`text-white text-sm dark:text-neutral-darkGrey bg-neutral-midGrey dark:bg-white placeholder:text-white/50  dark:placeholder:text-neutral-darkGrey/50  focus:placeholder:text-white/50 outline-none focus:bg-primary focus:shadow-soft-secondary-outline dark:focus:shadow-soft-primary-outline focus:border-primary focus:outline-none p-2 w-full lg:w-72 rounded transition-all ${
              icon && "pl-8"
            }`}
            placeholder={placeholder}
            data-testid="input-test"
          />
        </div>
        {errorMessage && (
          <p role="alert" className="text-failure text-xs mt-1">
            {errorMessage}
          </p>
        )}
      </fieldset>
    </>
  );
};

export default Input;
