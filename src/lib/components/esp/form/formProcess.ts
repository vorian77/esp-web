import { applyAction, type SubmitFunction, deserialize } from '$app/forms'
import type { Form, FieldValue } from '$comps/esp/form/form'
import type { ActionData } from './$types'
import type { ActionResult } from '@sveltejs/kit'

export async function process(
	event: SubmitEvent,
	action: string,
	form: Form,
	data: Array<FieldValue>
) {
	// before the form submits
	const formData = new FormData(event.target)

	console.log('process - before submit...')
	// console.log(event)
	console.log('action:', action)
	// console.log(form)
	// console.log(data)
	console.log('phoneMobile:', formData.get('phoneMobile'))
	console.log('password:', formData.get('password'))

	// fetch
	const response = await fetch(action, {
		method: 'POST',
		body: formData
	})

	const result: ActionResult = deserialize(await response.text())
	console.log('result:', result)
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
