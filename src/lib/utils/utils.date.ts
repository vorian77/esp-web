/** date.utils.js */

export function formatDate(val: any) {
	let formattedDate = ''
	try {
		formattedDate = new Date(val).toLocaleDateString()
	} catch (err) {
		console.error('/utils/dateUtils.formatDate - Invalid date: ', val)
	}
	return formattedDate
}

export function formatDateTime(val: any) {
	if (!val) return val
	let formattedDate = ''
	try {
		formattedDate = new Date(val).toLocaleString()
		// <todo> - 231030 accomodate timezone?
		// const offset = value.getTimezoneOffset()
		// value = new Date(value.getTime() - offset * 60 * 1000)
		// return value.toISOString().split('T')[0]
	} catch (err) {
		console.error('/utils/dateUtils.formatDate - Invalid date: ', val)
	}
	return formattedDate
}

export function isValidDate(date) {
	if (!date) return false
	let isValid = true
	try {
		let d = new Date(date)
		isValid = d.toString() !== 'Invalid Date'
	} catch (err) {
		console.error('/utils/dateUtils.isValidDate - Invalid Date: ', date)
		isValid = false
	}
	return isValid
}
