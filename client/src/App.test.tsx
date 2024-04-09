import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const comp = screen.getByTestId('app-test');
    expect(comp).toBeInTheDocument();
});
