<script lang="ts">
	/* custom esp theme that rather than a Skeleton theme*/
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'

	// overlays
	import OverlayDrawer from '$comps/OverlayDrawer.svelte'
	import OverlayModal from '$comps/OverlayModal.svelte'
	import { Toast } from '@skeletonlabs/skeleton'

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
