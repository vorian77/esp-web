// const _pipe = (a, b) => (arg) => b(a(arg))
// export const pipe = (...ops) => ops.reduce(_pipe)

const _pipe = (a, b) => (arg) => b(a(arg))
const _pipeLine = (...ops) => ops.reduce(_pipe)

export const pipe = (val, ...ops) => {
	// strPipe = pipe(strRqd, strLowerCase)
	const f = _pipeLine(...ops)
	return f(val)
}
