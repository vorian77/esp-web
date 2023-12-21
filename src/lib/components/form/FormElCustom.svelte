<script lang="ts">
	import { type FieldCustom, FieldCustomType } from '$comps/form/fieldCustom'
	import { appObjStatusStore } from '$comps/nav/app'
	import DataViewer from '$comps/DataViewer.svelte'
	import { createEventDispatcher } from 'svelte'

	export let field: FieldCustom
	export let formData

	const FILENAME = 'FormElLabel.svelte'

	const dispatch = createEventDispatcher()

	function action(type: string) {
		dispatch('customFieldAction', type)
	}
</script>

{#if field.codeType === FieldCustomType.button}
	{@const color = field.parms.color || 'variant-filled-primary'}
	{@const disabled = !($appObjStatusStore.objHasChanged && $appObjStatusStore.objValidToSave)}
	<button class="btn {color} w-full" {disabled} on:click={() => action(field.parms.action)}>
		{field.parms.label}
	</button>
{/if}

{#if field.codeType === FieldCustomType.header}
	{@const size = field.parms.size ? 'h' + field.parms.size : 'h3'}
	{@const dynamicText =
		field.parms.source && field.parms.sourceKey ? ': ' + field.parms.sourceKey : ''}
	<div class="mt-8 {size}">
		<p>{field.parms.label}<span class="font-semibold">{dynamicText}</span></p>
	</div>
{/if}

{#if field.codeType === FieldCustomType.link}
	{@const prefix = field.parms.prefix ? field.parms.prefix + ' ' : ''}
	<button class="btn w-full" on:click={() => action(field.parms.action)}>
		<p>{prefix}<span class="text-blue-500">{field.parms.label}</span></p>
	</button>
{/if}

{#if field.codeType === FieldCustomType.text}
	{@const align = field.parms.align ? 'text-' + field.parms.align : 'text-left'}
	<div class={align}>
		{field.parms.label}
	</div>
{/if}
