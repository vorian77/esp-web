const FILENAME = '/routes/admin/+layout.server.ts'

export async function load({ locals, route }) {
	return {
		user: locals.user,
		routeId: route.id
	}
}
