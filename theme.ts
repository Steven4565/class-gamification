import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
	name: 'theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #0097da
		'--color-primary-50': '217 239 249', // #d9eff9
		'--color-primary-100': '204 234 248', // #cceaf8
		'--color-primary-200': '191 229 246', // #bfe5f6
		'--color-primary-300': '153 213 240', // #99d5f0
		'--color-primary-400': '77 182 229', // #4db6e5
		'--color-primary-500': '0 151 218', // #0097da
		'--color-primary-600': '0 136 196', // #0088c4
		'--color-primary-700': '0 113 164', // #0071a4
		'--color-primary-800': '0 91 131', // #005b83
		'--color-primary-900': '0 74 107', // #004a6b
		// secondary | #f78627
		'--color-secondary-50': '254 237 223', // #feeddf
		'--color-secondary-100': '253 231 212', // #fde7d4
		'--color-secondary-200': '253 225 201', // #fde1c9
		'--color-secondary-300': '252 207 169', // #fccfa9
		'--color-secondary-400': '249 170 104', // #f9aa68
		'--color-secondary-500': '247 134 39', // #f78627
		'--color-secondary-600': '222 121 35', // #de7923
		'--color-secondary-700': '185 101 29', // #b9651d
		'--color-secondary-800': '148 80 23', // #945017
		'--color-secondary-900': '121 66 19', // #794213
		// tertiary | #2e60e5
		'--color-tertiary-50': '224 231 251', // #e0e7fb
		'--color-tertiary-100': '213 223 250', // #d5dffa
		'--color-tertiary-200': '203 215 249', // #cbd7f9
		'--color-tertiary-300': '171 191 245', // #abbff5
		'--color-tertiary-400': '109 144 237', // #6d90ed
		'--color-tertiary-500': '46 96 229', // #2e60e5
		'--color-tertiary-600': '41 86 206', // #2956ce
		'--color-tertiary-700': '35 72 172', // #2348ac
		'--color-tertiary-800': '28 58 137', // #1c3a89
		'--color-tertiary-900': '23 47 112', // #172f70
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #f60000
		'--color-error-50': '254 217 217', // #fed9d9
		'--color-error-100': '253 204 204', // #fdcccc
		'--color-error-200': '253 191 191', // #fdbfbf
		'--color-error-300': '251 153 153', // #fb9999
		'--color-error-400': '249 77 77', // #f94d4d
		'--color-error-500': '246 0 0', // #f60000
		'--color-error-600': '221 0 0', // #dd0000
		'--color-error-700': '185 0 0', // #b90000
		'--color-error-800': '148 0 0', // #940000
		'--color-error-900': '121 0 0', // #790000
		// surface | #ffffff
		'--color-surface-50': '255 255 255', // #ffffff
		'--color-surface-100': '255 255 255', // #ffffff
		'--color-surface-200': '255 255 255', // #ffffff
		'--color-surface-300': '255 255 255', // #ffffff
		'--color-surface-400': '255 255 255', // #ffffff
		'--color-surface-500': '255 255 255', // #ffffff
		'--color-surface-600': '230 230 230', // #e6e6e6
		'--color-surface-700': '191 191 191', // #bfbfbf
		'--color-surface-800': '153 153 153', // #999999
		'--color-surface-900': '125 125 125' // #7d7d7d
	}
};
