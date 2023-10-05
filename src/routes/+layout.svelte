<script lang="ts">
	import { beforeNavigate } from '$app/navigation'
	import { navStorageReset } from '$comps/nav/navStore'
	import '../app.postcss'

	// initialize stores
	import { initializeStores } from '@skeletonlabs/skeleton'
	initializeStores()

	// overlays
	import OverlayDrawer from '$comps/OverlayDrawer.svelte'
	import OverlayModal from '$comps/OverlayModal.svelte'
	import { Toast } from '@skeletonlabs/skeleton'

	// popup
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

	beforeNavigate((navigation) => {
		// if (navigation.to.route.id === null || navigation.to.route.id === '/') {
		// 	navStorageReset()
		// }
		// if (tokenExpired()) refreshToken()
		// if (!tokenValid()) {
		// 	navigation.cancel()
		// 	goto('/login')
		// }
	})
</script>

<!-- Overlays -->
<OverlayDrawer />
<OverlayModal />
<Toast />

<slot />
