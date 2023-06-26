<script lang="ts">
	/* custom esp theme that rather than a Skeleton theme*/
	import '../theme.postcss'

	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'

	// MODAL REGISTRY
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

	// DRAWER REGISTRY
	// import { Drawer, drawerStore } from '@skeletonlabs/skeleton'
	// import type { DrawerSettings } from '@skeletonlabs/skeleton'

	function onBackdrop(): void {
		if ($modalStore[0]?.response) $modalStore[0].response(false)
		modalStore.close()
	}
</script>

<!-- <Modal /> -->
<Modal on:backdrop={onBackdrop} />
<slot />
