<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import OverlayObjForm from '$comps/Overlay/OverlayObjForm.svelte'
	import type { OverlayNodeRecord } from '$comps/types.overlay'
	import { getModalStore } from '@skeletonlabs/skeleton'

	const modalStore = getModalStore()
	export let parent: SvelteComponent
	let overlayNodeRecord: OverlayNodeRecord = $modalStore[0].meta.overlayNodeRecord

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(overlayNodeRecord)
		modalStore.close()
	}
</script>

{#if $modalStore[0]}
	<div class="esp-card-space-y w-modal-wide">
		<OverlayObjForm bind:overlayNodeRecord on:formCancelled={parent.onClose} />

		<!-- prettier-ignore -->
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{overlayNodeRecord.btnLabelComplete}</button>
		</footer>
	</div>
{/if}
