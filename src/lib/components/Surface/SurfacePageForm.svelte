<script lang="ts">
	import { State } from '$comps/nav/types.appState'
	import Form from '$comps/dataObj/DataObj.svelte'
	import DataViewer from '$comps/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/Surface/SurfacePageForm.svelte'

	export let state: State
</script>

{#if state}
	<div class="esp-card-space-y">
		<Form {state} on:formCancelled />
	</div>
{/if}
