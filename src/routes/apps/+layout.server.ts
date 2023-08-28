import { User } from '$comps/types'
import { fetchQuote } from '$server/apiQuotes'

const FILENAME = '/routes/apps/+layout.server.ts'

export async function load({ locals, route }) {
	const user = new User(locals.user.edge_temp)

	async function otherData() {
		let otherData = {}

		otherData.appNodes = locals.user.edge_temp.resource_programs

		if (user.hasResourceWidget('hsw_cm_quotes')) {
			otherData.quote = await fetchQuote()
		}

		return otherData
	}

	return {
		user: locals.user,
		routeId: route.id,
		otherData: await otherData()
	}
}
