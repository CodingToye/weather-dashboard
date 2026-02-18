// src/features/DashboardPanels/AlertPanels.tsx

/**
 * AlertsPanel Component
 * Display an alert panel, specifically for Weather Alerts
 * As well as rendering the specific alert, it has an onClick event to dismiss the alert from the stack of alerts
 *
 * @component
 * @example
 * const hasAlerts = !!alerts?.alert?.length;
 * return (
 *  {hasAlerts && <AlertsPanel weatherAlerts={alerts} />}
 * )
 */

import {useState, useEffect} from "react";

import {
  loadAlerts,
  dismissAlert,
  getActiveAlertCount,
} from "../../../utils/alerts.utils";

import {Alerts, Alert} from "./types";
import AlertPanel from "./Alert";

/**
 * Properties for the AlertsPanel Component
 *
 * Manages the display of weather alerts, allowing individual alerts to be dismissed and offering a button to restore dismissed alerts.
 *
 * @interface
 * @prop {Alerts} weatherAlerts - An optional object containing an array of alert data to be displayed.
 */

export interface AlertsPanelProps {
  /** Data containing all the current weather alerts for the searched location */
  weatherAlerts?: Alerts;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({weatherAlerts}) => {
  const activeAlerts = loadAlerts(weatherAlerts?.alert ?? []);
  console.log(activeAlerts);
  const [alerts, setAlerts] = useState<Alert[]>(activeAlerts);

  useEffect(() => {
    if (weatherAlerts?.alert) {
      setAlerts(loadAlerts(weatherAlerts.alert));
    }
  }, [weatherAlerts]);
  const handleRemove = (e: React.MouseEvent, alertToRemove: Alert) => {
    e.stopPropagation();
    if (!alertToRemove) {
      console.error("Attempted to remove an undefined alert");
      return;
    }
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert !== alertToRemove)
    );
    dismissAlert(alertToRemove);
  };

  return (
    <>
      <section data-testid="alerts-panel-test">
        <header className="mb-2 text-center">
          <h1 className="text-sm text-primary">
            There {getActiveAlertCount(alerts) == 0 ? "are" : "is currently"}{" "}
            {getActiveAlertCount(alerts)}{" "}
            {getActiveAlertCount(alerts) == 1 ? "alert" : "alerts"}
          </h1>
        </header>
        <section className="flex flex-col gap-4">
          {alerts.map((alert, index) => (
            <AlertPanel
              alert={alert}
              key={index}
              onClick={(e) => handleRemove(e, alert)}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default AlertsPanel;
