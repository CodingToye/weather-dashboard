export const formatCurrentDate = (): string => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
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

export const getDay = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
    });
};

export const getHour = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        hour12: false,
    });
};
