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
	import { OverlayNodeRecord } from '$comps/types.overlay'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/form/FormDetailDrawer.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let overlayNodeRecord: OverlayNodeRecord

	let state = new State(
		(obj: any) => (state = state.updateProperties(obj)),
		drawerStore,
		modalStore,
		toastStore
	)

	$: if (overlayNodeRecord) {
		state.nodeType = NodeType.object
		state.packet = new StatePacket({
			component: StatePacketComponent.navApp,
			token: new TokenApiQuery(
				TokenApiQueryType.new,
				new TokenApiDbDataObj({ dataObjName: overlayNodeRecord.dataObjName }),
				new TokenApiQueryData({})
			)
		})
		state.page = '/'
		state.surface = SurfaceType.overlay
		state.overlayNodeRecord = overlayNodeRecord
	}
</script>

{#if state}
	<div class="esp-card-space-y">
		<Form {state} on:formCancelled />
	</div>
{/if}
