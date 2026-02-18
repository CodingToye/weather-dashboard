import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {type User} from "firebase/auth";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import useWeatherData from "../hooks/useWeatherData";
import {SearchedLocation} from "../types/types";

export interface UserDetails {
  firstName?: string;
  email?: string;
  location?: string;
  uid?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  userDetails: UserDetails | null;
  setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
  handleLogout: () => void;
  showRegister: boolean;
  toggleShowRegister: () => void;
  weatherData: SearchedLocation | null;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const {weatherData, fetchWeatherData} = useWeatherData();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.reload().then(() => {
          setUser(currentUser);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshUser = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      auth.currentUser.reload().then(() => {
        setUser(auth.currentUser); // Ensure state is refreshed with updated user details
      });
    }
  };

  const toggleShowRegister = () => setShowRegister(!showRegister);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setUser(null);
      setUserDetails(null);
      fetchWeatherData("Chester");
    });
  };

  const value = {
    user,
    setUser,
    userDetails,
    setUserDetails,
    handleLogout,
    weatherData,
    showRegister,
    toggleShowRegister,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
