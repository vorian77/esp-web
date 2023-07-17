<script lang="ts">
	/* custom esp theme that rather than a Skeleton theme*/
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'

	// overlays
	import OverlayDrawer from '$comps/OverlayDrawer.svelte'
	import OverlayModal from '$comps/OverlayModal.svelte'
	import { Toast } from '@skeletonlabs/skeleton'
</script>

<!-- Overlays -->
<OverlayDrawer />
<OverlayModal />
<Toast />

<slot />
