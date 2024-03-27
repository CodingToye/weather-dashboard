interface PanelProps {
    children: React.ReactNode;
    extraClasses?: string;
    flexDirection?: 'col' | 'row';
    itemsCentered?: boolean;
}

const Panel: React.FC<PanelProps> = ({
    children,
    extraClasses,
    flexDirection = 'col',
    itemsCentered,
}) => {
    return (
        <section
            className={`c-panel flex flex-${flexDirection} ${
                itemsCentered && 'items-center'
            } justify-between gap-4 ${extraClasses}`}
        >
            {children}
        </section>
    );
};

export default Panel;
