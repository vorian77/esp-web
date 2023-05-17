/** date.utils.js */

export function formatDate(date) {
	let formattedDate = ''
	try {
		formattedDate = new Date(date).toLocaleDateString()
	} catch (err) {
		console.error('dateUtils.formatDate - Invalid date: ', date)
	}
	return formattedDate
}

export function isValidDate(date) {
	let isValid = true
	try {
		let d = new Date(date)
		isValid = d.toString() !== 'Invalid Date'
	} catch (err) {
		console.error('dateUtils.isValidDate - Invalid Date: ', date)
		isValid = false
	}
	return isValid
}
