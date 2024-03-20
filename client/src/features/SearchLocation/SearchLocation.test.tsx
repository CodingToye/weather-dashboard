import { render, screen, cleanup } from '@testing-library/react';
import SearchLocation from './index';

describe('SearchLocation', () => {
    afterEach(() => {
        cleanup();
    });

    const handleSearch = jest.fn();
    test('SearchLocation component renders', () => {
        render(<SearchLocation onSearch={handleSearch} />);

        const comp = screen.getByTestId('search-location-test');
        expect(comp).toBeInTheDocument();
    });
});
