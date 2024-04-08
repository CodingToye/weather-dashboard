/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f2651d",
        neutral: {
          lightGrey: "#f1f0f5",
          midGrey: "#2e2e38",
          darkGrey: "#1e1f24",
        },
        white: "#ffffff",
        failure: "#e56962",
        success: "#0bc144",
        uv: {
          low: "#bada55",
          lowDark: "#5d6e27",
          moderate: "#f68c03",
          moderateDark: "#965c11",
          high: "#f15701",
          highDark: "#85360b",
          veryHigh: "#ee4e22",
          verHighDark: "#a33314",
          extreme: "#9945c7",
          extremeDark: "#4f1f69",
        },
      },
      width: {
        90: "90px",
        100: "100px",
      },
      height: {
        90: "90px",
        100: "100px",
      },
      fontFamily: {
        body: ['"Roboto"'],
      },
      boxShadow: {
        "soft-primary-outline": "0 0 10px 2px #f2651d",
        "soft-secondary-outline": "inset 0 0 3px 1px #f2651d",
      },
      gridTemplateColumns: {
        localWeather: "auto repeat(5, 1fr)",
        dashboardPanels1: "300px, 1fr",
      },
      transitionProperty: {
        height: "height",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  safelist: [
    "bg-uv-low",
    "text-uv-lowDark",
    "bg-uv-moderate",
    "text-uv-moderateDark",
    "bg-uv-high",
    "text-uv-highDark",
    "bg-uv-veryHigh",
    "text-uv-veryHighDark",
    "bg-uv-extreme",
    "text-uv-extremeDark",
  ],
  plugins: [],
};
