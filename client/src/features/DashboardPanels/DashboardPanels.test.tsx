import { render, screen, cleanup } from '@testing-library/react';
import DashboardPanels from './index';

describe('DashboardPanels', () => {
    afterEach(() => {
        cleanup();
    });
    test('DashboardPanels component renders', () => {
        render(<DashboardPanels searchedLocation={null} />);

        const comp = screen.getByTestId('dashboard-panels-test');
        expect(comp).toBeInTheDocument();
    });
});
