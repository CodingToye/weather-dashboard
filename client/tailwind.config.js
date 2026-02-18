/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f2651d",
        neutral: {
          paleGrey: "#f1f0f5",
          lightGrey: "#b0afb2",
          midGrey: "#2e2e38",
          darkGrey: "#1e1f24",
        },
        black: "#000000",
        white: "#ffffff",
        failure: "#e56962",
        warning: "#ef842e",
        success: "#0bc144",
        sun: "#ffac41",
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
        us_aq: {
          1: "#09e660",
          2: "#fef464",
          3: "#fe7f2b",
          4: "#ff0000",
          5: "#8f3f97",
          6: "#7e0223",
        },
        uk_aq: {
          low: "#09e660",
          moderate: "#fe7f2b",
          high: "#ff0000",
          very_high: "#8f3f97",
        },
      },
      width: {
        90: "90px",
        100: "100px",
        notification: "4px",
      },
      height: {
        90: "90px",
        100: "100px",
        notification: "4px",
      },
      fontSize: {
        micro: "8px",
      },
      fontFamily: {
        body: ['"Roboto"'],
      },
      boxShadow: {
        "soft-primary-outline": "0 0 10px 2px #f2651d",
        "soft-secondary-outline": "inset 0 0 1px 1px #CFCFCF",
      },
      gridTemplateColumns: {
        localWeather: "auto repeat(5, 1fr)",
        dashboardPanels1: "300px, 1fr",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      animation: {
        bouncy: "bouncy 1.5s ease-in-out",
        smoothPulse: "smoothPulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "fade-out-up": "fade-out-up 0.5s ease-out forwards",
        "backdrop-fade-in": "backdrop-fade-in .5s ease-out forwards",
        "backdrop-fade-out": "backdrop-fade-out .5s ease-out forwards",
        blink: "blink 1.3s steps(2, start) infinite",
        shake: "shake .5s infinite",
      },
      keyframes: {
        bouncy: {
          "0%": {transform: "translateY(-80%)"},
          "10%": {transform: "translateY(15%)"},
          "25%": {transform: "translateY(-40%)"},
          "40%": {transform: "translateY(10%)"},
          "55%": {transform: "translateY(-20%)"},
          "70%": {transform: "translateY(5%)"},
          "85%": {transform: "translateY(-10%)"},
          "100%": {transform: "translateY(0%)"},
        },
        smoothPulse: {
          "0%, 100%": {opacity: 1},
          "50%": {opacity: 0.6},
        },
        "fade-in-down": {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-up": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
        "backdrop-fade-in": {
          from: {opacity: "0"},
          to: {opacity: "1"},
        },
        "backdrop-fade-out": {
          from: {opacity: ".9"},
          to: {opacity: "0"},
        },
        blink: {
          "50%": {visibility: "hidden"},
        },
        shake: {
          "0%": {transform: "translate(1px, 1px) rotate(0deg)"},
          "25%": {transform: "translate(3px, 1px) rotate(-15deg)"},
          "50%": {transform: "translate(1px, 1px) rotate(5deg)"},
          "75%": {transform: "translate(3px, 1px) rotate(-15deg)"},
          "100%": {transform: "translate(1px, 1px) rotate(0deg)"},
        },
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
    "bg-us_aq-1",
    "bg-us_aq-2",
    "bg-us_aq-3",
    "bg-us_aq-4",
    "bg-us_aq-5",
    "bg-us_aq-6",
    "text-us_aq-1",
    "text-us_aq-2",
    "text-us_aq-3",
    "text-us_aq-4",
    "text-us_aq-5",
    "text-us_aq-6",
    "bg-uk_aq-low",
    "bg-uk_aq-moderate",
    "bg-uk_aq-high",
    "bg-uk_aq-very_high",
    "text-uk_aq-low",
    "text-uk_aq-moderate",
    "text-uk_aq-high",
    "text-uk_aq-very_high",
  ],
  plugins: [],
};
