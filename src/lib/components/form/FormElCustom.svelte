<script lang="ts">
	import type { State } from '$comps/nav/types.app'
	import {
		FieldCustom,
		FieldCustomAction,
		FieldCustomActionButton,
		FieldCustomActionLink,
		FieldCustomHeader,
		FieldCustomText
	} from '$comps/form/fieldCustom'
	import type { DataObjRecord } from '$comps/types'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustom.svelte'

	export let state: State
	export let field: FieldCustom
	export let data: DataObjRecord

	async function action() {
		if (field instanceof FieldCustomAction && field.enhancement) {
			await field.enhancement(state, field, data)
		}
	}
</script>

{#if field instanceof FieldCustomActionButton}
	{@const color = field.color || 'variant-filled-primary'}
	{@const disabled = !(state.objHasChanged && state.objValidToSave)}
	<button class="btn {color} w-full" {disabled} on:click={async () => await action()}>
		{field.label}
	</button>
{/if}

{#if field instanceof FieldCustomActionLink}
	{@const prefix = field.prefix ? field.prefix + ' ' : ''}
	<button class="btn w-full" on:click={async () => await action()}>
		<p>{prefix}<span class="text-blue-500">{field.label}</span></p>
	</button>
{/if}

{#if field instanceof FieldCustomHeader}
	{@const size = field.size ? 'h' + field.size : 'h3'}
	{@const dynamicText = field.source && field.sourceKey ? ': ' + field.sourceKey : ''}
	<div class="mt-8 {size}">
		<p>{field.label}<span class="font-semibold">{dynamicText}</span></p>
	</div>
{/if}

{#if field instanceof FieldCustomText}
	{@const align = field.align ? 'text-' + field.align : 'text-left'}
	<div class={align}>
		{field.label}
	</div>
{/if}
