/** array.utils.js */

import { hasPropertyOf } from './model.utils'

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

export function getArrayofModels(clazz, objs) {
	objs = getArray(objs)
	const arr = []

	for (const obj of objs) {
		if (hasPropertyOf(clazz, obj)) {
			arr.push(new clazz(obj))
		}
	}
	return arr
}
