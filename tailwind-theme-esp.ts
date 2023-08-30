import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const tailwindThemeESP: CustomThemeConfig = {
	name: 'tailwind-theme-esp',
	properties: {
		/* =~= Theme Properties =~= */
		'--theme-font-family-base':
			"Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,\n\t\t'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',\n\t\t'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
		'--theme-font-family-heading':
			"Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,\n\t\t'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',\n\t\t'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '6px',
		'--theme-rounded-container': '0px',
		'--theme-border-base': '1px',
		/* =~= Theme On-X Colors =~= */
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		/* =~= Theme Colors  =~= */
		/* primary | #3d79e1 */
		'--color-primary-50': '226 235 251',
		'--color-primary-100': '216 228 249',
		'--color-primary-200': '207 222 248',
		'--color-primary-300': '177 201 243',
		'--color-primary-400': '119 161 234',
		'--color-primary-500': '61 121 225',
		'--color-primary-600': '55 109 203',
		'--color-primary-700': '46 91 169',
		'--color-primary-800': '37 73 135',
		'--color-primary-900': '30 59 110',
		/* secondary | #00704A */
		'--color-secondary-50': '217 234 228',
		'--color-secondary-100': '204 226 219',
		'--color-secondary-200': '191 219 210',
		'--color-secondary-300': '153 198 183',
		'--color-secondary-400': '77 155 128',
		'--color-secondary-500': '0 112 74',
		'--color-secondary-600': '0 101 67',
		'--color-secondary-700': '0 84 56',
		'--color-secondary-800': '0 67 44',
		'--color-secondary-900': '0 55 36',
		/* tertiary | #4F46E5 */
		'--color-tertiary-50': '229 227 251',
		'--color-tertiary-100': '220 218 250',
		'--color-tertiary-200': '211 209 249',
		'--color-tertiary-300': '185 181 245',
		'--color-tertiary-400': '132 126 237',
		'--color-tertiary-500': '79 70 229',
		'--color-tertiary-600': '71 63 206',
		'--color-tertiary-700': '59 53 172',
		'--color-tertiary-800': '47 42 137',
		'--color-tertiary-900': '39 34 112',
		/* success | #84cc16 */
		'--color-success-50': '237 247 220',
		'--color-success-100': '230 245 208',
		'--color-success-200': '224 242 197',
		'--color-success-300': '206 235 162',
		'--color-success-400': '169 219 92',
		'--color-success-500': '132 204 22',
		'--color-success-600': '119 184 20',
		'--color-success-700': '99 153 17',
		'--color-success-800': '79 122 13',
		'--color-success-900': '65 100 11',
		/* warning | #EAB308 */
		'--color-warning-50': '252 244 218',
		'--color-warning-100': '251 240 206',
		'--color-warning-200': '250 236 193',
		'--color-warning-300': '247 225 156',
		'--color-warning-400': '240 202 82',
		'--color-warning-500': '234 179 8',
		'--color-warning-600': '211 161 7',
		'--color-warning-700': '176 134 6',
		'--color-warning-800': '140 107 5',
		'--color-warning-900': '115 88 4',
		/* error | #D41976 */
		'--color-error-50': '249 221 234',
		'--color-error-100': '246 209 228',
		'--color-error-200': '244 198 221',
		'--color-error-300': '238 163 200',
		'--color-error-400': '225 94 159',
		'--color-error-500': '212 25 118',
		'--color-error-600': '191 23 106',
		'--color-error-700': '159 19 89',
		'--color-error-800': '127 15 71',
		'--color-error-900': '104 12 58',
		/* surface | #737373 */
		'--color-surface-50': '234 234 234',
		'--color-surface-100': '227 227 227',
		'--color-surface-200': '220 220 220',
		'--color-surface-300': '199 199 199',
		'--color-surface-400': '157 157 157',
		'--color-surface-500': '115 115 115',
		'--color-surface-600': '104 104 104',
		'--color-surface-700': '86 86 86',
		'--color-surface-800': '69 69 69',
		'--color-surface-900': '56 56 56'
	},
	properties_dark: {
		// Optionally provide dark mode overrides for your CSS custom properties here
	}
};
