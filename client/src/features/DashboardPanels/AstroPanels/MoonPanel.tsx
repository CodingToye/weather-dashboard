import Panel from "../../../components/Panel";
import Icon from "../../../components/Icon";
import {
  getTime,
  convertTo24Hour,
  calculateTimeToNextAstroEvent,
} from "../../../utils/dates.utils";
import {Location} from "../../../types/types";
import Header from "../../../components/Header";

export interface MoonPanelProps {
  moonrise?: string;
  moonset?: string;
  moon_phase?: string;
  moon_illumination?: string;
  is_moon_up: number;
  location: Location;
}

const MoonPanel: React.FC<MoonPanelProps> = ({
  moonrise,
  moonset,
  moon_phase,
  moon_illumination,
  is_moon_up,
  location,
}) => {
  const localTimeOnly = getTime(location.localtime);
  const moonriseTime = convertTo24Hour(moonrise || "12:00 AM");
  const moonsetTime = convertTo24Hour(moonset || "12:00 AM");
  return (
    <Panel>
      <div>
        <div className="flex justify-between">
          <Header heading="Moon" />
          <Icon
            iconName="clear_night"
            extraClasses={`text-white ${
              is_moon_up === 1 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <div className="flex flex-col gap-8 text-neutral-darkGrey/50 dark:text-white/50">
          <p className="text-sm text-white/50">
            The moon is currently in{" "}
            <span className="text-white">{moon_phase}</span> and is{" "}
            <span className="text-white">{moon_illumination}%</span>{" "}
            illuminated.
          </p>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon iconName="clear_night" extraClasses="text-base -mt-1" />
              <span className="text-sm text-white">Moonrise</span>
              <span className="text-sm lowercase">{moonrise}</span>
            </div>
            <span className="text-xs">
              {calculateTimeToNextAstroEvent(localTimeOnly, moonriseTime)} to
              next moonrise
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon iconName="bedtime_off" extraClasses="text-base -mt-1" />
              <span className="text-sm text-white">Moonset</span>
              <span className="text-sm lowercase">{moonset}</span>
            </div>
            <span className="text-xs">
              {calculateTimeToNextAstroEvent(localTimeOnly, moonsetTime)} to
              next moonset
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default MoonPanel;
