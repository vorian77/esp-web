import { dbGetDoc } from '$server/dbFauna'

export async function load() {
	return {
		formDefn: await dbGetDoc('forms', '365620784541990989')
	}
}
