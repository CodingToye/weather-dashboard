import { render, screen, cleanup } from '@testing-library/react';
import DashboardPanels from './index';

const mockFetchWeather = jest.fn();

describe('DashboardPanels', () => {
    afterEach(() => {
        cleanup();
    });
    test('DashboardPanels component renders', () => {
        render(
            <DashboardPanels
                fetchWeather={mockFetchWeather}
                searchedLocation={null}
                colorTheme='light'
                tempUnit='C'
                speedUnit='mp/h'
                measurementUnit='mm'
            />
        );

        const comp = screen.getByTestId('dashboard-panels-test');
        expect(comp).toBeInTheDocument();
    });
});
