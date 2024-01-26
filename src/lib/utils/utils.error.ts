import { strAppend, valueOrDefault } from '$lib/utils/utils'

export class espError {
	message: string
	file: string | undefined
	source: string | undefined // function, object, feature in file where error occurred
	code: number | undefined

	constructor(args: [string, string?, string?, number?]) {
		let err = ''
		this.message = valueOrDefault(args[0], 'No message supplied to error.')

		if (args.length > 1) {
			this.file = args[1]
			err = strAppend(err, `FILE: ${this.file}`)
		}

		if (args.length > 2) {
			this.source = args[2]
			err = strAppend(err, `SOURCE: ${this.source}`)
		}

		if (args.length > 2) {
			this.code = args[3]
			err = strAppend(err, `CODE: ${this.code}`)
		}
		this.message = strAppend(err, `MESSAGE: ${this.message}`)
		console.error(this.message)
	}
}

// const e = new espError(['err message', '+page.server.ts', 'formInit', 55])
