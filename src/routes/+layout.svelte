<script lang="ts">
	import '../app.postcss'

	// overlays
	import OverlayDrawer from '$comps/Surface/OverlayDrawer.svelte'
	import OverlayModal from '$comps/Surface/OverlayModal.svelte'
	import { Toast, initializeStores } from '@skeletonlabs/skeleton'
	initializeStores()

	// popup
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
</script>

<!-- Overlays -->
<OverlayDrawer />
<OverlayModal />
<Toast />

<slot />
