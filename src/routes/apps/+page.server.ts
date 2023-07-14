import { redirect } from '@sveltejs/kit'

export async function load({ route, parent }) {
	const dataParent = await parent()
	if (route.id != dataParent.user.root) {
		throw redirect(303, dataParent.user.root)
	}
}
