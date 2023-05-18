import { dbGetFormDefn } from '$server/dbFauna'

export async function load({ url }) {
	const dataBus = {} // from app.store

	async function getFormInit(formId) {
		return {
			defn: await dbGetFormDefn(formId),
			data: dataBus
		}
	}

	return {
		authType: url.searchParams.getAll('type')[0],
		formDefnSignup: await getFormInit('363255616174555209'),
		formDefnLogin: await getFormInit('364001027435790416'),
		formDefnProfile: await getFormInit('364158513654530125')
	}
}
