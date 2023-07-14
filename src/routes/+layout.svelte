<script lang="ts">
	/* custom esp theme that rather than a Skeleton theme*/
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'

	// overlay - drawer
	import OverlayDrawer from '$comps/OverlayDrawer.svelte'

	// overlay - popup
	//shared - popus/floating ui
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

	// ovelay - modal
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalComponent } from '@skeletonlabs/skeleton'

	// COMPONENTS
	import ListboxSelectSingle from '$comps/ListboxSelectSingle.svelte'

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

<!-- Overlays -->
<OverlayDrawer />
<!-- <Modal on:backdrop={onBackdrop} /> -->

<slot />
