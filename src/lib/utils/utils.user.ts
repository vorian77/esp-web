import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { User, type DataObjRecord } from '$comps/types'
import { apiFetch, ApiFunction, TokenApiUserId } from '$lib/api'
import { error } from '@sveltejs/kit'

export let appStoreUser = localStorageStore('appStoreUser', {})

export function userSet(newUser: any) {
	appStoreUser.set(newUser)
}
export function userGet() {
	const user = get(appStoreUser)
	return user && Object.keys(user).length > 0 ? new User(user) : undefined
}

export async function userInit(userId: string) {
	const result = await apiFetch(ApiFunction.dbEdgeGetUser, new TokenApiUserId(userId))
	if (result.success) {
		const user = new User(result.data)
		console.log('utils.user.userInit.result:', { user })
		appStoreUser.set(user)
		return user
	} else {
		error(500, {
			file: 'utils.user.ts',
			function: 'userInit',
			message: `Unable to initialize user: ${userId}`
		})
	}
}

export function userUpdate(parms: DataObjRecord | undefined) {
	let user = userGet()
	if (user && parms) {
		user.update(parms)
		userSet(user)
	}
}
