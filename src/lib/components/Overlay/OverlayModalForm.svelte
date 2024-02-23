<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import OverlayObjForm from '$comps/Overlay/OverlayObjForm.svelte'
	import type { OverlayRecord } from '$comps/Overlay/types.overlay'
	import { getModalStore } from '@skeletonlabs/skeleton'

	const modalStore = getModalStore()
	export let parent: SvelteComponent
	let overlayRecord: OverlayRecord = $modalStore[0].meta.OverlayRecord

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(overlayRecord)
		modalStore.close()
	}
</script>

{#if $modalStore[0]}
	<div class="esp-card-space-y w-modal-wide">
		<OverlayObjForm bind:overlayRecord on:formCancelled={parent.onClose} />

		<!-- prettier-ignore -->
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{overlayRecord.btnLabelComplete}</button>
		</footer>
	</div>
{/if}
