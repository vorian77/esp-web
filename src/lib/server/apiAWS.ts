const FILENAME = '/$server/apiAWS.ts'

export async function getURLUpload(imgStorageKey: string, imgType: string) {
	// upload
	let url = 'https://moed-yo-api.theappfactory.com'
	url += '/storage/img_url_upload'
	url += `?storageKey=${imgStorageKey}&storageContentType=${imgType}`
	return await processURL(url)
}

export async function getURLDownload(imgStorageKey: string) {
	// upload
	let url = 'https://moed-yo-api.theappfactory.com'
	url += '/storage/img_url_download'
	url += `?storageKey=${imgStorageKey}`
	return await processURL(url)
}

async function processURL(api: string) {
	const respPromise = await fetch(api, { method: 'GET' })
	const respData = await respPromise.json()
	return new Response(JSON.stringify({ success: true, data: respData }))
}
