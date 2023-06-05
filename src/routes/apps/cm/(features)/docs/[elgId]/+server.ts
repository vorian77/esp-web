import { formFetch } from '$server/formFetch'
import { getResponseObj } from '$utils/utils'

const FILENAME = '/routes/apps/cm/(features)/docs/[elgId]/+server.ts'

export async function POST({ request }) {
	// upload document info to case manager
	const requestData = await request.json()
	const { source, data } = requestData
	const imgStorageName = 'esp_web_' + data.referral_id + '_' + data.elgId + '_' + data.idDoc
	const newData = { ...data, imgStorageName }
	console.log('PROCESS DOCUMENT...')
	console.log('data:', newData)

	const response = await formFetch(source, newData)
	const responseData = getResponseObj(await response.json(), {})
	console.log('response:', responseData)

	// generate AWS S3 upload URL

	// upload image

	// const userId = responseData.applicantId
	// if (!userId) {
	// 	throw error(500, {
	// 		file: FILENAME,
	// 		function: `POST.form_submit: ${formId}`,
	// 		message: `Invalid userId returned. Parms: ${JSON.stringify(data)}`
	// 	})
	// }

	return new Response(responseData)
}
