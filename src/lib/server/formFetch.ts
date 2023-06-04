import { FormSource, SubmitActionParmType, SubmitActionTarget } from '$comps/esp/form/types'
import { getEnvVar } from '$server/env'
import { fetchESP } from '$server/esp'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/formFetch.+server.ts'

export async function formFetch(source: FormSource, data: {}) {
	console.log('formFetch.ts...')
	console.log(source)
	const parms = setSubmitActionParms(source, data)

	switch (source.target) {
		case SubmitActionTarget.esp_api:
			return await fetchESP(source, parms)
			break

		case SubmitActionTarget.esp_sql:
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for source.target: ${source.target}`
			})
	}
}

function setSubmitActionParms(source: FormSource, data: {}) {
	switch (source.target) {
		case SubmitActionTarget.esp_api:
			let parms = {}
			source.parms.forEach(({ name, type, source }) => {
				switch (type) {
					case SubmitActionParmType.clone:
						parms[name] = data[name]
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
							function: 'setSubmitActionParms',
							message: `No case defined for Form.source.parms.type: "${type}".`
						})
				}
			})
			return parms
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'setSubmitActionParms',
				message: `No case defined for Form.source.target: "${source.target}".`
			})
	}
}
