// src/utils/data.utils.tsx

export const formatCurrentDate = (): string => {
  const currentDate = new Date();
  const day = currentDate.getUTCDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const weekday = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });
  const month = currentDate.toLocaleDateString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  const year = currentDate.getUTCFullYear();
  return `${weekday}, ${day}${ordinalSuffix} ${month} ${year}`;
};

export const getShortDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const month = dateObj.toLocaleDateString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  return `${day}${ordinalSuffix} ${month}`;
};

export const getToday = new Date().toISOString().slice(0, 10);

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getFullDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const weekday = dateObj.toLocaleDateString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });
  const month = dateObj.toLocaleDateString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  const year = dateObj.getUTCFullYear();
  return `${weekday}, ${day}${ordinalSuffix} ${month} ${year}`;
};

export const getTime = (date?: string, military?: boolean) => {
  if (!date) {
    return "Time not available";
  }
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: military,
  });
};

export const getLocalTime = (timezone?: string) => {
  const date = new Date();
  let time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
    timeZone: timezone,
  });

  time = time.replace(/^00/, "12");

  return time;
};

export const getAnimatedTime = (
  date?: string,
  military = false
): {hour: string; minute: string} => {
  if (!date) {
    return {hour: "N/A", minute: "N/A"};
  }
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric", // Always "2-digit" or "numeric" as exact string literals
    minute: "2-digit",
    hour12: !military, // Converts military time boolean to proper hour12 value
  };
  const timeString = dateObj.toLocaleTimeString("en-GB", options);
  const parts = timeString.split(":");
  return {
    hour: parts[0],
    minute: parts[1],
  };
};

export const getDay = (date: string, short: boolean) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-GB", {
    weekday: short ? "short" : "long",
  });
};

export const getHour = (date: string, modernTime: boolean) => {
  const dateObj = new Date(date);
  const timeString = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    hour12: modernTime,
  });
  const formattedTimeString = timeString.replace(/^0*|(\s+)/g, "");
  return formattedTimeString;
};

export const getHourLabel = (time: string) => {
  const dateObj = new Date(time);
  const timeString = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    hour12: false,
  });
  const hour = parseInt(timeString);

  if (hour >= 6 && hour < 12) {
    return "Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Afternoon";
  } else if (hour >= 18 && hour < 24) {
    return "Evening";
  } else {
    return "Night";
  }
};

export const getCurrentHourLabel = (hour: number) => {
  if (hour >= 6 && hour < 12) {
    return "Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Afternoon";
  } else if (hour >= 18 && hour < 24) {
    return "Evening";
  } else {
    return "Night";
  }
};

export function parseTimeString(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function calculateTimeToNextAstroEvent(
  currentTimeStr: string,
  astroEventTimeStr: string
): string {
  const currentTime = parseTimeString(currentTimeStr);
  const sunriseTime = parseTimeString(astroEventTimeStr);

  if (sunriseTime <= currentTime) {
    sunriseTime?.setDate(sunriseTime.getDate() + 1);
  }

  const diffMs = sunriseTime?.getTime() - currentTime?.getTime();

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours} hours and ${diffMinutes} minutes`;
}

export function convertStringToDate(timeString: string): Date {
  console.log("convertStringToDate: TIMESTRING:", timeString);
  const [timePart, period] = timeString.split(" ");
  const [hoursInput, minutes] = timePart.split(":").map(Number);
  const hours =
    period.toLowerCase() === "pm" && hoursInput < 12
      ? hoursInput + 12
      : period.toLowerCase() === "am" && hoursInput === 12
      ? 0
      : hoursInput;

  const dateTime = new Date();
  dateTime.setHours(hours, minutes, 0, 0);
  return dateTime;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} minute${
    remainingMinutes !== 1 ? "s" : ""
  }`;
}

export function calculateAndFormatDifference(localtimeString: string): string {
  const sunriseTime = convertStringToDate(localtimeString);
  const currentTime = new Date();

  const diff = currentTime.getTime() - sunriseTime.getTime();
  const diffMinutes = Math.floor(Math.abs(diff) / 60000);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes & 60;

  return `${hours} hours ${minutes} minutes`;
}

export function convertStringTo24HourDate(
  timeString: string,
  baseDate: Date = new Date()
): Date {
  const [timePart, period] = timeString.split(" ");
  const [hoursInput, minutes] = timePart.split(":").map(Number);
  const hours =
    period.toLowerCase() === "pm" && hoursInput !== 12
      ? hoursInput + 12
      : period.toLowerCase() === "am" && hoursInput === 12
      ? 0
      : hoursInput;

  const dateTime = new Date(baseDate);
  dateTime.setHours(hours, minutes, 0, 0);
  return dateTime;
}

export function calculateTimeDifference24Hour(
  sunriseTime: Date,
  currentTime: Date
): string {
  // Adjust the date component if necessary
  if (sunriseTime > currentTime) {
    sunriseTime.setDate(sunriseTime.getDate() - 1);
  }

  const diff = currentTime.getTime() - sunriseTime.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} hours and ${minutes} minutes`;
}

export function convertTo24Hour(timeStr: string): string {
  const [time, modifier] = timeStr.split(" ");
  const [hoursStr, minutes] = time.split(":");
  let hours = parseInt(hoursStr, 10); // Convert hours to a number immediately

  if (hours === 12) {
    hours = 0; // Adjust the hour for the 12-hour clock edge case
  }

  if (modifier === "PM") {
    hours += 12; // Convert PM time to 24-hour format
  }

  // Ensuring hours are two digits
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes}`; // Return the time in HH:MM format
}
