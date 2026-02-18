import {
  AirQualityDescriptions,
  EpaScoreDescriptions,
  DefraScoreDescriptions,
} from "./types";

export const airQualityDescriptions: AirQualityDescriptions = {
  co: {
    name: "Carbon Monoxide",
    description:
      "A colorless, odorless gas that can be harmful when inhaled in large amounts.",
    unit: "µg/m³",
  },
  no2: {
    name: "Nitrogen Dioxide",
    description:
      "A significant air pollutant and a precursor to ozone, which can cause respiratory problems.",
    unit: "µg/m³",
  },
  o3: {
    name: "Ozone",
    description:
      "A reactive gas that can be both good and bad for health, depending on where it is found in the atmosphere.",
    unit: "µg/m³",
  },
  so2: {
    name: "Sulfur Dioxide",
    description:
      "A gas that can cause acid rain and is dangerous to human health at high levels.",
    unit: "µg/m³",
  },
  pm2_5: {
    name: "Particulate Matter <2.5 μm",
    description:
      "Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller.",
    unit: "µg/m³",
  },
  pm10: {
    name: "Particulate Matter <10 μm",
    description:
      "Inhalable particles with diameters that are 10 micrometers and smaller.",
    unit: "µg/m³",
  },
  "us-epa-index": {
    name: "US EPA Index",
    description:
      "The United States Environmental Protection Agency’s index for reporting air quality.",
    unit: "",
  },
  "gb-defra-index": {
    name: "GB DEFRA Index",
    description:
      "The UK Department for Environment, Food & Rural Affairs index for reporting air quality.",
    unit: "",
  },
};

export const epaScoreDescriptions: EpaScoreDescriptions = {
  1: {
    score: 1,
    description: "Good",
  },
  2: {
    score: 2,
    description: "Moderate",
  },
  3: {
    score: 3,
    description: "Unhealthy for Sensitive Groups",
  },
  4: {
    score: 4,
    description: "Unhealthy",
  },
  5: {
    score: 5,
    description: "Very Unhealthy",
  },
  6: {
    score: 6,
    description: "Hazardous",
  },
};

export const defraScoreDescriptions: DefraScoreDescriptions = {
  1: {
    score: 1,
    band: "Low",
    range: "0-11",
  },
  2: {
    score: 2,
    band: "Low",
    range: "12-23",
  },
  3: {
    score: 3,
    band: "Low",
    range: "24-35",
  },
  4: {
    score: 4,
    band: "Moderate",
    range: "36-41",
  },
  5: {
    score: 5,
    band: "Moderate",
    range: "42-47",
  },
  6: {
    score: 6,
    band: "Moderate",
    range: "48-53",
  },
  7: {
    score: 7,
    band: "High",
    range: "54-58",
  },
  8: {
    score: 8,
    band: "High",
    range: "59-64",
  },
  9: {
    score: 9,
    band: "High",
    range: "65-70",
  },
  10: {
    score: 10,
    band: "Very High",
    range: "71 or more",
  },
};
