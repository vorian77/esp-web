<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import FormList from '$comps/form/FormList.svelte'
	import Form from '$comps/form/Form.svelte'
	import { FieldListChips } from '$comps/form/fieldListChips'
	import {
		DataObj,
		DataObjCardinality,
		DataObjData,
		DataObjRecordRow,
		DataObjRecordStatus,
		NodeType
	} from '$comps/types'
	import { SurfaceType } from '$comps/types.master'
	import { StateOverlayModal, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'

	const FILENAME = '/$comps/overlay/OverlayModalItems.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let parent: SvelteComponent
	let state: StateOverlayModal = $modalStore[0].meta.state

	let btnLabelComplete = state.btnLabelComplete || 'Complete'

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(state.selectedRows)
		modalStore.close()
	}
</script>

{#if $modalStore[0]}
	<div class="esp-card-space-y w-modal-wide">
		<Form {state} on:formCancelled={parent.onClose} />

		<!-- prettier-ignore -->
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{btnLabelComplete}</button>
		</footer>
	</div>
{/if}
