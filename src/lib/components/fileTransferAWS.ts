import { ResponseBody } from '$comps/types.js'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/imageUpload.ts'

export async function getURLDownload(fileStorageKey: string | undefined) {
	if (!fileStorageKey) return undefined
	return await getURL('getURLDownLoad', fileStorageKey)
}

export async function objDelete(fileStorageKey: string) {
	const responsePromise: Response = await fetch('/api/aws', {
		method: 'POST',
		body: JSON.stringify({ action: 'objDelete', parms: { fileStorageKey } })
	})
	return await responsePromise.json()
}

export async function objUpload(fileStorageKey: string, file: File): Promise<ResponseBody> {
	const fileType = file.type
	fileStorageKey = 'raw/' + fileStorageKey

	if (!file.name) {
		return new ResponseBody({
			success: false,
			message: `Cannot upload image: ${fileStorageKey}. No image provided.`
		})
	}

	const url = await getURL('getURLUpload', fileStorageKey, fileType)
	return await upload(url, file)

	async function upload(url: string, imgFile: File) {
		console.log('upload:', { url, imgFile })
		try {
			const resp: Response = await fetch(url, {
				method: 'PUT',
				body: imgFile,
				headers: {
					'Content-Type': imgFile.type
				}
			})

			if (resp.statusText.toLowerCase() === 'ok') {
				return new ResponseBody({ success: true })
			} else {
				return new ResponseBody({ success: false })
			}
		} catch (err) {
			error(500, {
				file: FILENAME,
				function: 'uploadImage',
				message: `Unable to upload image: ${imgFile.name} Error: ${err}`
			})
		}
	}
}

export async function objExists(fileStorageKey: string | null) {
	if (!fileStorageKey) return false

	const responsePromise: Response = await fetch('/api/aws', {
		method: 'POST',
		body: JSON.stringify({
			action: 'objExists',
			parms: {
				fileStorageKey
			}
		})
	})
	return await responsePromise.json()
}

export async function objsList() {
	const responsePromise: Response = await fetch('/api/aws', {
		method: 'POST',
		body: JSON.stringify({ action: 'objList' })
	})
	return await responsePromise.json()
}

async function getURL(action: string, fileStorageKey: string, fileType = '') {
	try {
		const responsePromise: Response = await fetch('/api/aws', {
			method: 'POST',
			body: JSON.stringify({
				action,
				parms: {
					fileStorageKey,
					fileType
				}
			})
		})
		const response: ResponseBody = await responsePromise.json()

		if (!response.success) {
			error(500, {
				file: FILENAME,
				function: 'getURL',
				message: `Unable to retrieve URL for ${action} - storage key: ${fileStorageKey}`
			})
		}

		return response.data
	} catch (err) {
		error(500, {
			file: FILENAME,
			function: 'getURL',
			message: `Unable to retrieve URL for ${action} - storage key: ${fileStorageKey} - err: ${err}`
		})
	}
}
