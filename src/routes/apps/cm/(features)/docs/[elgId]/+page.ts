import type { FormSourceResponseType } from '$comps/esp/form/types'

export async function load({ data, parent, fetch }) {
	const dataParent = await parent()
	const imgStorageKey = data.formDefn.values.user_document.imgStorageKey
	let imgStorageUrl = ''

	if (imgStorageKey) {
		const responsePromise = await fetch('/api/aws', {
			method: 'POST',
			body: JSON.stringify({ action: 'get_url_download', imgStorageKey })
		})
		const response: FormSourceResponseType = await responsePromise.json()
		imgStorageUrl = response.data.url
	}
	data['imgStorageUrl'] = imgStorageUrl
	return data
}
