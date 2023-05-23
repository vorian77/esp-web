export function escalate(formDefn, event, elements) {
	const validity = event.detail
	switch (validity.type) {
		case 'matchColumn':
			// get values
			let newValidity = {}
			const form = document.getElementById(formDefn.id)
			const formData = new FormData(form)
			const values = validity.fieldGroup.map((item) => formData.get(item.name))

			// set new validity
			if (values.every((val, i, arr) => val === arr[0])) {
				// equal - fields are valid
				newValidity = undefined
			} else {
				newValidity = {
					type: validity.type,
					message: validity.message
				}
				if (values.some((v) => !v)) {
					// one field blank/incomplete
					newValidity['level'] = 'warning'
				} else {
					// both fields are entered
					newValidity['level'] = 'error'
				}
			}
			// process newValidity
			validity.fieldGroup.forEach((item) => {
				elements[item.index].setValidity(newValidity)
			})
			break
	}
}
