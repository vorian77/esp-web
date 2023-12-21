import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { DataObjStatus, DataObj, DataObjCardinality } from '$comps/types'
import type { NavState } from '$comps/types'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/app.ts'

export let appStateStore = localStorageStore('appState', {})
export let appObjStatusStore = localStorageStore('appObjStatus', new DataObjStatus())
export let appNodeTreeStore = localStorageStore('appNodeTree', {})
export let appActionStore = localStorageStore('appAction', {})
export let navParmsStore = localStorageStore('navParms', {})

/* AppParms */
export function setNavParms(data: any, cardinality: DataObjCardinality, isInsertMode: boolean) {
	// setAppStatusInsertMode(isInsertMode)
	// navParmsStore.set(new NavDataObjParmsDB(data, cardinality, isInsertMode))
}
export function setNavParmsDataObj(dataObj: DataObj, isInsertMode: boolean) {
	setNavParms(dataObj.data, dataObj.cardinality, isInsertMode)
}

/* AppState */
export async function triggerState(
	newState: NavState,
	fAskB4Transition: Function | undefined = undefined
) {
	if (fAskB4Transition) {
		await fAskB4Transition(newState)
	} else {
		// set callbacks
		let callbacks: Array<Function> = []
		if (newState.obj && Array.isArray(newState.obj.saveCallbacks))
			newState.obj.saveCallbacks.forEach((c) => callbacks.push(c.callback))
		if (Array.isArray(newState.callbacks)) newState.callbacks.forEach((c) => callbacks.push(c))
		callbacks.push(resetAppStatus)

		// execute callbacks
		for (const callback of callbacks) await callback()

		// set new state
		appStateStore.set(newState)
	}
}
export function resetAppState() {
	appStateStore.set({})
}

/* AppStatus */
export function getAppStatus() {
	return Object.assign(new DataObjStatus(), get(appObjStatusStore))
}
export function resetAppStatus() {
	const currentStatus = getAppStatus()
	currentStatus.reset()
	setAppStatus(currentStatus)
}
export function setAppStatus(status: DataObjStatus) {
	appObjStatusStore.set(status)
}
function setAppStatusInsertMode(isInsertMode: boolean) {
	const currentStatus = getAppStatus()
	currentStatus.setInsertMode(isInsertMode)
	setAppStatus(currentStatus)
}
// export function setAppStatusListRows(newCurrent: number, newTotal: number) {
// 	const currentStatus = getAppStatus()
// 	currentStatus.setList(newCurrent, newTotal)
// 	setAppStatus(currentStatus)
// }
export function setAppStatusObjChanged(newStatus: boolean) {
	const currentStatus = getAppStatus()
	currentStatus.setObjChanged(newStatus)
	setAppStatus(currentStatus)
}
export function setAppStatusObjValid(newStatus: boolean) {
	const currentStatus = getAppStatus()
	currentStatus.setObjValid(newStatus)
	setAppStatus(currentStatus)
}
