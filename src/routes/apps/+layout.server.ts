const FILENAME = '/routes/apps/+layout.server.ts'

export async function load({ locals }) {
	return {
		user: locals.user
	}
}
