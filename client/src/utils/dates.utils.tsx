export const formatCurrentDate = (): string => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const getToday = new Date().toISOString().slice(0, 10);

export const getShortDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
    });
};

export const getTime = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

export const getDay = (date: string, short: boolean) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        weekday: short ? 'short' : 'long',
    });
};

export const getHour = (date: string, modernTime: boolean) => {
    const dateObj = new Date(date);
    const timeString = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        hour12: modernTime,
    });
    const formattedTimeString = timeString.replace(/^0*|(\s+)/g, '');
    return formattedTimeString;
};

export const getHourLabel = (time: string) => {
    const dateObj = new Date(time);
    const timeString = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        hour12: false,
    });
    const hour = parseInt(timeString);

    if (hour >= 6 && hour < 12) {
        return 'Morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Afternoon';
    } else if (hour >= 18 && hour < 24) {
        return 'Evening';
    } else {
        return 'Night';
    }
};

export const getCurrentHourLabel = (hour: string) => {
    const hourAsNumber = parseInt(hour);
    if (hourAsNumber >= 6 && hourAsNumber < 12) {
        return 'Morning';
    } else if (hourAsNumber >= 12 && hourAsNumber < 18) {
        return 'Afternoon';
    } else if (hourAsNumber >= 18 && hourAsNumber < 24) {
        return 'Evening';
    } else {
        return 'Night';
    }
};
