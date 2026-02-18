import {DataDisplayProps} from "./types";
import {
  epaScoreDescriptions,
  defraScoreDescriptions,
} from "./airQuality.dictionary";

export const EPAIndexDisplay: React.FC<DataDisplayProps> = ({value}) => {
  const score = 6;
  const badges = [];
  for (let i = 1; i <= score; i++) {
    badges.push(
      <div
        className={`${
          value === i ? `bg-us_aq-${value}` : "bg-neutral-darkGrey opacity-10"
        } ${
          (value === 2 && value === i) || (value === 1 && value === i)
            ? "text-neutral-darkGrey"
            : "text-white"
        } w-8 h-8 rounded-full flex items-center justify-center`}
        key={i}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-4">{badges}</div>
      <div
        className={`text-xs bg-neutral-darkGrey text-us_aq-${value} p-2 rounded-lg`}
      >
        {epaScoreDescriptions[value]?.description}
      </div>
    </div>
  );
};

const defraBands = (e: number | string) => {
  switch (e) {
    case 1:
      return "low";
    case 2:
      return "low";
    case 3:
      return "low";
    case 4:
      return "moderate";
    case 5:
      return "moderate";
    case 6:
      return "moderate";
    case 7:
      return "high";
    case 8:
      return "high";
    case 9:
      return "high";
    case 10:
      return "very_high";
  }
};

export const DEFRAIndexDisplay: React.FC<DataDisplayProps> = ({value}) => {
  const score = 10;
  const badges = [];

  for (let i = 1; i <= score; i++) {
    badges.push(
      <div
        className={`${
          value === i
            ? `bg-uk_aq-${defraBands(i)}`
            : "bg-neutral-darkGrey opacity-10"
        } ${
          defraBands(value) === "low" && value === i
            ? "text-neutral-darkGrey"
            : "text-white"
        } w-8 h-8 rounded-full flex items-center justify-center`}
        key={i}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-3">{badges}</div>
      <div className="text-xs bg-neutral-darkGrey text-white/50 p-2 rounded-lg flex items-center justify-between">
        <span className={`text-uk_aq-${defraBands(value)} mr-4`}>
          {defraScoreDescriptions[value]?.band}
        </span>
        <div className="text-white">
          {defraScoreDescriptions[value]?.range}{" "}
          <small className="text-white/50">
            {" "}
            µgm<sup>-3</sup>
          </small>
        </div>
      </div>
    </div>
  );
};

export const DefaultDataDisplay: React.FC<DataDisplayProps> = ({value}) => {
  return (
    <div className="flex">
      <div className="text-xs bg-neutral-darkGrey text-white p-2 rounded-lg ">
        {value}
        <small className="text-white/50"> µg/m3</small>{" "}
      </div>
    </div>
  );
};
