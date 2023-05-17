import { dbRecGet } from '$server/db'
import { Form } from '$comps/esp/form/form'

export async function load({ url }) {
	const authType = url.searchParams.getAll('type')[0]

	async function formInit(formId: string) {
		const formDefn = await dbRecGet('forms', formId)
		// return new Form(formDefn)
		return {}
	}

	return {
		authType,
		formDefnSignup: await formInit('363255616174555209')
	}
	// 	return {
	// 	authType,
	// 	formDefnSignup: await formInit('363255616174555209'),
	// 	formDefnLogin: await formInit('364001027435790416'),
	// 	formDefnProfile: await formInit('364158513654530125')
	// }
}
