// src/features/Authentication/index.tsx

import React, {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import {useAuth} from "../../context/authContext";
import Panel from "../../components/Panel";
import logo from "../../logo_tray.png";

import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";

const Authentication = () => {
  const {user, setUser, showRegister, toggleShowRegister} = useAuth();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (user) {
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Panel extraClasses="p-6">
        <header className="mb-2 flex flex-col items-center">
          <img src={logo} className="-mt-24 mb-4 w-32" />
          <h1 className="text-lg">
            {showRegister ? "Register An Account" : "Welcome Back"}
          </h1>
          <p
            onClick={toggleShowRegister}
            className="dark:text-white/50 text-neutral-midGrey text-xs cursor-pointer"
          >
            {showRegister ? "Already have an account?" : "Need an account?"}
          </p>
        </header>
        {showRegister ? (
          <RegisterUser onRegistered={toggleShowRegister} />
        ) : (
          <LoginUser />
        )}
      </Panel>
    </div>
  );
};

export default Authentication;
