/** model.utils.js */

import { espError } from '$utils/utils'
import { error } from '@sveltejs/kit'

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
export function memberOfEnum(val, enumVals) {
	if (Object.values(enumVals).includes(val)) {
		return val
	} else {
		throw error(500, {
			message: `"${val}" is not member of enum ${JSON.stringify(enumVals)}.`,
			codeFile: 'model.utils.js',
			sourceObject: 'memberOfEnum'
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
export function strRqd(val, fieldName) {
	if ((typeof val === 'string' || val instanceof String) && val) {
		return val
	} else {
		throw error(500, {
			message: `For required field "${fieldName}", no (or invlid) value supplied "${val}".`,
			codeFile: 'model.utils.js',
			sourceObject: 'strRqd'
		})
	}
}
export function strValid(val) {
	if (typeof val === 'string' || val instanceof String) {
		// it's a string
		return JSON.stringify(val)
	} else {
		// it's something else
		throw error(500, {
			message: `"${val}" is not a valid string.`,
			codeFile: 'model.utils.js',
			sourceObject: 'strValid'
		})
	}
}
