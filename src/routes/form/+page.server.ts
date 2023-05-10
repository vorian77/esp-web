import { fail, redirect } from '@sveltejs/kit'
// import { processForm } from '$server/esp/form/formProcess'
import { validateForm } from '$comps/esp/form/formValidate'

export const actions = {
	save: async ({ request }) => {
		const formData = await request.formData()
		// const authType = url.searchParams.getAll('type')[0]
		// const { data, errors } = validateForm(formData, formDefn)

		console.log('page server')

		const data = {
			success: false,
			errors: {}
		}

		// if (!todo) {
		// 	data.errors.todo = 'required'
		// 	return json(data, { status: 400 })
		// return fail(400, { data, missing: true })
		// }

		// return { success: true }
		// redirect the user
		throw redirect(303, '/home')
	}
}
