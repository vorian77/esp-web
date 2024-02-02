<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import FormList from '$comps/form/FormList.svelte'
	import OverlayObjForm from '$comps/Overlay/OverlayObjForm.svelte'
	import type { OverlayNode } from '$comps/form/field'
	import { getModalStore } from '@skeletonlabs/skeleton'

	const modalStore = getModalStore()
	export let parent: SvelteComponent
	let overlayNode: OverlayNode = $modalStore[0].meta.overlayNode
	const cBase = 'card p-4 w-modal-wide shadow-xl space-y-4'

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(overlayNode)
		modalStore.close()
	}
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<!-- <OverlayObjForm bind:overlayNode on:formCancelled={parent.onClose} /> -->
		<FormList {state} {dataObj} {dataObjData} on:formCancelled />

		<!-- prettier-ignore -->
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{overlayNode.btnLabelComplete}</button>
		</footer>
	</div>
{/if}
