/** array.utils.js */

export function getArray(obj: any) {
	obj = obj != null && obj != undefined ? obj : []
	let arr = []

	if (Array.isArray(obj)) {
		arr = obj
	} else {
		arr = [obj]
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
