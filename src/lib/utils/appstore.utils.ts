import { writable } from 'svelte/store'

const { subscribe, set, update } = writable([])

export const asDelete = (key: string) => {
	update((bus) => {
		return bus.filter((i) => i.key !== key)
	})
}
export const asGet = (key: string) => {
	let item
	subscribe((value) => {
		if (value) {
			item = value.find((i) => i.key === key)
		}
	})
	return item ? item.value : {}
}
const reset = () => {
	set([])
}
export const asUpsert = (key: string, value: any) => {
	asDelete(key)
	const newItem = { key, value }
	update((bus) => {
		return [...bus, newItem]
	})
	return newItem
}

export default {
	del: asDelete,
	get: asGet,
	reset,
	subscribe,
	upsert: asUpsert
}

// usage
//import {asGet, asDelete, asUpsert} from '$lib/utils/utils'
//asUpsert('image_file', file)
//const file = asGet('image_file')
