import { getForm } from '$server/dbForm'
import { getURLDownload } from '$comps/fileTransferAWS'
import { dbESPAPI } from '$server/dbESP'
import { HTMLMETHOD } from '$comps/types'
import { getEnvVar } from '$server/env'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/home/cm/docs/+server.ts'

export const POST = async ({ request, locals }) => {
	const { elgId } = await request.json()

	// get doc form
	let formDefn = await getForm('cm_elg_doc_rec', { ...locals.user, elgId })

	// get doc image download
	const imgStorageKey = formDefn.values.imgStorageKey
	if (imgStorageKey) {
		const responsePromise = await getURLDownload(imgStorageKey)
		const responData = await responsePromise.json()

		const pictEl = 'docImage'
		const idx = formDefn.fields.findIndex((f) => f.name == pictEl)
		if (idx >= 0) {
			formDefn.fields[idx].value = responData.data.url
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `Required field element missing: (${pictEl}).`
			})
		}
	}
	return new Response(JSON.stringify({ formDefn }))
}

export const GET = async ({ locals }) => {
	const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_elg_list', {
		referralId: locals.user.referral_id
	})
	const response = await responsePromise.json()
	return new Response(JSON.stringify(response.data))
}
