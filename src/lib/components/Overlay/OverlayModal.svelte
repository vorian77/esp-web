<script lang="ts">
	import { Modal, getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalComponent } from '@skeletonlabs/skeleton'
	import OverlayModalForm from '$comps/Overlay/OverlayModalForm.svelte'
	import OverlayModalItems from '$comps/Overlay/OverlayModalItems.svelte'

	const modalStore = getModalStore()

	const modalRegistry: Record<string, ModalComponent> = {
		overlayModalForm: { ref: OverlayModalForm },
		overlayModalItems: { ref: OverlayModalItems }
	}
</script>

<Modal components={modalRegistry} />
