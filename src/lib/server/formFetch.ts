import { SubmitAction, SubmitActionParmType, SubmitActionTarget } from '$comps/esp/form/types'
import { getEnvVar } from '$server/env'
import { fetchESP } from '$server/esp'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/formFetch.+server.ts'

export async function formFetch(submitAction: SubmitAction, data: {}) {
	const parms = setSubmitActionParms(submitAction, data)

	switch (submitAction.target) {
		case SubmitActionTarget.esp_api:
			return await fetchESP(submitAction, parms)
			break

		case SubmitActionTarget.esp_sql:
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for SubmitAction.target: ${submitAction.target}`
			})
	}
}

function setSubmitActionParms(submitAction: SubmitAction, data: {}) {
	switch (submitAction.target) {
		case SubmitActionTarget.esp_api:
			let parms = {}
			submitAction.parms.forEach(({ name, type, source }) => {
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
							function: 'submitActionData',
							message: `No case defined for Form.SubmitAction.parms.type: "${type}".`
						})
				}
			})
			return parms
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'setSubmitActionParms',
				message: `No case defined for Form.submitAction.target: "${submitAction.target}".`
			})
	}
}
