import { dbGetDoc } from '$server/dbFauna'

export async function load() {
	return {
		formDefn: await dbGetDoc('forms', '366365410670411853')
	}
}
