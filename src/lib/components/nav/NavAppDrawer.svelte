<script lang="ts">
	import { TokenApiDbDataObj, TokenApiQuery, TokenApiQueryData, TokenApiQueryType } from '$lib/api'
	import { DataObj, DataObjData, NodeType } from '$comps/types'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.app'
	import NavApp from '$comps/nav/NavApp.svelte'
	import { SurfaceType } from '$comps/types.master'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/form/FormDetailDrawer.svelte'

	export let dataObjName: string

	let state = new State((obj: any) => (state = state.updateProperties(obj)))

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
		<NavApp {state} on:formCancelled on:customFieldAction />
	</div>
{/if}
