import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import logo from "./logo.png";
import Loader from "./components/Loader";
import {db} from "./firebase";
import ModeSwitcher from "./components/ModeSwitcher";
import UnitSwitchers from "./features/DataTools/UnitSwitchers.tool";
import Icon from "./components/Icon";
import SearchLocation from "./features/SearchLocation";
import DashboardPanelsContainer from "./features/DashboardPanels";
import {formatCurrentDate} from "./utils/dates.utils";
import useWeatherData from "./hooks/useWeatherData";
import Authentication from "./features/Authentication";
import {useAuth} from "./context/authContext";

import "./App.css";

// setLogLevel("debug");

function App() {
  const {user, userDetails, setUserDetails, handleLogout} = useAuth();
  const [loading, setLoading] = useState(true);
  const {fetchWeatherData, weatherData} = useWeatherData();
  const currentDate = formatCurrentDate();

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        } else {
          console.log("No such document");
        }
      }
      setLoading(false);
    });
  }, [setUserDetails]);

  useEffect(() => {
    if (userDetails && userDetails.location) {
      fetchWeatherData(userDetails.location);
    } else {
      fetchWeatherData("Chester");
    }
  }, [userDetails, fetchWeatherData]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader loaderColor="#f2651d" message="Loading dashboard..." />
      </div>
    );
  }

  const handleSearch = (city: string) => {
    fetchWeatherData(city);
  };

  return (
    <>
      {!user ? (
        <Authentication />
      ) : (
        <div className="flex flex-col gap-4" data-testid="app-test">
          <div
            className={` ${
              process.env.NODE_ENV === "development"
                ? "bg-primary text-white"
                : "bg-success text-white"
            } fixed top-0 right-8 z-50 p-2 text-xs rounded-b-lg`}
          >
            {process.env.NODE_ENV}
          </div>
          <main className="flex flex-col lg:gap-4 grow ">
            <div className="flex justify-between flex-col lg:flex-row bg-neutral-lightGrey dark:bg-neutral-darkGrey p-8 sticky top-0 z-40">
              <header className="flex gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <img src={logo} className="w-24" />
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-full w-12"
                  />

                  <div className="flex flex-col items-start justify-center">
                    <small className="capitalize">
                      Hi {userDetails?.firstName}!
                    </small>
                    <h4 className="text-base">{currentDate}</h4>
                    {/* <p>{userDetails?.location}</p> */}
                  </div>
                </div>
              </header>
              <section className="flex flex-row flex-wrap lg:flex-row lg:flex-nowrap gap-4 lg:gap-8 lg:items-center justify-between lg:justify-end pt-4 lg:py-4">
                <SearchLocation onSearch={handleSearch} />
                <UnitSwitchers />
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="flex items-center"
                >
                  <Icon iconName="logout" extraClasses="text-xlg" />
                </button>
                <div className="absolute top-8 right-0 lg:static">
                  <ModeSwitcher />
                </div>
              </section>
            </div>
            <DashboardPanelsContainer searchedLocation={weatherData || null} />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
