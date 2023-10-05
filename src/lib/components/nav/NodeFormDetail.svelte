<script lang="ts">
	import type { NavNode } from '$comps/types'
	import Form from '$comps/esp/form/FormDetail.svelte'
	import { Form as FormClass } from '$comps/esp/form/form'
	import {
		objActionDetailDelete,
		objActionDetailNew,
		objActionDetailSave
	} from '$comps/nav/navStore'
	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton'

	export let node: NavNode

	let formClass: FormClass
	let formHasChanged = false
	let formValidToSubmit = true

	const modalStore = getModalStore()
	const toastStore = getToastStore()

	$: formClass = new FormClass(node.obj!.defn)

	const functions = {
		noa_detail_delete: async () => {
			if (node.obj?.saveMode === 'update') {
				executeOnConfirm(
					'Delete Record',
					'Are you sure you want to delete this record (this action cannot be undone)?',
					async () => await objActionDetailDelete(node)
				)
			} else {
				await objActionDetailDelete(node)
			}
		},

		noa_detail_new: async () => {
			if (formHasChanged) {
				executeOnConfirm(
					'Discard Changes',
					'Are you sure you want discard your changes to this record?',
					async () => await objActionDetailNew(node)
				)
			} else {
				await objActionDetailNew(node)
			}
		},

		noa_detail_save: async () => {
			const success = await objActionDetailSave(node, formClass.getFormValues())
			if (success) {
				showToast('Record saved!')
			} else {
				showToast('Unable to save record.')
			}
		}
	}

	function executeOnConfirm(title: string, body: string, callback: any) {
		const modal: ModalSettings = {
			type: 'confirm',
			title,
			body,
			response: (r: boolean) => {
				if (r) {
					callback()
				}
			}
		}
		modalStore.trigger(modal)
	}
	function showToast(message: string) {
		const t: ToastSettings = {
			message
		}
		toastStore.trigger(t)
	}
</script>

FormHasChanged: {formHasChanged}
ValidToSumit: {formValidToSubmit}

<Form formObj={formClass} bind:formHasChanged bind:formValidToSubmit>
	<svelte:fragment slot="actions">
		{#each formClass.objActions as action}
			<button
				class="btn variant-filled-primary mt-1 ml-1"
				on:click={functions[action.name]}
				disabled={action.name === 'noa_detail_save' && (!formValidToSubmit || !formHasChanged)}
				>{action.header}
			</button>
		{/each}
	</svelte:fragment>
</Form>

<!-- <pre>{JSON.stringify(node.obj, null, 2)}</pre> -->
<pre>{JSON.stringify(node.obj, null, 2)}</pre>
