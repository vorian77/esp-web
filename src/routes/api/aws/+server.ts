import { getURLUpload, getURLDownload } from '$server/apiAWS'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/aws/server.ts'

export async function POST({ request }) {
	let imgStorageKey
	let imgType

	const requestData = await request.json()
	const { action, parms } = requestData

	switch (action) {
		case 'get_url_upload':
			// data
			imgStorageKey = parms.imgStorageKey
			imgType = parms.imgType
			return getURLUpload(imgStorageKey, imgType)
			break

		case 'get_url_download':
			imgStorageKey = parms.imgStorageKey
			return getURLDownload(imgStorageKey)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for action: ${action}`
			})
	}
}
