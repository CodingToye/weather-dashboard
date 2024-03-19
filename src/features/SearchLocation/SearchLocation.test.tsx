import { render, screen, cleanup } from '@testing-library/react';
import SearchLocation from './index';

describe('SearchLocation', () => {
    afterEach(() => {
        cleanup();
    });
    test('SearchLocation component renders', () => {
        render(<SearchLocation />);

        const comp = screen.getByTestId('search-location-test3');
        expect(comp).toBeInTheDocument();
    });
});
