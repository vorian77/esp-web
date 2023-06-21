import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/aws/server.ts'

export async function POST({ request }) {
	const FILENAME = '/routes/api/aws/+server.ts'

	let imgStorageKey
	let imgType

	const requestData = await request.json()
	const { action, parms } = requestData

	switch (action) {
		case 'get_url_upload':
			// data
			imgStorageKey = parms.imgStorageKey
			imgType = parms.imgType

			// upload
			let urlUpload = 'https://moed-yo-api.theappfactory.com'
			urlUpload += '/storage/img_url_upload'
			urlUpload += `?storageKey=${imgStorageKey}&storageContentType=${imgType}`
			return processURL(urlUpload)
			break

		case 'get_url_download':
			imgStorageKey = parms.imgStorageKey

			let urlDownload = 'https://moed-yo-api.theappfactory.com'
			urlDownload += '/storage/img_url_download'
			urlDownload += `?storageKey=${imgStorageKey}`

			return processURL(urlDownload)
			break

		case 'resize_image':
			let urlResize = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-splax/endpoint/'
			urlResize += 'AWSs3ImgResize?key=' + imgStorageKey
			return processURL(urlResize)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for action: ${action}.`
			})
	}
}

async function processURL(api: string) {
	const respPromise = await fetch(api, { method: 'GET' })
	const respData = await respPromise.json()
	return new Response(JSON.stringify({ success: true, data: respData }))
}
