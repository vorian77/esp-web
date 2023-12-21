<script lang="ts">
	import type { DataObj } from '$comps/types'
	import DataObjActions from '$comps/dataObj/DataObjActions.svelte'
	import { DataObjStatus, NavState, SurfaceType } from '$comps/types'
	import { createEventDispatcher } from 'svelte'
	import { appObjStatusStore } from '$comps/nav/app'

	const dispatch = createEventDispatcher()

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let surface: SurfaceType
	export let dataObj: DataObj

	const isHeader = true

	let appObjStatus: DataObjStatus
	let isEditing = false
	$: {
		appObjStatus = Object.assign(new DataObjStatus(), $appObjStatusStore)
		isEditing = appObjStatus.objHasChanged
	}

	let classPopup = ''
	let classPopupHeader = ''
	$: {
		classPopup = dataObj.isPopup ? 'grid grid-cols-10 gap-4' : ''
		classPopupHeader = dataObj.isPopup ? 'col-span-9' : ''
	}

	function cancel(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

<div class="mb-7">
	{#if surface === SurfaceType.overlay}
		<div class="flex justify-between">
			<div>
				<div class="grid grid-cols-10 gap-4">
					<div class="col-span-9">
						<h1 class="h1">{dataObj.header}</h1>
					</div>
				</div>
			</div>
			<div class="flex">
				<DataObjActions {stateAdd} {stateGlobal} {dataObj} justify={'end'} {isHeader} />
				<div>
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled-error ml-2"
						on:click={cancel}>X</button
					>
				</div>
			</div>
		</div>
		{#if dataObj.subHeader}
			<h4 class="h4 text-gray-500">{dataObj.subHeader}</h4>
		{/if}
	{:else if surface === SurfaceType.page}
		<div class="flex justify-between items-start">
			<h1 class="h1">{dataObj.header}</h1>
			<DataObjActions {stateAdd} {stateGlobal} {dataObj} justify={'end'} {isHeader} />
		</div>

		{#if dataObj.subHeader}
			<h4 class="h4 text-gray-500">{dataObj.subHeader}</h4>
		{/if}
	{:else if surface === SurfaceType.tab}
		{#if dataObj.subHeader}
			<div class="mb-4">
				<h4 class="h4 text-gray-500">{dataObj.subHeader}</h4>
			</div>
		{/if}
		<div class="flex justify-between">
			<DataObjActions {stateAdd} {stateGlobal} {dataObj} justify={'start'} {isHeader} />
			{#if isEditing}
				<div class="mr-4"><p class="text-lg text-blue-600">Editing...</p></div>
			{/if}
		</div>
	{/if}
</div>
