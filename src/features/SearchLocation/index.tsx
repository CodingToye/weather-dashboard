import React from 'react';

export interface SearchLocationProps {
    /** The location the user wishes to search. */
    location: string;
}

/**
 * SearchLocation component.
 *
 * @param {SearchLocationProps} props - Props for the component.
 * @returns {JSX.Element} A React element.
 */

const SearchLocation: React.FC<SearchLocationProps> = ({ location }) => {
    return (
        <section data-testid='search-location-test'>
            SearchLocation... {location}
        </section>
    );
};

export default SearchLocation;
