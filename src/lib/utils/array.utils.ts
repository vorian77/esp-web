/** array.utils.js */

export function getArray(objs: any) {
	objs = objs != null && objs != undefined ? objs : []
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
