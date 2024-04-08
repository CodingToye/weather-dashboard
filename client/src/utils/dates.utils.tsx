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

export const getTime = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
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
