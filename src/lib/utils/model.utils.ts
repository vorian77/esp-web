/** model.utils.js */

import { error } from '@sveltejs/kit'

const FILENAME = '/utils/model.utils.js'

export function hasPropertyOf(clazz, obj) {
	const model = new clazz()
	const modelKeys = Object.keys(model)

	for (const key of modelKeys) {
		if (obj.hasOwnProperty(key)) {
			// true if target has a single property of clazz
			return true
		}
	}
	return false
}
export function booleanOrFalse(val, name) {
	if (!val) {
		return false
	} else if (typeof val === 'boolean') {
		return val
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'booleanOrFalse',
			message: `Value: "${value} for Field: "${name}" is expected to be typeof "boolean" but is typeof "${typeof val}".`
		})
	}
}
export function isInstanceOf(clazz, obj) {
	const model = new clazz()
	const modelKeys = Object.keys(model)

	for (const key of modelKeys) {
		if (!obj.hasOwnProperty(key)) {
			// false if obj is missing any properties of clazz
			return false
		}
	}
	return true
}
export function memberOfEnum(val, enumName, enumType) {
	if (Object.values(enumType).includes(val)) {
		return val
	} else {
		throw error(500, {
			file: FILENAME,
			function: `memberOfEnum: ${enumName}`,
			message: `"${val}" is not member of enum ${JSON.stringify(enumType)}.`
		})
	}
}
export function valueOrDefault(val, defaultVal) {
	return val != null ? val : defaultVal
}
export function strAppend(currentVal, newVal, separator = ' ') {
	if (currentVal) {
		currentVal += separator
	}
	return currentVal + newVal
}
export function strLower(val) {
	if (val) {
		return val.toLowerCase()
	}
}
export function strRqd(val, name) {
	if (typeof val === 'string' && val) {
		return val
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'strRqd',
			message: `Required value: "${name}" - is undefined or has an invlid value: "${val}".`
		})
	}
}
export function strUpper(val) {
	if (val) {
		return val.toUpperCase()
	}
}
export function strValid(val) {
	if (typeof val === 'string' || val instanceof String) {
		// it's a string
		return JSON.stringify(val)
	} else {
		// it's something else
		throw error(500, {
			file: FILENAME,
			function: 'strValid',
			message: `"${val}" is not a valid string.`
		})
	}
}
