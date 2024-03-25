import GaugeChart from 'react-gauge-chart';

interface HumidityPanelProps {
    humidity: number;
}

const HumidityPanel: React.FC<HumidityPanelProps> = ({ humidity }) => {
    const humidityDec = humidity ? humidity / 100 : 0;
    return (
        <section className='c-panel'>
            <h1>Humidity</h1>
            <GaugeChart
                id='humidity-chart'
                nrOfLevels={30}
                colors={['#f2651d']}
                needleColor={'#1e1f24'}
                needleBaseColor={'#1e1f24'}
                arcWidth={0.1}
                percent={humidityDec}
            />
        </section>
    );
};

export default HumidityPanel;
