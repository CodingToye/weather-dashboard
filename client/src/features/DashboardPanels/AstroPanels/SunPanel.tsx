import Panel from "../../../components/Panel";
import Icon from "../../../components/Icon";
import {
  getTime,
  convertTo24Hour,
  calculateTimeToNextAstroEvent,
} from "../../../utils/dates.utils";
import {Location} from "../../../types/types";
import Header from "../../../components/Header";

export interface SunPanelProps {
  sunrise?: string;
  sunset?: string;
  is_sun_up?: number;
  uv?: number;
  location: Location;
}

const SunPanel: React.FC<SunPanelProps> = ({
  sunrise,
  sunset,
  is_sun_up,
  uv,
  location,
}) => {
  const localTimeOnly = getTime(location.localtime);
  const sunriseTime = convertTo24Hour(sunrise || "12:00 AM");
  const sunsetTime = convertTo24Hour(sunset || "12:00 AM");
  return (
    <Panel>
      <div>
        <div className="flex justify-between">
          <Header heading="Sun" />
          <Icon
            iconName="sunny"
            extraClasses={`text-sun ${
              is_sun_up === 1 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="flex flex-col gap-8 text-neutral-darkGrey/50 dark:text-white/50">
          <p className="text-sm text-white/50">
            The sun currently has a UV index of {uv}.
          </p>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon iconName="wb_twilight" extraClasses="text-base -mt-1" />
              <span className="text-sm text-white">Sunrise</span>
              <span className="text-sm lowercase">{sunrise}</span>
            </div>
            <span className="text-xs">
              {calculateTimeToNextAstroEvent(localTimeOnly, sunriseTime)} to
              next sunrise
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon iconName="water_lux" extraClasses="text-base -mt-1" />
              <span className="text-sm text-white">Sunset</span>
              <span className="text-sm lowercase">{sunset}</span>
            </div>
            <span className="text-xs">
              {calculateTimeToNextAstroEvent(localTimeOnly, sunsetTime)} to next
              sunset
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default SunPanel;
