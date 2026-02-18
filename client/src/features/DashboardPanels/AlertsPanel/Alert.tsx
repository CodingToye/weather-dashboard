// src/features/DashboardPanels/AlertPanel.tsx

/**
 * AlertPanel Component
 * Display an alert panel, specifically for Weather Alerts
 * As well as rendering the specific alert, it has an onClick event to dismiss the alert from the stack of alerts
 *
 * @component
 * @example
 * return (
 *  <AlertPanel
      alert={alert}
      key={index}
      onClick={(e) => handleRemove(e, alert)}
    />
 * )
 */

import React, {useState, useRef, useEffect} from "react";
import {useSpring, animated} from "react-spring";

import Icon from "../../../components/Icon";
import {getFullDate} from "../../../utils/dates.utils";

import {Alert} from "./types";

/** Properties for the AlertPanel component
 *
 * Provides detailed information about a weather alert and controls for user interaction.
 *
 * @interface
 * @prop {Alert} alert - The alert object containing information like category, event, effective date, and expiration date.
 * @prop {function} onClick - Handler for the click event to dismiss the alert. Receives the click event and the alert object as arguments.
 */

export interface AlertProps {
  /** The alert object containing detailed information to be displayed. */
  alert: Alert;
  /**
   * Function to handle the dismissal of an alert.
   * @param e - The click event on the alert dismissal icon.
   * @param alert - The alert object that is being dismissed.
   */
  onClick: (e: React.MouseEvent, alert: Alert) => void;
}

const AlertPanel: React.FC<AlertProps> = ({alert, onClick}) => {
  const [minimisePanel, setMinimisePanel] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(0); // Add state to track panel height

  // Adjust to recalculate height on each render
  useEffect(() => {
    if (panelRef.current) {
      setPanelHeight(panelRef.current.scrollHeight);
    }
  }, [minimisePanel, alert]); // Add alert to dependencies if its content can change and affect height

  const expandCollapseStyle = useSpring({
    height: minimisePanel ? 0 : panelHeight,
    opacity: minimisePanel ? 0 : 1,
    overflow: minimisePanel ? "hidden" : "visible",
    config: {mass: 2, tension: 300, friction: 40},
  });

  const togglePanel = () => {
    setMinimisePanel(!minimisePanel);
  };

  return (
    <div
      className="text-sm flex flex-col bg-primary dark:bg-neutral-darkGrey text-white dark:text-neutral-lightGrey  rounded cursor-pointer shadow-lg"
      onClick={togglePanel}
    >
      <div className="flex flex-row justify-between items-center font-bold p-4">
        <div className="flex flex-col">
          <p>
            Category: <small>{alert.category}</small>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Icon
            iconName="cancel"
            extraClasses="text-base hover:text-primary text-white transition"
            ariaLabel="Remove alert icon"
            onClick={(e) => onClick(e, alert)}
          />
        </div>
      </div>
      <animated.div
        style={expandCollapseStyle}
        className="bg-neutral-paleGrey dark:bg-neutral-lightGrey text-neutral-darkGrey rounded-b"
      >
        <section ref={panelRef} className="p-4">
          <h1 className="text-base mb-4">{alert.event}</h1>
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <Icon
                iconName="watch"
                extraClasses="text-base mr-1"
                ariaLabel="Alert effective icon"
              />
              <p>{getFullDate(alert.effective)}</p>
            </div>
            <div className="flex items-center">
              <Icon
                iconName="watch_off"
                extraClasses="text-base mr-1"
                ariaLabel="Alert expires icon"
              />
              <p>{getFullDate(alert.expires)}</p>
            </div>
          </div>

          <small>Reported by {alert.headline}</small>
        </section>
      </animated.div>
    </div>
  );
};

export default AlertPanel;
