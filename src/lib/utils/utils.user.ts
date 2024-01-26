import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { User, type DataObjRecord } from '$comps/types'

export let appStoreUser = localStorageStore('appStoreUser', {})

export function userSet(newUser: any) {
	appStoreUser.set(newUser)
}
export function userGet() {
	const user = get(appStoreUser)
	return user && Object.keys(user).length > 0 ? new User(user) : undefined
}

export function userUpdate(record: DataObjRecord | undefined) {
	let user = userGet()
	if (user && record) {
		user.updateName(record)
		userSet(user)
	}
}
