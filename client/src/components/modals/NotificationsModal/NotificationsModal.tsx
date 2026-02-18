// ./NotificationsModal/NotificationsModal.tsx
import React, {useCallback, useState, useEffect} from "react";

import AlertsPanel from "../../../features/DashboardPanels/AlertsPanel";
import {BaseModal} from "../BaseModal";
import {Alerts} from "../../../features/DashboardPanels/AlertsPanel/types";
import useWeatherData from "../../../hooks/useWeatherData";
import {useAuth} from "../../../context/authContext";
import {useModal} from "../../../context/modalContext";

export interface INotificationsModalProps {
  isOpen: boolean;
  alerts: Alerts | undefined;
  onClose?: () => void;
}

const NotificationsModal: React.FC<INotificationsModalProps> = ({
  onClose,
  isOpen,
}) => {
  const {modals} = useModal();
  const modalInfo = modals["NotificationsModal"];
  const [closeClicked, setCloseClicked] = useState(false);
  const {fetchWeatherData, weatherData} = useWeatherData();
  const {userDetails} = useAuth();

  useEffect(() => {
    if (userDetails && userDetails.location) {
      fetchWeatherData(userDetails.location);
    } else {
      fetchWeatherData("Chester");
    }
  }, [userDetails, fetchWeatherData]);

  useEffect(() => {
    if (modalInfo.onDismiss) {
      modalInfo.onDismiss();
    }
  }, [modalInfo]);

  const handleClose = useCallback(() => {
    setCloseClicked((prevCloseClicked) => !prevCloseClicked);
    setTimeout(() => {
      setCloseClicked(true);
      if (onClose) onClose();
    }, 500);
  }, [onClose]);

  return (
    <BaseModal
      title="Weather Alerts"
      subtitle="Click an alert for more information"
      show={isOpen}
      onClose={handleClose}
      closeClicked={closeClicked}
    >
      <AlertsPanel weatherAlerts={weatherData?.alerts} />
    </BaseModal>
  );
};

export default NotificationsModal;
