<script lang="ts">
	import { Modal, getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalComponent } from '@skeletonlabs/skeleton'
	import OverlayModalDetail from '$comps/Overlay/OverlayModalDetail.svelte'
	import OverlayModalList from '$comps/Overlay/OverlayModalList.svelte'

	const modalStore = getModalStore()

	const modalRegistry: Record<string, ModalComponent> = {
		overlayModalDetail: { ref: OverlayModalDetail },
		overlayModalList: { ref: OverlayModalList }
	}
</script>

<Modal components={modalRegistry} />
