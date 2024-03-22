import React from 'react';

interface IconProps {
    iconName: string;
    extraClasses?: string;
}

const Icon: React.FC<IconProps> = ({ iconName, extraClasses }) => {
    return (
        <span className={`material-symbols-outlined ${extraClasses}`}>
            {iconName}
        </span>
    );
};

export default Icon;
