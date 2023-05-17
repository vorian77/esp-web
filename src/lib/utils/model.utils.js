/** model.utils.js */

export function getValueOrDefault(val, defaultVal) {
	return val != null ? val : defaultVal
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
