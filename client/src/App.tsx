import {useState, useEffect} from "react";
import {ThemeProvider} from "./context/themeContext";
import ModeSwitcher from "./components/ModeSwitcher";
import UnitSwitcher from "./components/UnitSwitcher";
import SearchLocation from "./features/SearchLocation";
import DashboardPanelsContainer from "./features/DashboardPanels";
import {formatCurrentDate} from "./utils/dates.utils";
import {CurrentWeather} from "./types/types";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const currentDate = formatCurrentDate();

  useEffect(() => {
    fetchWeather("Chester");
  }, []);

  const fetchWeather = async (city: string) => {
    try {
      const timestamp = Date.now();
      const currentApiUrl = `${process.env.REACT_APP_API_URL}/current?city=${city}&_=${timestamp}`;
      const currentResponse = await fetch(currentApiUrl);
      if (currentResponse.ok) {
        const currentData = await currentResponse.json();
        setWeatherData(currentData);
      } else {
        console.error(
          "Failed to fetch currentweather data:",
          currentResponse.statusText
        );
      }

      const forecastApiUrl = `${process.env.REACT_APP_API_URL}/forecast?city=${city}&_=${timestamp}`;

      const forecastResponse = await fetch(forecastApiUrl);
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        setWeatherData((prevData) => {
          if (!prevData) {
            return null;
          }
          return {
            ...prevData,
            forecast: forecastData.forecast,
            alerts: forecastData.alerts,
          };
        });
      } else {
        console.error(
          "Failed to fetch forecasted weather data:",
          forecastResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const [tempUnit, setTempUnit] = useState("C");
  const [speedUnit, setSpeedUnit] = useState("mph");
  const [measurementUnit, setMeasurementUnit] = useState("mm");

  const handleTempUnitChange = (newUnit: string) => {
    setTempUnit(newUnit);
  };

  const handleSpeedUnitChange = (newUnit: string) => {
    console.log("change...");
    setSpeedUnit(newUnit);
  };

  const handleMeasurementUnitChange = (newUnit: string) => {
    setMeasurementUnit(newUnit);
  };

  return (
    <ThemeProvider>
      <>
        <div className="flex flex-col gap-4" data-testid="app-test">
          <div
            className={` ${
              process.env.NODE_ENV === "development"
                ? "bg-primary"
                : "bg-success"
            } fixed top-0 right-8 z-50 p-2 text-xs rounded-b-lg`}
          >
            {process.env.NODE_ENV}
          </div>
          <main className="flex flex-col lg:gap-4 grow ">
            <div className="flex justify-between flex-col lg:flex-row bg-neutral-lightGrey dark:bg-neutral-darkGrey pt-8 pb-8 sticky top-0 z-40">
              <header className="flex gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-full w-12"
                  />
                  <div className="flex flex-col justify-center">
                    <small>Hi Nick!</small>
                    <h4>{currentDate}</h4>
                  </div>
                </div>
              </header>
              <section className="flex flex-row flex-wrap lg:flex-row lg:flex-nowrap gap-4 lg:gap-8 lg:items-center justify-between lg:justify-end pt-4 lg:py-4">
                <SearchLocation onSearch={handleSearch} />
                <UnitSwitcher
                  unit={tempUnit}
                  onUnitChange={handleTempUnitChange}
                  unitType="temperature"
                />
                <UnitSwitcher
                  unit={speedUnit}
                  onUnitChange={handleSpeedUnitChange}
                  unitType="speed"
                />
                <UnitSwitcher
                  unit={measurementUnit}
                  onUnitChange={handleMeasurementUnitChange}
                  unitType="measurements"
                />
                <div className="absolute top-8 right-0 lg:static">
                  <ModeSwitcher />
                </div>
              </section>
            </div>
            <DashboardPanelsContainer
              searchedLocation={weatherData || null}
              fetchWeather={fetchWeather}
              tempUnit={tempUnit}
              speedUnit={speedUnit}
              measurementUnit={measurementUnit}
            />
          </main>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
