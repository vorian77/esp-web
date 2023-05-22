import { dbGetFormDefn } from '$server/dbFauna'

export async function load() {
	return {
		profile: await dbGetFormDefn('364158513654530125')
	}
}
