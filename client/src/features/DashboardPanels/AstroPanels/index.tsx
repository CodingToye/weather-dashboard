import {SearchedLocation} from "../../../types/types";

import SunPanel from "./SunPanel";
import MoonPanel from "./MoonPanel";

export interface AstroPanelProps {
  searchedLocation: SearchedLocation;
}

const AstroPanel: React.FC<AstroPanelProps> = ({searchedLocation}) => {
  const {forecast, location, current} = searchedLocation || {};
  const {
    sunrise,
    sunset,
    moonrise,
    moonset,
    moon_phase,
    is_moon_up,
    is_sun_up,
    moon_illumination,
  } = forecast.forecastday[0].astro || {};

  const {uv} = current || {};

  console.log(forecast.forecastday[0].astro);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <SunPanel
        sunrise={sunrise}
        sunset={sunset}
        location={location}
        is_sun_up={is_sun_up}
        uv={uv}
      />
      <MoonPanel
        moonrise={moonrise}
        moonset={moonset}
        moon_phase={moon_phase}
        moon_illumination={moon_illumination}
        is_moon_up={is_moon_up}
        location={location}
      />
    </div>
  );
};

export default AstroPanel;
