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
                scaffold: '#462e8a',
                failure: '#e56962',
                success: '#0bc144',
            },
            boxShadow: {
                blur: '0 0 10px 5px rgba(203, 233, 233, 0.4)',
            },
        },
    },
    plugins: [],
};
