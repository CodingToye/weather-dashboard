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
                        extraClasses='text-white dark:text-neutral-darkGrey/50 w-16 absolute left-2 top-1/2 -translate-y-1/2'
                    />
                </>
            )}
            <input
                {...register(name)}
                type='text'
                name={name}
                className={`text-white dark:text-neutral-darkGrey bg-neutral-midGrey dark:bg-white placeholder:text-white/50  dark:placeholder:text-neutral-darkGrey/50  focus:placeholder:text-white/50 outline-none focus:bg-primary focus:shadow-soft-secondary-outline dark:focus:shadow-soft-primary-outline focus:border-primary focus:outline-none p-2 w-full lg:w-72 rounded-lg transition-all ${
                    icon && 'pl-10'
                }`}
                placeholder={placeholder}
                data-testid='input-test'
            />
        </fieldset>
    );
};

export default Input;
