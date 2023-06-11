export async function getURLUpload(storageKey: string) {
	let api = 'https://moed-yo-api.theappfactory.com'
	api += '/storage/img_url_upload'
	api += `?storageKey=${storageKey}&storageContentType=image/jpeg`

	const resp = await fetch(api, {
		method: 'GET'
	})
	return await resp.json()
}
