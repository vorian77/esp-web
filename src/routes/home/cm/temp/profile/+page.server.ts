import { dbGetDoc } from '$server/dbFauna'

export async function load() {
	return {
		profile: await dbGetDoc('forms', '364158513654530125')
	}
}
