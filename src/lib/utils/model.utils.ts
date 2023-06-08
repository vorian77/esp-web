import { error } from '@sveltejs/kit'

const FILENAME = '/utils/model.utils.js'

export function booleanOrFalse(val, name) {
	if (!val) {
		return false
	} else if (typeof val === 'boolean') {
		return val
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'booleanOrFalse',
			message: `Value: "${val} for Field: "${name}" is expected to be typeof "boolean" but is typeof "${typeof val}".`
		})
	}
}
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
export function memberOfEnum(val: string, enumName: string, enumObj) {
	if (!val) {
		throw error(500, {
			file: FILENAME,
			function: `memberOfEnum`,
			message: `No value supplied for ${enumName}.`
		})
	}
	for (const value of Object.values(enumObj)) {
		if (val.toLowerCase() == value.toLowerCase()) {
			return value
		}
	}
	throw error(500, {
		file: FILENAME,
		function: `memberofEnum`,
		message: `"${val}" is not member of enum ${JSON.stringify(enumObj)}.`
	})
}
export function memberOfEnumOrDefault(val: string, enumName: string, enumObj, defaultVal: string) {
	if (!val) {
		return defaultVal
	}
	return memberOfEnum(val, enumName, enumObj)
}
export function nbrOptional(val, name) {
	if (!val) {
		return undefined
	}
	return nbrRequired(val, name)
}
export function nbrRequired(val, name) {
	if (typeof val === 'number') {
		return val
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'nbrRqd',
			message: `Required value: "${name}" - is undefined or has an invlid value: "${val}".`
		})
	}
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
export function strOptional(val, name) {
	if (!val) {
		return undefined
	}
	return strRequired(val, name)
}
export function strRequired(val, name) {
	if (typeof val === 'string') {
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
export function valueOrDefault(val, defaultVal) {
	return val != null ? val : defaultVal
}
