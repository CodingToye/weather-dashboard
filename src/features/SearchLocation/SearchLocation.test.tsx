import { render, screen, cleanup } from '@testing-library/react';
import SearchLocation from './index';

describe('SearchLocation', () => {
    afterEach(() => {
        cleanup();
    });
    test('SearchLocation component renders', () => {
        render(<SearchLocation location='New York' />);

        const comp = screen.getByTestId('search-location-test');
        expect(comp).toBeInTheDocument();
    });
});
