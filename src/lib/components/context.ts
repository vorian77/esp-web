import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

// let img = writable('some text')
let img = 'abc'

export function setImg() {
	setContext('img', img)
}

export function getImg() {
	return getContext('img')
}
