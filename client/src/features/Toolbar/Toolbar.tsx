import {useState, useEffect} from "react";

import {formatCurrentDate} from "../../utils/dates.utils";
import LocalTime from "../../components/LocalTime";
import {useAuth} from "../../context/authContext";
import Icon from "../../components/Icon";
import {useModal} from "../../context/modalContext";
import ModeSwitcher from "../../components/ModeSwitcher";
import logo from "../../logo.png";
import {SearchedLocation} from "../../types/types";
import {getActiveAlertCount} from "../../utils/alerts.utils";

export interface ToolbarProps {
  searchedLocation: SearchedLocation | null;
}

const Toolbar: React.FC<ToolbarProps> = ({searchedLocation}) => {
  console.log(searchedLocation);
  const {userDetails, handleLogout} = useAuth();
  const currentDate = formatCurrentDate();
  const {openModal} = useModal();
  const timezone = searchedLocation?.location?.tz_id;

  const [alertCount, setAlertCount] = useState(() => {
    return searchedLocation?.alerts?.alert
      ? getActiveAlertCount(searchedLocation?.alerts?.alert)
      : 0;
  });

  const refreshAlertCount = () => {
    if (searchedLocation?.alerts?.alert) {
      const newCount = getActiveAlertCount(searchedLocation.alerts.alert);
      setAlertCount(newCount);
    } else {
      setAlertCount(0);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      refreshAlertCount();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [searchedLocation]);

  return (
    <div className="sticky top-0 z-40 pb-4 lg:pb-0  bg-neutral-paleGrey dark:bg-neutral-darkGrey">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center p-3 px-8">
        <div className="flex items-center justify-center gap-4 ">
          <img src={logo} className="w-16 mt-1 animate-smoothPulse" />

          <div className="lg:flex flex-col items-start justify-center hidden">
            <p className="capitalize text-xs">
              Hi {userDetails ? userDetails?.firstName : "Guest"}
            </p>
            <p className="text-base">{currentDate}</p>
            <LocalTime timezone={timezone} />
          </div>
        </div>
        <div className="flex gap-4 order-1 lg:order-2">
          <div className="flex items-center gap-4 rounded-full shadow dark:shadow-xl bg-white dark:bg-neutral-midGrey border-t border-white/10 px-4 py-2">
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center"
            >
              <Icon
                iconName="logout"
                extraClasses="text-lg dark:hover:text-white/50 hover:text-primary transition"
              />
            </button>
            <button
              title="Settings"
              className="flex items-center"
              onClick={() => openModal("SettingsModal")}
            >
              <Icon
                iconName="settings"
                extraClasses="text-lg dark:hover:text-white/50 hover:text-primary transition"
              />
            </button>
            <button
              className="relative"
              onClick={() => {
                openModal("NotificationsModal", refreshAlertCount);
              }}
            >
              <Icon
                iconName="notifications"
                extraClasses={`text-lg dark:hover:text-white/50 hover:text-primary transition ${
                  alertCount > 0 && "animate-shake"
                }`}
              />
              {alertCount > 0 && (
                <div className="bg-primary text-white rounded-full p-2 text-micro w-notification h-notification flex items-center justify-center absolute -top-1 left-2">
                  {alertCount}
                </div>
              )}
            </button>
            <div className="lg:static">
              <ModeSwitcher />
            </div>
          </div>
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-full w-12 hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
