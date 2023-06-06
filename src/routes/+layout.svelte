<script lang="ts">
	/* custom esp theme that rather than a Skeleton theme*/
	import '../theme.postcss'

	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'

	// MODAL REGISTRY
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'

	// COMPONENTS
	import ListboxSelectSingle from '$comps/ListboxSelectSingle.svelte'

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// custom modal 1
		modalComponentOne: {
			// reference to component
			ref: ListboxSelectSingle,
			props: {},
			slot: '<p>Skeleton</p>'
		}
	}
</script>

<slot />
