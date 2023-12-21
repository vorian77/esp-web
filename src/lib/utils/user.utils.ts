import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { User } from '$comps/types'

export let appUserStore = localStorageStore('appUser', {})

export function setUser(newUser: any) {
	appUserStore.set(newUser)
}
export function getUser() {
	const user = get(appUserStore)
	return user && Object.keys(user).length > 0 ? new User(user) : undefined
}

export function resetLocalStorage() {
	// console.log('resetLocalStorage...')
	// appUser.set({})
	// localStorage.removeItem('appAction')
	// localStorage.removeItem('navParms')
	// localStorage.removeItem('appStatus')
	// localStorage.removeItem('appUser')
}
