import { FormSource, SubmitActionParmType, SubmitActionTarget } from '$comps/esp/form/types'
import { dbGetDoc } from '$server/dbFauna'
import { getEnvVar } from '$server/env'
import { fetchESPAPI } from '$server/esp'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/formFetch.+server.ts'

export async function formFetch(source: FormSource, data: {}) {
	const parms = setFetchParms(source, data)

	switch (source.target) {
		case SubmitActionTarget.esp_api:
			console.log('FORMFETCH - FETCHESPAPI...')
			console.log('parms:', parms)
			return await fetchESPAPI(source.method, source.url, parms)
			break

		case SubmitActionTarget.esp_sql:
			let sql = source.sql
			for (const [key, value] of Object.entries(parms)) {
				sql = sql.replace(key, value)
			}
			return await fetchESPAPI('GET', 'ws_sql_execute', { sql })
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for source.target: ${source.target}`
			})
	}
}

function setFetchParms(source: FormSource, data: {}) {
	let parms = {}
	source.parms.forEach(({ name, type, source }) => {
		switch (type) {
			case SubmitActionParmType.form:
			case SubmitActionParmType.params:
			case SubmitActionParmType.user:
				parms[name] = data[source]
				break
			case SubmitActionParmType.env:
				parms[name] = getEnvVar(source)
				break
			case SubmitActionParmType.literal:
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

export async function getForm(id: string, pageData = {}) {
	const form = await dbGetDoc('forms', id)
	form.pageData = pageData
	// console.log('formFetch.getForm...')
	// console.log('form:', id)
	// console.log('pageData:', form.pageData)

	async function getValues(sourceDefn: {}) {
		const source = new FormSource(sourceDefn)
		// console.log('getValues...')
		// console.log('sourceDefn:', sourceDefn)
		// console.log('source:', source)

		const response = await formFetch(source, form.pageData)
		const values = await response.json()

		return values
	}

	// set values for form
	if (form.sourceRetrieve) {
		form.values = await getValues(form.sourceRetrieve)
		// console.log('values:', form.values)
	}

	// set values for form - fields
	for (let i = 0; i < form.fields.length; i++) {
		if (form.fields[i].hasOwnProperty('source')) {
			form.fields[i].items = await getValues(form.fields[i].source)
			// console.log('items:', form.fields[i].items)
		}
	}

	return form
}
