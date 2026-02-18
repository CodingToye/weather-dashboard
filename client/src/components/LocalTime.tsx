import React, {useState, useEffect} from "react";

import {getLocalTime} from "../utils/dates.utils";

interface LocalTimeProps {
  timezone?: string;
}

const LocalTime: React.FC<LocalTimeProps> = ({timezone}) => {
  const [time, setTime] = useState(() => getLocalTime(timezone));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getLocalTime(timezone));
    }, 1000); // Update every second
    return () => clearInterval(intervalId);
  }, [timezone]);

  return (
    <div>
      <p className="text-xs">
        {time} <small className="text-white/50">{timezone}</small>
      </p>
    </div>
  );
};

export default LocalTime;
