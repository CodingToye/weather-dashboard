import React from 'react';
import { SearchLocationProps } from '../../types/types';
import Input from '../../components/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

/**
 * SearchLocation component.
 *
 * @param {SearchLocationProps} props - Props for the component.
 * @returns {JSX.Element} A React element.
 */

interface IFormValues {
    searchLocation: string;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onSearch }) => {
    const onSubmit: SubmitHandler<IFormValues> = (formData) => {
        console.log(formData);
        if (formData && formData.searchLocation) {
            const { searchLocation } = formData;
            if (searchLocation.trim() !== '') {
                onSearch(searchLocation.trim());
            }
        }
    };

    const { register, handleSubmit } = useForm<IFormValues>({
        mode: 'onSubmit',
    });
    return (
        <section data-testid='search-location-test'>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <Input
                    name='searchLocation'
                    placeholder='Search location or postcode'
                    register={register}
                    icon={<MagnifyingGlassIcon className='w-4' />}
                />
            </form>
        </section>
    );
};

export default SearchLocation;
