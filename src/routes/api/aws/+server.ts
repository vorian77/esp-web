import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/aws/server.ts'

export async function POST({ request }) {
	let imgStorageKey
	let imgType

	const requestData = await request.json()
	const { action } = requestData

	switch (action) {
		case 'get_url_upload':
			imgStorageKey = requestData.imgStorageKey
			imgType = requestData.imgType

			let uploadApi = 'https://moed-yo-api.theappfactory.com'
			uploadApi += '/storage/img_url_upload'
			uploadApi += `?storageKey=${imgStorageKey}&storageContentType=${imgType}`

			return getUrl(uploadApi)
			break

		case 'get_url_download':
			imgStorageKey = requestData.imgStorageKey

			let downloadApi = 'https://moed-yo-api.theappfactory.com'
			downloadApi += '/storage/img_url_download'
			downloadApi += `?storageKey=${imgStorageKey}`

			return getUrl(downloadApi)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for action: ${action}.`
			})
	}
}

async function getUrl(api) {
	const respPromise = await fetch(api, { method: 'GET' })
	const respData = await respPromise.json()
	const url = respData.url
	return new Response(JSON.stringify({ success: true, data: { url } }))
}
