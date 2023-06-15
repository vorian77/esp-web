import {
	FormSource,
	FormSourceAction,
	FormSourceDBAction,
	FormSourceItem,
	FormSourceItemSource,
	FormSourceResponse,
	FormSourceTarget
} from '$comps/esp/form/types'
import type { Field } from '$comps/esp/form/field'

import { dbGetForm } from '$server/dbMongo'
import { getEnvVar } from '$server/env'
import { dbESP } from '$server/dbESP'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/dbForm.ts'

export async function getForm(formName: string, pageData = {}) {
	// retrieve form file
	console.log()
	console.log('getForm:', formName)
	const form = await dbGetForm(formName)
	form.pageData = pageData

	// check for data source
	if (!form.hasOwnProperty('source')) {
		return form
	}

	// attempt to retrieve form data
	form.values = await getValues(formName, form.source, pageData)

	// check for content
	if (JSON.stringify(form.values) === '{}') {
		return form
	}

	// check for form fields
	if (!form.hasOwnProperty('fields')) {
		return form
	}

	// get source action items to map data to form fields
	const source = new FormSource(form.source)
	const sourceSelect: FormSourceAction =
		source.actions[source.actionsMap[FormSourceDBAction.select]]

	// set form field values
	for (const [key, value] of Object.entries(form.values)) {
		const item = sourceSelect.items.find((i: FormSourceItem) => i.dbName == key)
		if (item) {
			const fieldIdx = form.fields.findIndex((f: Field) => f.name == item.fieldName)
			if (fieldIdx >= 0) {
				form.fields[fieldIdx].value = value
			}
		}
	}

	// retrieve drop-down-list field items
	for (let i = 0; i < form.fields.length; i++) {
		if (form.fields[i].hasOwnProperty('source')) {
			form.fields[i].items = await getValues(form.fields[i].name, form.fields[i].source, pageData)
		}
	}

	return form
}

async function getValues(sourceName: string, formSource: {}, data: {}) {
	const source = new FormSource(formSource)
	const respPromise = await processForm(sourceName, source, FormSourceDBAction.select, data, true)
	const resp = await respPromise.json()
	return resp.data
}

export async function processForm(
	formName: string,
	source: FormSource,
	dbAction: FormSourceDBAction,
	data: {},
	optional = false
) {
	// get source
	const actionIdx = source.actionsMap[dbAction]
	if (actionIdx < 0) {
		if (optional) {
			// return []
			return FormSourceResponse({})
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'processForm',
				message: `Form ${formName} does not contain source with dbAction: ${dbAction}.`
			})
		}
	}
	const sourceAction = source.actions[actionIdx]

	// place parm values into items
	sourceAction.items = setParmVals(sourceAction, data)
	console.log('ProcessForm.items:', sourceAction.items)

	// execute sourceAction
	switch (sourceAction.target) {
		case FormSourceTarget.esp:
			return await dbESP(sourceAction, dbAction)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processForm',
				message: `No case defined for sourceAction.target: ${sourceAction.target}`
			})
	}

	function setParmVals(sourceAction: FormSourceAction, data: Record<string, any>) {
		console.log('setParmVals.data:', data)
		sourceAction.items.forEach(({ source, sourceKey }, i) => {
			switch (source) {
				case FormSourceItemSource.data:
				case FormSourceItemSource.form:
					sourceAction.items[i].value = data[sourceKey]
					break
				case FormSourceItemSource.env:
					sourceAction.items[i].value = getEnvVar(sourceKey)
					break
				case FormSourceItemSource.literal:
				case FormSourceItemSource.subquery:
					sourceAction.items[i].value = sourceKey
					break
				case FormSourceItemSource.system:
					switch (sourceKey) {
						case 'date':
							sourceAction.items[i].value = new Date().toDateString()
							break
						case 'datetime':
							sourceAction.items[i].value = new Date().toString()
							break
						default:
							throw error(500, {
								file: FILENAME,
								function: 'setParmVals',
								message: `No case defined for FormSourceAction.FormSourceItemSource: "${source}" type: ${sourceKey}.`
							})
					}
					break // nested case
				default:
					throw error(500, {
						file: FILENAME,
						function: 'setParmVals',
						message: `No case defined for FormSourceAction.FormSourceItemSource: "${source}".`
					})
			}
		})
		return sourceAction.items
	}
}
