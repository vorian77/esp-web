import {
	FormSource,
	FormSourceAction,
	FormSourceDBAction,
	FormSourceParmType,
	type FormSourceResponseType,
	FormSourceTarget
} from '$comps/esp/form/types'

import { dbGetForm } from '$server/dbMongo'
// import { dbGetForm } from '$server/dbFauna'
import { getEnvVar } from '$server/env'
import { dbESP } from '$server/dbESP'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/dbForm.ts'

export async function processForm(
	sourceAction: FormSourceAction,
	action: FormSourceDBAction,
	data: {}
) {
	// console.log('PROCESSFORM...')
	// console.log('data:', data)
	// console.log('source:', source)
	const parms = setParmVals(sourceAction, data)
	// console.log('parms:', parms)

	switch (sourceAction.target) {
		case FormSourceTarget.esp:
			return await dbESP(sourceAction, action, parms)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processForm',
				message: `No case defined for sourceAction.target: ${sourceAction.target}`
			})
	}

	function setParmVals(sourceAction: FormSourceAction, data: {}) {
		// console.log('setParmVals...')
		// console.log('sourceAction:', sourceAction)
		let parms = {}
		sourceAction.parms.forEach(({ name, type, source }) => {
			switch (type) {
				case FormSourceParmType.form:
				case FormSourceParmType.params:
				case FormSourceParmType.user:
					parms[name] = data[source]
					break
				case FormSourceParmType.env:
					parms[name] = getEnvVar(source)
					break
				case FormSourceParmType.literal:
					parms[name] = source
					break
				default:
					throw error(500, {
						file: FILENAME,
						function: 'setFetchParms',
						message: `No case defined for Form.source.parms.type: "${type}".`
					})
			}
		})
		return parms
	}
}

export async function getForm(name: string, pageData = {}) {
	console.log('dbForm.getForm...')
	console.log('formName:', name)
	const form = await dbGetForm(name)
	// console.log('form', form)

	form.pageData = pageData
	// console.log('form.name:', name)
	// console.log('form.header:', form.header)
	// console.log('pageData:', form.pageData)

	// set values for form
	if (form.source) {
		form.values = await getValues(form.source)
		console.log('values.select:', form.values)

		// set form field values
		// console.log('form.fields:', form.fields)
	}

	// set values for form - fields
	for (let i = 0; i < form.fields.length; i++) {
		if (form.fields[i].hasOwnProperty('source')) {
			form.fields[i].items = await getValues(form.fields[i].source)
			// console.log('field:', form.fields[i].name)
			// console.log('items:', form.fields[i].items)
		}
	}

	return form

	async function getValues(sourceDefn: {}) {
		const source = new FormSource(sourceDefn)
		// console.log('getValues...')
		// console.log('source.defn:', sourceDefn)
		// console.log('source.class:', source)

		const sourceTypeSelect = source.actions[FormSourceDBAction.select]
		// console.log('sourceTypeSelect:', sourceTypeSelect)

		if (sourceTypeSelect) {
			const responsePromise = await processForm(
				sourceTypeSelect,
				FormSourceDBAction.select,
				form.pageData
			)
			const response: FormSourceResponseType = await responsePromise.json()
			// console.log('getValues.response:', response)
			return response.data
		} else {
			return {}
		}
	}
}
