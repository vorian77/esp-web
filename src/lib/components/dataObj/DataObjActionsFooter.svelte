<script lang="ts">
	import DataObjActions from '$comps/dataObj/DataObjActions.svelte'
	import type { DataObj } from '$comps/types'
	import type { State } from '$comps/nav/types.app'
	import { SurfaceType } from '$comps/types.master'

	export let state: State
	export let dataObj: DataObj
	const isHeader = false

	let hidden = false
	$: hidden =
		state.surface === SurfaceType.default
			? dataObj.actionsField.length === 0 || !state.objHasChanged
			: true
</script>

<div class="border-t-2 mt-10 mb-6" {hidden}>
	<div class="mt-4">
		<DataObjActions {state} {dataObj} justify={'end'} {isHeader} />
	</div>
</div>
