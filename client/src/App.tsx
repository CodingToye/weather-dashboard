import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Modal from "react-modal";

import Panel from "./components/Panel";
import UnitSwitchers from "./features/DataTools/UnitSwitchers.tool";
import Loader from "./components/Loader";
import {db} from "./firebase";
import DashboardPanelsContainer from "./features/DashboardPanels";
import useWeatherData from "./hooks/useWeatherData";
import Authentication from "./features/Authentication";
import {useAuth, UserDetails} from "./context/authContext";
import {SearchedLocation} from "./types/types";
import Toolbar from "./features/Toolbar/Toolbar";
import SearchLocation from "./features/SearchLocation";

import "./App.css";

Modal.setAppElement("#root");

export interface AppProps {
  /** searchedLocation data object */
  searchedLocation: SearchedLocation | null;
}

function App() {
  const {user, userDetails, setUserDetails} = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const {fetchWeatherData, weatherData} = useWeatherData();

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data() as UserDetails;
          setUserDetails({
            uid: currentUser.uid,
            firstName: data.firstName,
            email: data.email,
            location: data.location,
          });
        } else {
          console.log("No such document");
        }
      }
      setLoading(false);
    });
  }, [setUserDetails]);

  const handleSearch = async (city: string): Promise<void> => {
    try {
      await fetchWeatherData(city);
    } catch (error) {
      console.error("Searcherror:", error);
    }
  };

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

  const MainApp = () => {
    return (
      <div className="flex flex-col gap-4" data-testid="app-test">
        <main className="flex flex-col lg:gap-0 grow ">
          <Toolbar searchedLocation={weatherData || null} />
          <div className="px-8 mb-8">
            <Panel>
              <div className="flex flex-row flex-wrap lg:flex-row lg:flex-nowrap gap-4 lg:gap-8 lg:items-center justify-between">
                <SearchLocation onSearch={handleSearch} />
                <UnitSwitchers />
              </div>
            </Panel>
          </div>
          <DashboardPanelsContainer searchedLocation={weatherData || null} />
        </main>
      </div>
    );
  };

  // return <>{!user?.emailVerified ? <Authentication /> : <MainApp />}</>;
  return <MainApp />;
}

export default App;
