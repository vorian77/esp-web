<script lang="ts">
	import { TokenApiDbDataObj, TokenApiQuery, TokenApiQueryData, TokenApiQueryType } from '$lib/api'
	import { NodeType } from '$comps/types'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import NavApp from '$comps/nav/NavApp.svelte'
	import { SurfaceType } from '$comps/types.master'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/form/FormDetailDrawer.svelte'
	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let dataObjName: string

	let state = new State(
		(obj: any) => (state = state.updateProperties(obj)),
		drawerStore,
		modalStore,
		toastStore
	)

	$: if (dataObjName) {
		state.nodeType = NodeType.object
		state.packet = new StatePacket({
			component: StatePacketComponent.navApp,
			token: new TokenApiQuery(
				TokenApiQueryType.new,
				new TokenApiDbDataObj({ dataObjName }),
				new TokenApiQueryData({})
			)
		})
		state.page = '/'
		state.surface = SurfaceType.overlay
	}
</script>

{#if state}
	<div class="esp-card-space-y">
		<NavApp {state} on:formCancelled />
	</div>
{/if}
