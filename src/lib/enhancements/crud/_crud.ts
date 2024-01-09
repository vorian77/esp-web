import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/_crud.ts'

export async function getEnhancement(method: string) {
	switch (method) {
		case 'dataObjConfig':
			return (await import('$enhance/crud/crudDataObjConfig')).default
			break

		case 'myAccount':
			return (await import('$enhance/crud/crudMyAccount')).default
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'getEnhancement',
				message: `No case defined for action method: ${method}`
			})
	}
}
