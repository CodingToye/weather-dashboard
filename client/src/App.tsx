import {useState, useEffect} from "react";
import useDarkMode from "./hooks/useDarkMode";
import ModeSwitcher from "./components/ModeSwitcher";
import UnitSwitcher from "./features/DashboardPanels/UnitSwitcher";
import SearchLocation from "./features/SearchLocation";
import DashboardPanels from "./features/DashboardPanels";
// import AstroPanels from './features/AstroPanels';
import {formatCurrentDate} from "./utils/dates.utils";
import {CurrentWeather} from "./types/types";
import "./App.css";

function App() {
  const [colorTheme, setTheme] = useDarkMode();
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const currentDate = formatCurrentDate();

  useEffect(() => {
    fetchWeather("Chester");
  }, []);

  const fetchWeather = async (city: string) => {
    try {
      const timestamp = Date.now();
      const currentResponse = await fetch(
        `http://localhost:5000/api/current?city=${city}&_=${timestamp}`
      );
      if (currentResponse.ok) {
        const currentData = await currentResponse.json();
        setWeatherData(currentData);
      } else {
        console.error(
          "Failed to fetch currentweather data:",
          currentResponse.statusText
        );
      }

      const forecastResponse = await fetch(
        `http://localhost:5000/api/forecast?city=${city}&_=${timestamp}`
      );
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        // console.log(forecastData);
        setWeatherData((prevData) => {
          if (!prevData) {
            return null;
          }
          return {
            ...prevData,
            forecast: forecastData.forecast,
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
  const [speedUnit, setSpeedUnit] = useState("mp/h");
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
    <>
      <div className="flex gap-4" data-testid="app-test">
        <main className="flex flex-col lg:gap-4 grow ">
          <div className="flex justify-between flex-col lg:flex-row bg-neutral-lightGrey dark:bg-neutral-darkGrey pt-8 pb-8 sticky top-0 z-50">
            <header className="flex gap-4 justify-between">
              <div className="flex gap-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-full w-12 h-fit"
                />
                <div className="flex flex-col justify-center">
                  <small>Hi Nick</small>
                  <h4>{currentDate}</h4>
                  <small>TEST XYZ</small>
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
                <ModeSwitcher colorTheme={colorTheme} setTheme={setTheme} />
              </div>
            </section>
          </div>
          <DashboardPanels
            searchedLocation={weatherData || null}
            fetchWeather={fetchWeather}
            colorTheme={colorTheme}
            tempUnit={tempUnit}
            speedUnit={speedUnit}
            measurementUnit={measurementUnit}
          />
        </main>
        {/* <aside className='flex flex-col gap-4'>
                    <section>
                        <AstroPanels searchedLocation={weatherData || null} />
                    </section>
                </aside> */}
      </div>
    </>
  );
}

export default App;
