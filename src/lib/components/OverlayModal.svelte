<script lang="ts">
	// ovelay - modal
	import { Modal, getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalComponent } from '@skeletonlabs/skeleton'

	// COMPONENTS
	import ListboxSelectSingle from '$comps/ListboxSelectSingle.svelte'

	const modalStore = getModalStore()

	// const modalComponentRegistry: Record<string, ModalComponent> = {
	// 	// custom modal 1
	// 	modalComponentOne: {
	// 		// reference to component
	// 		ref: ListboxSelectSingle,
	// 		props: {},
	// 		slot: '<p>Skeleton</p>'
	// 	}
	// }

	function onBackdrop(): void {
		if ($modalStore[0]?.response) $modalStore[0].response(false)
		modalStore.close()
	}
</script>

<Modal on:backdrop={onBackdrop} />
