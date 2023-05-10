import { applyAction, type SubmitFunction } from '$app/forms'

export const process = (event, formDefn, formData, action) => {
	console.log('process')
	console.log(event)
	console.log(formDefn)
	console.log(formData)

	// alert(String(formData.get('nameLast')))

	console.log('action:', action)
	console.log('name', String(formData.get('nameFirst')))

	// const formEl = event.target as HTMLFormElement
	// const data = new FormData(formEl)
}

export const process1 = (event, formDefn) => {
	// before the form submits
	console.log(action)

	const nameFirst = String(data.get('nameFirst'))
	const nameLast = String(data.get('nameLast'))
	console.log('submit: ', nameFirst, nameLast, action)

	return async ({ result, update }) => {
		// after the form submits

		if (result.type === 'success') {
			//

			// default behaviro for this result type
			await applyAction(result)
		}

		if (result.type === 'failure') {
		}

		if (result.type === 'redirect') {
		}

		if (result.type === 'error') {
		}
	}
}
