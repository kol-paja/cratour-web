import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					'400': '#ffbd30',
					'500': '#3fd0d3',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
			maxWidth: {
				'7xl': '80rem', // already default (1280px)
				'8xl': '88rem', // ~1408px
				'9xl': '96rem', // ~1536px
				'10xl': '104rem', // ~1664px
			},
			keyframes: {
				slideInLeft: {
					from: {
						transform: 'translateX(-100%)',
						opacity: '0',
					},
					to: {
						transform: 'translateX(0)',
						opacity: '1',
					},
				},
				slideInRight: {
					from: {
						transform: 'translateX(100%)',
						opacity: '0',
					},
					to: {
						transform: 'translateX(0)',
						opacity: '1',
					},
				},
				fadeIn: {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
			},
			animation: {
				slideInLeft: 'slideInLeft 1s ease-out forwards',
				slideInRight: 'slideInRight 1s ease-out forwards',
				fadeIn: 'fadeIn 1s ease-out forwards',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			clipPath: {
				'left-bottom': 'polygon(0% 50%, 50% 100%, 0% 100%)',
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('tailwindcss-animate'), require('tailwind-clip-path')],
} satisfies Config;
