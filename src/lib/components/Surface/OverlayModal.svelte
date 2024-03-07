<script lang="ts">
	import { Modal, getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalComponent } from '@skeletonlabs/skeleton'
	import OverlayModalForm from '$comps/Surface/OverlayModalForm.svelte'

	const modalStore = getModalStore()

	const modalRegistry: Record<string, ModalComponent> = {
		overlayModalForm: { ref: OverlayModalForm }
	}
</script>

<Modal components={modalRegistry} />
