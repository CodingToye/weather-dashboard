interface BadgeProps {
    children: React.ReactNode;
    color: string;
    active?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ children, color, active }) => {
    return (
        <span
            className={`bg-${
                active ? color : 'color1 opacity-10'
            } p-1 rounded text-xs`}
        >
            {children}
        </span>
    );
};

export default Badge;
