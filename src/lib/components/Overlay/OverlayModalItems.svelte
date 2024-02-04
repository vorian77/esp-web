<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import type { FieldChips } from '$comps/form/fieldChips'
	import FormList from '$comps/form/FormList.svelte'
	import OverlayObjForm from '$comps/Overlay/OverlayObjForm.svelte'
	import {
		DataObj,
		DataObjCardinality,
		DataObjData,
		DataObjRecordRow,
		DataObjRecordStatus,
		NodeType
	} from '$comps/types'
	import { SurfaceType } from '$comps/types.master'
	import { OverlayNodeFieldItems, type Field } from '$comps/form/field'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'

	const FILENAME = '/$comps/overlay/OverlayModalItems.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let parent: SvelteComponent

	let overlayNodeFieldItems: OverlayNodeFieldItems
	let dataObj: DataObj
	let dataObjData: DataObjData

	let btnLabelComplete = 'Complete'

	overlayNodeFieldItems = $modalStore[0].meta.overlayNodeFieldItems

	dataObj = getDataObj()
	dataObjData = new DataObjData(
		DataObjCardinality.list,
		overlayNodeFieldItems.itemsList.map(
			(record) => new DataObjRecordRow(DataObjRecordStatus.unknown, record)
		)
	)

	let state = new State(
		(obj: any) => (state = state.updateProperties(obj)),
		drawerStore,
		modalStore,
		toastStore
	)
	state.nodeType = NodeType.object
	state.overlayNodeFieldItems = overlayNodeFieldItems
	state.surface = SurfaceType.overlay

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(state.overlayNodeFieldItems?.itemsSelected)
		modalStore.close()
	}

	function getDataObj() {
		let fields = []
		fields.push(addField('data', 'ID', 'uuid', false))
		fields.push(addField('display', 'Display', 'str', true))

		return new DataObj({
			_codeCardinality: 'list',
			_codeComponent: 'FormList',
			_fieldsEl: fields,
			header: overlayNodeFieldItems.header,
			_fieldsDbOrder: [{ _codeDbListDir: 'asc', _name: 'display' }],
			isPopup: true,
			name: 'OverlayModalItems',
			subHeader: overlayNodeFieldItems.headerSub
		})

		function addField(name: string, header: string, dataType: string, isDisplayable: boolean) {
			return {
				_column: {
					name,
					header,
					_codeDataType: dataType
				},
				isDisplay: true,
				isDisplayable,
				_codeAccess: 'readonly'
			}
		}
	}
</script>

{#if $modalStore[0]}
	<div class="esp-card-space-y w-modal-wide">
		<FormList {state} {dataObj} {dataObjData} on:formCancelled={parent.onClose} />

		<!-- prettier-ignore -->
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{btnLabelComplete}</button>
		</footer>
	</div>
{/if}
