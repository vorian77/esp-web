<script lang="ts">
	import type { NodeObj, NavTreeNode } from '$comps/types'
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

	export let treeNode: NavTreeNode
	export let scrollToTop = () => {}

	let navNode: NodeObj
	let formClass: FormClass
	let formHasChanged = false
	let formValidToSubmit = true

	const modalStore = getModalStore()
	const toastStore = getToastStore()

	$: {
		navNode = treeNode.nodeObj
		formClass = new FormClass(navNode.dataObj!.defn)
	}
	const functions = {
		noa_detail_delete: async () => {
			if (navNode.dataObj?.saveMode === 'update') {
				executeOnConfirm(
					'Delete Record',
					'Are you sure you want to delete this record (this action cannot be undone)?',
					async () => await objActionDetailDelete(treeNode, formClass.getFormValues())
				)
			} else {
				await objActionDetailDelete(treeNode, formClass.getFormValues())
			}
		},

		noa_detail_new: async () => {
			if (formHasChanged) {
				executeOnConfirm(
					'Discard Changes',
					'Are you sure you want discard your changes to this record?',
					async () => await objActionDetailNew(treeNode)
				)
			} else {
				await objActionDetailNew(treeNode)
			}
		},

		noa_detail_save: async () => {
			const success = await objActionDetailSave(treeNode, formClass.getFormValues())
			if (success) {
				formClass.resetFormValues()
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
