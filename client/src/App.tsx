import {useEffect} from "react";

import ModeSwitcher from "./components/ModeSwitcher";
import UnitSwitchers from "./features/DataTools/UnitSwitchers.tool";
import SearchLocation from "./features/SearchLocation";
import DashboardPanelsContainer from "./features/DashboardPanels";
import {formatCurrentDate} from "./utils/dates.utils";
import useWeatherData from "./hooks/useWeatherData";
import "./App.css";

function App() {
  const {weatherData, fetchWeatherData} = useWeatherData();
  const currentDate = formatCurrentDate();

  useEffect(() => {
    fetchWeatherData("Chester");
  }, [fetchWeatherData]);

  const handleSearch = (city: string) => {
    fetchWeatherData(city);
  };

  return (
    <>
      <div className="flex flex-col gap-4" data-testid="app-test">
        <div
          className={` ${
            process.env.NODE_ENV === "development" ? "bg-primary" : "bg-success"
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
              <UnitSwitchers />
              <div className="absolute top-8 right-0 lg:static">
                <ModeSwitcher />
              </div>
            </section>
          </div>
          <DashboardPanelsContainer searchedLocation={weatherData || null} />
        </main>
      </div>
    </>
  );
}

export default App;
