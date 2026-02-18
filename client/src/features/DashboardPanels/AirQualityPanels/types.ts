export interface AirQuality {
  co?: number;
  no2?: number;
  o3?: number;
  so2?: number;
  pm2_5?: number;
  pm10?: number;
  "us-epa-index"?: number;
  "gb-defra-index"?: number;
}

export interface AirQualityDescription {
  name: string;
  description: string;
  unit: string;
}

export interface AirQualityDescriptions {
  [key: string]: AirQualityDescription;
}

export interface EpaScoreDescription {
  score: number;
  description: string;
}

export interface EpaScoreDescriptions {
  [key: string]: EpaScoreDescription;
}

export interface DefraScoreDescription {
  score: number;
  band: string;
  range: string;
}

export interface DefraScoreDescriptions {
  [key: string]: DefraScoreDescription;
}

export interface AirQualityPanelProps {
  current: {
    air_quality: AirQuality;
  };
  onTabSelect?: (key: string) => void;
}

export interface DataDisplayProps {
  value: string | number;
}
