import type { FormSourceResponseType } from '$comps/types'

export async function load({ data, parent, fetch }) {
	const dataParent = await parent()

	const imgStorageKey = data.formDefn.values.imgStorageKey
	let imgStorageUrl = ''

	// add the download url to the page load data
	if (imgStorageKey) {
		const responsePromise = await fetch('/api/aws', {
			method: 'POST',
			body: JSON.stringify({ action: 'get_url_download', parms: { imgStorageKey } })
		})
		const response: FormSourceResponseType = await responsePromise.json()
		imgStorageUrl = response.data.url
	}
	data['imgStorageUrl'] = imgStorageUrl

	return data
}
