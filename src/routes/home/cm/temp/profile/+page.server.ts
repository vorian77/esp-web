import { formInit } from '$server/esp/form/formInit'

let formId = '364158513654530125'

export async function load({ url }) {
	return {
		formDefn: await formInit(formId)
	}
}
