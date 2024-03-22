/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                color1: '#1e1f24',
                color2: '#ffffff',
                color3: '#2e2e38',
                color4: '#eb5990',
                color5: '#c9e8eb',
                color6: '#f2651d',
                color7: '#5cd5fb',
                scaffold: '#462e8a',
                failure: '#e56962',
                success: '#0bc144',
            },
            boxShadow: {
                blur: '0 0 10px 5px rgba(203, 233, 233, 0.4)',
            },
            gridTemplateColumns: {
                localWeather: 'auto repeat(5, 1fr)',
            },
        },
    },
    plugins: [],
};
