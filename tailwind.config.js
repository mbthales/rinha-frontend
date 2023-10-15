/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				gray: '#BFBFBF',
				blue: '#4E9590',
				brown: '#F2CAB8',
				red: '#BF0E0E',
			},
		},
	},
	plugins: [],
}
