import { formInit } from '$server/esp/form/formInit'

export async function load({ url }) {
	const authType = url.searchParams.getAll('type')[0]

	return {
		authType,
		formDefnSignup: await formInit('363255616174555209'),
		formDefnLogin: await formInit('364001027435790416'),
		formDefnProfile: await formInit('364158513654530125')
	}
}
