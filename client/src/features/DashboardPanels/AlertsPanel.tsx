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

import Panel from "../../components/Panel";
import {Alerts, Alert} from "../../types/types";
import Icon from "../../components/Icon";
import Button from "../../components/Button";

import AlertPanel from "./AlertPanel";

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
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [originalAlerts, setOriginalAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (weatherAlerts?.alert) {
      setAlerts(weatherAlerts.alert);
      setOriginalAlerts(weatherAlerts.alert);
    }
  }, [weatherAlerts]);
  const handleRemove = (e: React.MouseEvent, alertToRemove: Alert) => {
    e.stopPropagation();
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert !== alertToRemove)
    );
  };

  const handleRestore = () => {
    setAlerts(originalAlerts);
  };

  const refreshAlertsAvailable = alerts.length < originalAlerts.length;

  return (
    <>
      <Panel
        extraClasses="bg-neutral-midGrey dark:bg-neutral-midGrey relative"
        dataTestId="alerts-panel-test"
      >
        <header className="flex items-center mb-2">
          <Icon
            iconName="crisis_alert"
            extraClasses="mr-2 text-white"
            ariaLabel="Local Weather Alert icon"
          />
          <h1 className="text-sm text-white">Local Weather Alerts</h1>
        </header>
        <div className="absolute top-4 right-4">
          <Button
            onClick={handleRestore}
            title="Click to refresh alerts"
            isDisabled={!refreshAlertsAvailable}
            extraClasses={`${refreshAlertsAvailable ? "" : "opacity-50"}`}
          >
            <Icon
              iconName="refresh"
              extraClasses="text-sm"
              ariaLabel="Weather Alerts refresh icon"
            />
          </Button>
        </div>

        <section className="flex flex-col gap-4">
          {alerts.map((alert, index) => (
            <AlertPanel
              alert={alert}
              key={index}
              onClick={(e) => handleRemove(e, alert)}
            />
          ))}
        </section>
      </Panel>
    </>
  );
};

export default AlertsPanel;
