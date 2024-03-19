import React, { useState } from 'react';
import { SearchLocationProps } from '../../types/types';

/**
 * SearchLocation component.
 *
 * @param {SearchLocationProps} props - Props for the component.
 * @returns {JSX.Element} A React element.
 */

const SearchLocation: React.FC<SearchLocationProps> = ({ onSearch }) => {
    const [searchLocation, setSearchLocation] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchLocation.trim() !== '') {
            onSearch(searchLocation.trim());
        }
    };
    return (
        <section data-testid='search-location-test'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='search-location'
                    onChange={handleChange}
                />
                <button type='submit'>Search</button>
            </form>
        </section>
    );
};

export default SearchLocation;
