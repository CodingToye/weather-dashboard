import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

interface LocalMapProps {
    lat: number;
    lng: number;
}

const LocalMap: React.FC<LocalMapProps> = ({ lat, lng }) => {
    const position = { lat: lat, lng: lng };

    return (
        <APIProvider apiKey={`${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}>
            <Map defaultCenter={position} defaultZoom={10}>
                <Marker position={position} />
            </Map>
        </APIProvider>
    );
};

export default LocalMap;
