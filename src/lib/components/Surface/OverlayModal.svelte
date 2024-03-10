<script lang="ts">
	import { Modal, getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalComponent } from '@skeletonlabs/skeleton'
	import overlayModalDialog from '$comps/Surface/OverlayModalDialog.svelte'

	const modalStore = getModalStore()

	const modalRegistry: Record<string, ModalComponent> = {
		overlayModalDialog: { ref: overlayModalDialog }
	}
</script>

<Modal components={modalRegistry} />
