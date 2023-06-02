import { dbGetDoc } from '$server/dbFauna'

export async function load() {
	return {
		formDefn: await dbGetDoc('forms', '364158513654530125')
	}
}
