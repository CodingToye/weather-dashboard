import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {type User} from "firebase/auth";
import {getAuth} from "firebase/auth";

import useWeatherData from "../hooks/useWeatherData";

interface UserDetails {
  firstName?: string;
  email?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  userDetails: UserDetails | null;
  setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
  handleLogout: () => void;
  showRegister: boolean;
  toggleShowRegister: () => void;
  weatherData: null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const {weatherData, fetchWeatherData} = useWeatherData();

  const toggleShowRegister = () => setShowRegister(!showRegister);

  const handleLogout = () => {
    // console.log("handleLogout...");
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
