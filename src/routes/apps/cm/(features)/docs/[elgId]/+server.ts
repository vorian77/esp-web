import { formFetch } from '$server/formFetch'
import { getResponseObj } from '$utils/utils'

const FILENAME = '/routes/apps/cm/(features)/docs/[elgId]/+server.ts'

export async function POST({ request }) {
	// upload document info to case manager
	const requestData = await request.json()
	const { source, data } = requestData
	const imgLocalPath = data.imgPath
	const imgStorageName = 'esp_web_' + data.referral_id + '_' + data.elgId + '_' + data.idDoc
	const newData = { ...data, imgStorageName }
	console.log('PROCESS DOCUMENT...')
	console.log('data:', newData)

	let response = await formFetch(source, newData)
	const responseData = getResponseObj(await response.json(), {})
	console.log('response:', responseData)

	// generate AWS S3 upload URL
	let api = 'https://moed-yo-api.theappfactory.com'
	api += '/storage/img_url_upload'
	api += `?storageKey=${imgStorageName}&storageContentType=image/jpeg`
	response = await fetch(api, { method: 'GET' })
	const respData = await response.json()
	let url = respData.url

	// upload image
	// const fileName = data['imgPath']
	// console.log('fileName:', fileName)
	// try {
	// 	// Upload file
	// 	const reader = new FileReader()
	// 	reader.onloadend = async () => {
	// 		await fetch(url, {
	// 			method: 'PUT',
	// 			body: reader.result,
	// 			headers: {
	// 				'Content-Type': 'image/jpeg'
	// 			}
	// 		})
	// 	}
	// 	reader.readAsArrayBuffer(fileName)
	// 	//reader.readAsDataURL(fileName)
	// } catch (error) {
	// 	console.log(`Error in handleSubmit on / route: ${error}`)
	// }

	// const userId = responseData.applicantId
	// if (!userId) {
	// 	throw error(500, {
	// 		file: FILENAME,
	// 		function: `POST.form_submit: ${formId}`,
	// 		message: `Invalid userId returned. Parms: ${JSON.stringify(data)}`
	// 	})
	// }

	return new Response(JSON.stringify({ success: true, imgLocalPath, url }))
}
