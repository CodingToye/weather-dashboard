export interface WeatherData {
    location: {
        name: string;
    };

    current: {
        temp_c: number;
        wind_mph: number;
        condition: Conditions;
    };
}

export interface Conditions {
    text: string;
    icon: string;
}

export interface SearchLocationProps {
    /** The location the user wishes to search. */
    onSearch: (city: string) => void;
}

export interface DashboardPanelsProps {
    searchedLocation: WeatherData | null;
}
