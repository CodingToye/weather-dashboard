import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import Icon from './Icon';
interface InputProps<T extends FieldValues> {
    name: string;
    placeholder?: string;
    register: UseFormRegister<T>;
    icon?: string;
}

const Input: React.ForwardRefRenderFunction<
    HTMLInputElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    InputProps<any>
> = ({ name, placeholder, register, icon }) => {
    return (
        <fieldset className='relative'>
            {icon && (
                <>
                    <Icon
                        iconName='search'
                        extraClasses='absolute left-2 top-1/2 -translate-y-1/2 w-16'
                    />
                </>
            )}
            <input
                {...register(name)}
                type='text'
                name={name}
                className={`text-color2 bg-color3 p-2 rounded-lg w-72 placeholder:text-color2/50 focus:placeholder:text-color2/0 focus:outline-none focus:shadow-blur transition-all ${
                    icon && 'pl-10'
                }`}
                placeholder={placeholder}
                data-testid='input-test'
            />
        </fieldset>
    );
};

export default Input;
