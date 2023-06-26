import { writable } from 'svelte/store'

const { subscribe, set, update } = writable([])

export const asDelete = (type, key) => {
	const dataKey = getDataKey(type, key)
	update((bus) => {
		return bus.filter((i) => i.key !== dataKey)
	})
}
export const asGet = (type, key) => {
	const dataKey = getDataKey(type, key)
	let item
	subscribe((value) => {
		if (value) {
			item = value.find((i) => i.key === dataKey)
		}
	})
	return item ? item.value : {}
}
const reset = () => {
	set([])
}
export const asUpsert = (type, key, value) => {
	asDelete(type, key)
	const dataKey = getDataKey(type, key)
	const newItem = { key: dataKey, value }
	update((bus) => {
		return [...bus, newItem]
	})
	return newItem
}
const getDataKey = (type, key) => {
	return type + '.' + key
}
const getItemFieldValue = (type, key, fieldName) => {
	const formData = asGet(type, key)
	const field = formData.find((f) => f.name == fieldName)
	if (field) {
		return field.value
	}
	return undefined
}
export default {
	del: asDelete,
	get: asGet,
	getItemFieldValue,
	reset,
	subscribe,
	upsert: asUpsert
}

// usage
//import {asGet, asDelete, asUpsert} appStore from '$lib/utils'
//asUpsert('cookie', 'user', {nameFirst: 'Phyllip', nameLast: 'Hall', phoneMobile: '2487985578', password: 'xxx'})
//asGet(''phyl') > 'boy'
