interface BadgeProps {
    children: React.ReactNode;
    bgColor: string;
    textColor: string;
    active?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    bgColor,
    textColor,
    active,
}) => {
    return (
        <span
            className={`bg-${active ? bgColor : ' opacity-10'} text-${
                active ? textColor : 'darkGrey opacity-50'
            } p-1 rounded text-xs`}
        >
            {children}
        </span>
    );
};

export default Badge;
