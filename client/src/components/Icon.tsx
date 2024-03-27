import React from 'react';

interface IconProps {
    iconName: string;
    extraClasses?: string;
    onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ iconName, extraClasses, onClick }) => {
    return (
        <span
            className={`material-symbols-outlined ${extraClasses}`}
            onClick={onClick}
        >
            {iconName}
        </span>
    );
};

export default Icon;
