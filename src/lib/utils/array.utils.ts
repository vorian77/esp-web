/** array.utils.js */

import { hasPropertyOf } from '$lib/utils/utils'

export function getArray(objs) {
	objs = objs != null ? objs : []
	let arr = []

	if (Array.isArray(objs)) {
		arr = objs
	} else {
		arr = [objs]
	}
	return arr
}

export function getArrayOfModels(clazz, objs) {
	objs = getArray(objs)
	const arr = []
	for (const obj of objs) {
		arr.push(new clazz(obj))
	}
	return arr
}

export function getArrayItemFirst(val, dflt) {
	if (val == null) {
		return dflt
	} else if (Array.isArray(val)) {
		if (val.length == 0) {
			return dflt
		} else {
			return val[0]
		}
	}
}
