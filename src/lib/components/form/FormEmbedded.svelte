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
	import { FormConfig } from '$comps/form/types.form'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import DataViewer from '$comps/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/form/FormEmbedded.svelte'

	export let state: State

	// let newState = new State(
	// 	(obj: any) => (state = state.updateProperties(obj)),
	// 	getDrawerStore(),
	// 	getModalStore(),
	// 	getToastStore()
	// )

	// newState.nodeType = NodeType.object
	// newState.packet = new StatePacket({
	// 	component: StatePacketComponent.navApp,
	// 	token: new TokenApiQuery(
	// 		TokenApiQueryType.new,
	// 		new TokenApiDbDataObj({ dataObjName: state?.overlay?.dataObjName }),
	// 		new TokenApiQueryData({})
	// 	)
	// })
	// newState.page = '/'
	// newState.surface = SurfaceType.overlay
</script>

{#if state}
	<div class="esp-card-space-y">
		<Form {state} on:formCancelled />
	</div>
{/if}
