/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'alien-league': ['alienleague', 'sans-serif'],
				'alien-league-bold': ['alienleaguebold', 'sans-serif'],
				'alien-league-gradient': ['alienleaguegradient', 'sans-serif'],
				'alien-league-gradient-bold': ['alienleaguegradientbold', 'sans-serif']
			}
		}
	},
	plugins: [require('daisyui')]
};
