// import { fail, json, redirect } from '@sveltejs/kit'
// import { processForm } from '$server/esp/form/formProcess'
// import { validateForm } from '$comps/esp/form/formValidate'

export const actions = {
	sql: async ({ request }) => {
		console.log('form.sql - +page.server.ts...')
		const formData = await request.formData()
		console.log('SQL:', formData.get('sql'))
		const obj = JSON.parse(formData.get('data'))
		console.log('data:', obj)
		// console.log('datamap:', obj[1]['name'])
		// console.log('datamap:', obj[1]['value'])
		return { success: true }
	}
}
