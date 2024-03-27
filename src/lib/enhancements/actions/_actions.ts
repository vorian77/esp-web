import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/_actions.ts'

export async function getEnhancement(method: string) {
	switch (method) {
		case 'auth':
			return (await import('$enhance/actions/actionAuth')).default
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'getEnhancement',
				message: `No case defined for action method: ${method}`
			})
	}
}
