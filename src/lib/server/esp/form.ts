import { dbGetFormDefn } from '$lib/server/fauna';
// import { getSchema } from '$comps/esp/form/validate'
// import { applyAction, enhance, type SubmitFunction } from '$app/forms'

let validationSchema;

export async function getFormDefn(formId) {
	const formDefn = await dbGetFormDefn(formId);
	if (formDefn) {
		// validationSchema = getSchema(formDefn.fields)
		// console.log('ValidationSchema: ', validationSchema)
		return formDefn;
	}
	// throw error(404, 'Not found')
}
