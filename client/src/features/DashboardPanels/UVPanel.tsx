import { CurrentWeather } from '../../types/types';
import Badge from '../../components/Badge';

interface UVProps {
    searchedLocation: CurrentWeather;
}

const getUVRating = (uvIndex: number, min: number, max: number): boolean => {
    return uvIndex >= min && uvIndex <= max;
};

const UVPanel: React.FC<UVProps> = ({ searchedLocation }) => {
    const { current } = searchedLocation || {};
    const uvIndex = current?.uv ?? 0;

    return (
        <section className='c-panel flex flex-col gap-4 justify-between'>
            <header>
                <h1>UV index</h1>
            </header>
            <div className='flex gap-2'>
                <Badge color='uv-low' active={getUVRating(uvIndex, 0, 2)}>
                    low
                </Badge>
                <Badge color='uv-moderate' active={getUVRating(uvIndex, 3, 5)}>
                    moderate
                </Badge>
                <Badge color='uv-high' active={getUVRating(uvIndex, 6, 7)}>
                    high
                </Badge>
                <Badge color='uv-veryHigh' active={getUVRating(uvIndex, 8, 10)}>
                    very high
                </Badge>
                <Badge color='uv-extreme' active={getUVRating(uvIndex, 11, 99)}>
                    extreme
                </Badge>
            </div>
        </section>
    );
};

export default UVPanel;
