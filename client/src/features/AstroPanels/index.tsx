import { AstroPanelProps } from '../../types/types';

const AstroPanels: React.FC<AstroPanelProps> = ({ searchedLocation }) => {
    const { forecast } = searchedLocation || {};
    const firstDay = forecast?.forecastday[0];
    const astro = firstDay?.astro;
    return (
        <div className='flex flex-col gap-4'>
            <div className='c-panel'>
                <h4>Sunrise</h4>
                <small>{astro?.sunrise}</small>
            </div>
            <div className='c-panel'>
                <h4>Sunset</h4>
                <small>{astro?.sunset}</small>
            </div>
        </div>
    );
};

export default AstroPanels;
