<script lang="ts">
	import {
		TokenApiDbDataObj,
		TokenApiQuery,
		TokenApiQueryData,
		TokenApiQueryType
	} from '$comps/types.token'
	import { NodeType } from '$comps/types'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import Form from '$comps/form/Form.svelte'
	import { SurfaceType } from '$comps/types.master'
	import { OverlayRecord } from '$comps/Overlay/types.overlay'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/form/FormDetailDrawer.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let overlayRecord: OverlayRecord

	let state = new State(
		(obj: any) => (state = state.updateProperties(obj)),
		drawerStore,
		modalStore,
		toastStore
	)

	$: if (overlayRecord) {
		state.nodeType = NodeType.object
		state.packet = new StatePacket({
			component: StatePacketComponent.navApp,
			token: new TokenApiQuery(
				TokenApiQueryType.new,
				new TokenApiDbDataObj({ dataObjName: overlayRecord.dataObjName }),
				new TokenApiQueryData({})
			)
		})
		state.page = '/'
		state.surface = SurfaceType.overlay
		state.overlayRecord = overlayRecord
	}
</script>

{#if state}
	<div class="esp-card-space-y">
		<Form {state} on:formCancelled />
	</div>
{/if}
