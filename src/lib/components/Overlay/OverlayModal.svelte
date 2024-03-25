<script lang="ts">
	import { Modal, getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalComponent } from '@skeletonlabs/skeleton'
	import DataObjDialog from '$comps/dataObj/DataObjDialog.svelte'

	const modalStore = getModalStore()

	const modalRegistry: Record<string, ModalComponent> = {
		dataObjDialog: { ref: DataObjDialog }
	}
</script>

<Modal components={modalRegistry} />
