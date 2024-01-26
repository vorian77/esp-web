import { getArray } from '$utils/utils.array'
import { error } from '@sveltejs/kit'

const FILENAME = '/utils/model.utils.js'

export function booleanOrFalse(val: any, name: string) {
	if (!val) {
		return false
	} else if (typeof val === 'boolean') {
		return val
	} else {
		error(500, {
			file: FILENAME,
			function: 'booleanOrFalse',
			message: `Value: (${val}) for Field: (${name}) is expected to be typeof "boolean" but is typeof (${typeof val}).`
		})
	}
}
export function hasPropertyOf(clazz: any, obj: any) {
	const model = new clazz()
	const modelKeys = Object.keys(model)

	for (const key of modelKeys) {
		if (Object.hasOwn(obj, key)) {
			// true if target has a single property of clazz
			return true
		}
	}
	return false
}
export function isInstanceOf(clazz: any, obj: any) {
	const model = new clazz()
	const modelKeys = Object.keys(model)

	for (const key of modelKeys) {
		if (!Object.hasOwn(obj, key)) {
			// false if obj is missing any properties of clazz
			return false
		}
	}
	return true
}

export function memberOfEnum(
	val: string,
	className: string,
	fieldName: string,
	enumName: string,
	enumObj: object
) {
	if (!val) {
		error(500, {
			file: className,
			function: `memberOfEnum: ${enumName} - Field: ${fieldName}`,
			message: `No value supplied. Elements:${Object.values(enumObj).toString()}`
		})
	}
	for (const value of Object.values(enumObj)) {
		if (val.toLowerCase() == value.toLowerCase()) {
			return value
		}
	}
	error(500, {
		file: className,
		function: `memberOfEnum: ${enumName} - Field: ${fieldName} - Value: ${val}`,
		message: `Invalid enum value for Elements: ${Object.values(enumObj).toString()}`
	})
}
export function memberOfEnumOrDefault(
	val: string,
	fieldName: string,
	className: string,
	enumName: string,
	enumObj: object,
	defaultVal: any
) {
	if (!val) {
		return defaultVal
	}
	return memberOfEnum(val, fieldName, className, enumName, enumObj)
}
export function memberOfEnumIfExists(
	val: string,
	fieldName: string,
	className: string,
	enumName: string,
	enumObj: object
) {
	if (!val) {
		return undefined
	}
	return memberOfEnum(val, fieldName, className, enumName, enumObj)
}

export function arrayOfEnums(
	vals: string,
	fieldName: string,
	className: string,
	enumName: string,
	enumObj: object
) {
	if (!vals) {
		error(500, {
			file: className,
			function: 'arrayOfEnums',
			message: `No value(s) supplied...
Field: ${fieldName}
Enum: ${enumName}
Elements:${Object.values(enumObj).toString()}`
		})
	}
	let arrVals = getArray(vals)
	let enums = new Set()

	for (let i = 0; i < arrVals.length; i++) {
		enums.add(memberOfEnum(arrVals[i], fieldName, className, enumName, enumObj))
	}
	return Array.from(enums)
}

export function nbrOptional(val: any, name: string) {
	if (!val) {
		return undefined
	}
	return nbrRequired(val, name)
}
export function nbrRequired(val: number, name: string) {
	if (typeof val === 'number') {
		return val
	} else {
		error(500, {
			file: FILENAME,
			function: 'nbrRequired',
			message: `Required value: (${name}) - is undefined or has an invlid value: (${val}).`
		})
	}
}
export function required(val: any, clazz: any, fieldName: string) {
	if (val !== undefined || val !== null) {
		return val
	} else {
		error(500, {
			file: FILENAME,
			function: clazz,
			message: `Field: ${fieldName} - is required but is undefined or null.`
		})
	}
}
export function strAppend(currentVal: string, newVal: string, separator = ' ') {
	if (currentVal) {
		currentVal += separator
	}
	return currentVal + newVal
}
export function strLower(val: string) {
	if (val) {
		return val.toLowerCase()
	}
}
export function strOptional(val: string | null | undefined, className: string, field: string) {
	if (!val) {
		return undefined
	}
	return strRequired(val, className, field)
}
export function strRequired(val: string | null | undefined, className: string, field: string) {
	if (typeof val === 'string') {
		return val
	} else {
		error(500, {
			file: className,
			function: 'strRequired',
			message: `Value: (${val}) for field: ${field} is invalid.`
		})
	}
}
export function strUpper(val: string) {
	if (val) {
		return val.toUpperCase()
	}
}
export function valueIfDefined(val: any) {
	return val !== undefined ? val : undefined
}
export function valueOrDefault(val: any, defaultVal: any) {
	return val != null ? val : defaultVal
}
