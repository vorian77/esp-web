import {
	FormSource,
	FormSourceAction,
	FormSourceDBAction,
	FormSourceItem,
	FormSourceItemSource,
	getServerResponse,
	FormSourceTarget
} from '$comps/types'
import type { Field } from '$comps/form/field'

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

	// <temp> 230815: auto login - must be removed prior to production deployment
	if (formName === 'auth_login') {
		form.fields[0].value = '2489999999'
		form.fields[1].value = 'JakeDog#1'
		// console.log('form.values:', form.fields)
	}

	// retrieve drop-down-list field items
	if (form.fields) {
		for (let i = 0; i < form.fields.length; i++) {
			if (form.fields[i].hasOwnProperty('source')) {
				form.fields[i].items = await getValues(form.fields[i].name, form.fields[i].source, pageData)
			}
		}
	}

	// set field values
	if (JSON.stringify(form.values) === '{}' || !form.hasOwnProperty('fields')) {
		return form
	}

	// get source action items to map data to form fields
	const source = new FormSource(form.source)
	const sourceSelect: FormSourceAction =
		source.actions[source.actionsMap[FormSourceDBAction.select]]

	// set form field values
	for (const [key, value] of Object.entries(form.values)) {
		const item = sourceSelect.items.find((i: FormSourceItem) => i.dbSelect && i.dbName == key)
		if (item) {
			const fieldIdx = form.fields.findIndex((f: Field) => f.name == item.fieldName)
			if (fieldIdx >= 0) {
				form.fields[fieldIdx].value = value
			}
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
	sourceName: string,
	source: FormSource,
	dbAction: FormSourceDBAction,
	data: {},
	optional = false
) {
	// get source
	const actionIdx = source.actionsMap[dbAction]

	if (actionIdx < 0) {
		if (optional) {
			return getServerResponse({})
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'processForm',
				message: `Form ${sourceName} does not contain source with dbAction: ${dbAction}`
			})
		}
	}
	const sourceAction = source.actions[actionIdx]

	// place parm values into items
	sourceAction.items = setParmVals(sourceAction, data)

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
					sourceAction.items[i].value = sourceKey
					break
				case FormSourceItemSource.system:
					switch (sourceKey) {
						case 'date':
							sourceAction.items[i].value = new Date().toLocaleDateString()
							break
						case 'datetime':
							// 6/15/2023 8:23:27 AM'
							let dt = new Date().toLocaleString()
							dt = dt.replace(',', '')
							const arrDateTime = dt.split(' ')
							const arrDate = arrDateTime[0].split('/')
							const dateStr =
								arrDate[2] +
								'-' +
								String(arrDate[0]).padStart(2, '0') +
								'-' +
								String(arrDate[1]).padStart(2, '0') +
								' ' +
								arrDateTime[1] +
								' ' +
								arrDateTime[2]
							sourceAction.items[i].value = dateStr
							break
						default:
							throw error(500, {
								file: FILENAME,
								function: 'setParmVals',
								message: `No case defined for FormSourceAction.FormSourceItemSource: "${source}" type: ${sourceKey}`
							})
					}
					break // nested case
				case FormSourceItemSource.none:
					break
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
