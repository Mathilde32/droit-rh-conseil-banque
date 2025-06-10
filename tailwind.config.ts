
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'serif': ['EB Garamond', 'Georgia', 'serif'],
				'sans': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Banque de France brand colors
				'bdf-blue': {
					DEFAULT: '#002654',
					50: '#f0f4f8',
					100: '#d9e2ec',
					200: '#bcccdc',
					300: '#9fb3c8',
					400: '#829ab1',
					500: '#627d98',
					600: '#486581',
					700: '#334e68',
					800: '#243b53',
					900: '#102a43',
					950: '#002654',
				},
				'bdf-gold': {
					DEFAULT: '#FFD700',
					50: '#fffef7',
					100: '#fffce8',
					200: '#fff6c5',
					300: '#ffed97',
					400: '#ffe168',
					500: '#ffd42a',
					600: '#FFD700',
					700: '#e6c200',
					800: '#cc9f00',
					900: '#997700',
				},
				primary: {
					DEFAULT: '#002654',
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#f8fafc',
					foreground: '#002654'
				},
				destructive: {
					DEFAULT: '#dc2626',
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: '#f1f5f9',
					foreground: '#64748b'
				},
				accent: {
					DEFAULT: '#FFD700',
					foreground: '#002654'
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#002654'
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#002654'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'typing': 'typing 1.5s infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				typing: {
					'0%, 60%': { opacity: '1' },
					'30%': { opacity: '0.5' },
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
