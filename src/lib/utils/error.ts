import { getValueOrDefault } from '$lib/utils/utils'

export class espError {
	file: string
	source: string // function, object, feature in file where error occurred
	message: string
	code: string | null

	constructor(obj) {
		obj = getValueOrDefault(obj, {})
		this.file = getValueOrDefault(obj.file, '')
		this.source = getValueOrDefault(obj.file, '')
		this.message = getValueOrDefault(obj.file, '')
		this.code = getValueOrDefault(obj.file, '')
	}
}
