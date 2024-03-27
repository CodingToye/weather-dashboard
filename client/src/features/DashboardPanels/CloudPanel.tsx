import Panel from '../../containers/Panel';
import PieChance from '../../components/PieChance';
import Icon from '../../components/Icon';
import { CurrentWeather } from '../../types/types';

interface CloudPanelProps {
    searchedLocation: CurrentWeather;
    colorTheme: string;
}

const CloudPanel: React.FC<CloudPanelProps> = ({
    searchedLocation,
    colorTheme,
}) => {
    const { current } = searchedLocation || {};
    const data = [
        { name: 'Cloud coverage', value: current.cloud },
        { name: 'Remaining', value: 100 - current.cloud },
    ];

    const cloudLevels = (x: number) => {
        if (x === 0) {
            return {
                text: 'sunny day',
                icon: 'sunny',
            };
        } else if (x > 0 && x <= 25) {
            return {
                text: 'patchy clouds',
                icon: 'partly_cloudy_day',
            };
        } else if (x > 25 && x <= 75) {
            return {
                text: 'bit murky',
                icon: 'cloud',
            };
        } else {
            return {
                text: 'skies are grey',
                icon: 'filter_drama',
            };
        }
    };

    return (
        <Panel itemsCentered>
            <div className='flex flex-col items-center'>
                <header className='mb-2'>
                    <h1 className='text-sm'>Cloud cover</h1>
                </header>
                <div className='flex items-center text-neutral-darkGrey/50 dark:text-white/50'>
                    <Icon
                        iconName={cloudLevels(current.cloud).icon}
                        extraClasses='mr-2 text-base'
                    />
                    <span className='text-xs'>
                        {cloudLevels(current.cloud).text}
                    </span>
                </div>
            </div>
            <PieChance data={data} colorTheme={colorTheme} />
        </Panel>
    );
};

export default CloudPanel;
