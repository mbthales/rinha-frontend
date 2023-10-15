/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				gray: '#485667',
				blue: '#00528e',
				brown: '#9b3109',
				red: '#BF0E0E',
				black: '#11151c',
				white: '#fbfafd',
			},
		},
	},
	plugins: [],
}
