// src/features/DashboardPanels/AlertsPanel/alert.utils.tsx

import {Alert} from "../features/DashboardPanels/AlertsPanel/types";

export const getAlertId = (alert: Alert): string => {
  if (!alert || typeof alert !== "object") {
    console.error("Invalid alert data provided for ID generation", alert);
    return "invalid-alert-data";
  }
  const eventId = alert.event ? alert.event.replace(/\s+/g, "-") : "no-event";
  const effectiveId = alert.effective
    ? alert.effective.replace(/\s+/g, "-")
    : "no-effective";
  const expiresId = alert.expires
    ? alert.expires.replace(/\s+/g, "-")
    : "no-expires";

  return `${eventId}-${effectiveId}-${expiresId}`;
};

export const dismissAlert = (alert: Alert) => {
  const alertId = getAlertId(alert);
  if (alertId === "invalid-alert-data") {
    console.error("Attempeted to dismiss an alert with invalid data", alert);
    return;
  }
  const dismissedAlerts = JSON.parse(
    localStorage.getItem("dismissedAlerts") || "[]"
  );
  if (!dismissedAlerts.includes(alertId)) {
    dismissedAlerts.push(alertId);
    localStorage.setItem("dismissedAlerts", JSON.stringify(dismissedAlerts));
  }
};

export const loadAlerts = (alerts: Alert[]): Alert[] => {
  const dismissedAlerts = new Set(
    JSON.parse(localStorage.getItem("dismissedAlerts") || "[]")
  );
  console.log(typeof dismissedAlerts);
  return alerts.filter((alert) => !dismissedAlerts.has(getAlertId(alert)));
};

export const getActiveAlertCount = (alerts: Alert[]): number => {
  const dismissedAlerts = new Set(
    JSON.parse(localStorage.getItem("dismissedAlerts") || "[]")
  );
  return alerts.filter((alert) => !dismissedAlerts.has(getAlertId(alert)))
    .length;
};
