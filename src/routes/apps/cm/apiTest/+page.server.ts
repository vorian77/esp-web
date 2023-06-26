import { getForm } from '$server/dbForm'

export async function load() {
	return {
		formDefn: await getForm('esp_api_test')
	}
}
