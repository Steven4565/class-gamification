import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

import { theme } from './theme';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				'poppins': ['Poppins'],
				'inter': ['Inter']
			},
			colors: {
				'customBlue': '#277BC0',
				'sunrise': '#FFB200',
				'silver': '#E6E5E9',
				'lavenderMist': '#EFECF8',
				'crimson': '#F60000',
				'slateLavender':  '#766D76',
				'brightAzure': '#0097DA',
				'electricCyan': '#00BCF1',
				'sunriseOrange': '#F78627'
			}
		}
	},
	plugins: [
		skeleton({
			themes: {
				custom: [theme]
			}
		})
	]
} satisfies Config;

export default config;
