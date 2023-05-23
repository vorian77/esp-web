import { writable } from 'svelte/store'

const { subscribe, set, update } = writable([])

const del = (type, key) => {
	const dataKey = getDataKey(type, key)
	update((bus) => {
		return bus.filter((i) => i.key !== dataKey)
	})
}
const get = (type, key) => {
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
const upsert = (type, key, value) => {
	del(type, key)
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
	const formData = get(type, key)
	console.log('getItemFieldValue', type, key)
	const field = formData.find((f) => f.name == fieldName)
	if (field) {
		return field.value
	}
	return undefined
}
export default {
	del,
	get,
	getItemFieldValue,
	reset,
	subscribe,
	upsert
}

// usage
//import DATABUS from '$lib/utils/databus.utils'
//DATABUS.upsert('cookie', 'user', {nameFirst: 'Phyllip', nameLast: 'Hall', phoneMobile: '2487985578', password: 'xxx'})
//DATABUS.get(''phyl') > 'boy'
