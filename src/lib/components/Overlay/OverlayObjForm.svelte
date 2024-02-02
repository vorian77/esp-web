<script lang="ts">
	import { TokenApiDbDataObj, TokenApiQuery, TokenApiQueryData, TokenApiQueryType } from '$lib/api'
	import { NodeType } from '$comps/types'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import Form from '$comps/form/Form.svelte'
	import { OverlayNode, OverlayNodeType } from '$comps/form/field'
	import { SurfaceType } from '$comps/types.master'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/form/FormDetailDrawer.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let overlayNode: OverlayNode

	let state = new State(
		(obj: any) => (state = state.updateProperties(obj)),
		drawerStore,
		modalStore,
		toastStore
	)

	$: if (overlayNode) {
		state.nodeType = NodeType.object
		state.packet = new StatePacket({
			component: StatePacketComponent.navApp,
			token: new TokenApiQuery(
				overlayNode.codeType === OverlayNodeType.record
					? TokenApiQueryType.new
					: TokenApiQueryType.retrieve,
				new TokenApiDbDataObj({ dataObjName: overlayNode.dataObjName }),
				new TokenApiQueryData({})
			)
		})
		state.page = '/'
		state.surface = SurfaceType.overlay
		state.overlayNode = overlayNode
	}
</script>

{#if state}
	<div class="esp-card-space-y">
		<Form {state} on:formCancelled />
	</div>
{/if}
