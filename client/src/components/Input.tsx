import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
    name: string;
    placeholder?: string;
    register: UseFormRegister<T>;
    icon?: React.ReactNode;
}

const Input: React.ForwardRefRenderFunction<
    HTMLInputElement,
    InputProps<any>
> = ({ name, placeholder, register, icon }) => {
    return (
        <fieldset className='relative'>
            {icon && (
                <span className='absolute left-2 top-1/2 -translate-y-1/2'>
                    {icon}
                </span>
            )}
            <input
                {...register(name)}
                type='text'
                name={name}
                className={`text-color2 bg-color3 p-2 rounded-lg w-72 placeholder:text-color2/50 focus:placeholder:text-color2/0 focus:outline-none focus:shadow-blur transition-all ${
                    icon && 'pl-8'
                }`}
                placeholder={placeholder}
                data-testid='input-test'
            />
        </fieldset>
    );
};

export default Input;
