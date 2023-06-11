const FILENAME = '/routes/api/aws/server.ts'

export async function POST({ request }) {
	console.log(FILENAME + '...')
	const requestData = await request.json()
	const { action } = requestData

	switch (action) {
		case 'url_upload':
			const { imgType, imgStorageKey } = requestData
			let api = 'https://moed-yo-api.theappfactory.com'
			api += '/storage/img_url_upload'
			api += `?storageKey=${imgStorageKey}&storageContentType=${imgType}`
			const response = await fetch(api, { method: 'GET' })
			const respData = await response.json()
			let url = respData.url
			return url
			break
	}

	return new Response(JSON.stringify({ success: true, data: { url: 'abc' } }))
}
