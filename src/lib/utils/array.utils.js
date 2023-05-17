/** array.utils.js */

import {hasPropertyOf} from './model.utils'

export function getArray(objs) {
	objs = objs != null ? objs : []
	let array = []

	if (Array.isArray(objs)) {
		array = objs
	} else {
		array = [objs]
	}
	return array
}

export function getArrayofModels(clazz, objs) {
	objs = getArray(objs)
	const array = []

	for (const obj of objs) {
        hasPropertyOf(clazz, obj)) {
            array.push(new clazz(obj))
        }
	}
    return array
}
