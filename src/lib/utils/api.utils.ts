export function getResponseObj(val, dflt: {}) {
	if (val == null) {
		return dflt
	}
	if (Array.isArray(val)) {
		if (val.length == 0) {
			return dflt
		}
		return val[0]
	}
	if (typeof val === 'object') {
		return val
	}
	return { val }
}
