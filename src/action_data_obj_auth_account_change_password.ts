import type { DrawerSettings } from '@skeletonlabs/skeleton'
import { createEventDispatcher, onMount } from 'svelte'
import type { FieldCustomParmsAction } from '$comps/form/fieldCustom'

const drawerStore: any = undefined

// onMount(() => {
// 	// const drawerStore = getDrawerStore()
// })

export default async function customAction(
	drawerStore: any,
	action: FieldCustomParmsAction,
	data: any
) {
	console.log('MyChangePassword:', { action, data })
	// openDrawer(drawerStore, 'data_obj_auth_login')
}

function openDrawer(drawerStore: any, dataObjName: string) {
	const settings: DrawerSettings = {
		id: 'auth',
		position: 'bottom',
		height: 'h-[30%]',
		meta: {
			dataObjName,
			undefined,
			onCloseDrawer: () => alert('close drawer')
		}
	}
	drawerStore.open(settings)
}
