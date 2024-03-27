import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface ModeSwitcherProps {
    colorTheme: string;
    setTheme: (theme: string) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
    colorTheme,
    setTheme,
}) => {
    const toggleTheme = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    };

    return (
        <>
            <DarkModeSwitch
                checked={colorTheme === 'light'}
                onChange={toggleTheme}
            />
        </>
    );
};

export default ModeSwitcher;
