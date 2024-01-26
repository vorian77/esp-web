<script lang="ts">
	import type { DataObj } from '$comps/types'
	import { NodeType } from '$comps/types'
	import DataObjActions from '$comps/dataObj/DataObjActions.svelte'
	import { SurfaceType } from '$comps/types.master'
	import type { State } from '$comps/nav/types.appState'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let state: State
	export let dataObj: DataObj

	const isHeader = true

	let isEditing = false
	$: isEditing = state.objHasChanged && state.surface === SurfaceType.default

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

<div class="mt-6 mb-4">
	{#if state.nodeType === NodeType.object}
		<div class="flex justify-between items-start">
			<h2 class="h2 ml-2">{dataObj.header}</h2>
			<div class="flex">
				{#if isEditing}
					<div class="mr-4"><p class="text-lg text-blue-600">Editing...</p></div>
				{/if}
				{#if state.surface === SurfaceType.overlay}
					<div>
						<button
							type="button"
							class="btn-icon btn-icon-sm variant-filled-error ml-2"
							on:click={cancel}>X</button
						>
					</div>
				{/if}
			</div>
		</div>
		{#if dataObj.subHeader}
			<h4 class="h4 text-gray-500">{dataObj.subHeader}</h4>
		{/if}
	{:else if state.nodeType === NodeType.programObject}
		{#if dataObj.subHeader}
			<div class="mb-4">
				<h4 class="h4 text-gray-500">{dataObj.subHeader}</h4>
			</div>
		{/if}
		<div class="flex justify-between">
			<DataObjActions {state} {dataObj} justify={'start'} {isHeader} />
			<div class="flex">
				{#if isEditing}
					<div class="mr-4"><p class="text-lg text-blue-600">Editing...</p></div>
				{/if}
				{#if state.surface === SurfaceType.overlay}
					<div>
						<button
							type="button"
							class="btn-icon btn-icon-sm variant-filled-error ml-2"
							on:click={cancel}>X</button
						>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
