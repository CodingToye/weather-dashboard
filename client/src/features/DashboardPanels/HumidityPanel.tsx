import Panel from '../../containers/Panel';
import PieChance from '../../components/PieChance';
import Icon from '../../components/Icon';

interface HumidityPanelProps {
    humidity: number;
    colorTheme: string;
}

const HumidityPanel: React.FC<HumidityPanelProps> = ({
    humidity,
    colorTheme,
}) => {
    const data = [
        { name: 'Humidity', value: humidity },
        { name: 'Remaining', value: 100 - humidity },
    ];

    const humidityLevels = (x: number) => {
        if (x <= 55) {
            return {
                icon: 'humidity_low',
                text: 'low',
            };
        } else if (x > 55 && x <= 65) {
            return {
                icon: 'humidity_mid',
                text: 'mid',
            };
        } else {
            return {
                icon: 'humidity_high',
                text: 'high',
            };
        }
    };

    return (
        <Panel itemsCentered>
            <div className='flex flex-col items-center'>
                <header className='mb-2'>
                    <h1 className='text-sm'>Humidity</h1>
                </header>
                <div className='flex items-center text-neutral-darkGrey/50 dark:text-white/50'>
                    <Icon
                        iconName={humidityLevels(humidity).icon}
                        extraClasses='mr-2 text-base'
                    />
                    <span className='text-xs'>
                        {humidityLevels(humidity).text}
                    </span>
                </div>
            </div>
            <PieChance data={data} colorTheme={colorTheme} />
        </Panel>
    );
};

export default HumidityPanel;
