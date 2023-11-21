<script lang="ts">
	import type { FieldLabel } from '$comps/form/fieldLabel'
	import type { NavParms } from '$comps/types'
	export let field: FieldLabel
	export let navParms: NavParms

	const FILENAME = 'FormElLabel.svelte'

	const dynamicLabel = navParms.getValue(field.labelDynamicKey)?.display
</script>

<h3 class="h3">
	<span class="font-semibold">
		{#if field.labelHeader}
			{field.labelHeader}
		{/if}
		{#if dynamicLabel}
			<span>{dynamicLabel}</span>
		{/if}
	</span>
</h3>

{#if field.labelText}
	{field.labelText}
{/if}
