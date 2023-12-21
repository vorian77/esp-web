<script lang="ts">
	import DataObjActions from '$comps/dataObj/DataObjActions.svelte'
	import type { DataObj, SurfaceType } from '$comps/types'
	import { DataObjStatus } from '$comps/types'
	import type { NavState } from '$comps/nav/types.app'
	import { appObjStatusStore } from '$comps/nav/app'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let dataObj: DataObj
	const isHeader = false

	let appObjStatus: DataObjStatus
	let hidden = false

	$: {
		appObjStatus = Object.assign(new DataObjStatus(), $appObjStatusStore)
		hidden = !appObjStatus.objHasChanged || dataObj.actions.length === 0
	}
</script>

<div class="border-t-2 mt-10 mb-6" {hidden}>
	<div class="mt-4">
		<DataObjActions {stateAdd} {stateGlobal} {dataObj} justify={'end'} {isHeader} />
	</div>
</div>
