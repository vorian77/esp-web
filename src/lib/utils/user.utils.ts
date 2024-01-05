import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { User } from '$comps/types'

export let appStoreUser = localStorageStore('appStoreUser', {})

export function setUser(newUser: any) {
	appStoreUser.set(newUser)
}
export function getUser() {
	const user = get(appStoreUser)
	return user && Object.keys(user).length > 0 ? new User(user) : undefined
}
