<script lang="ts">
	import type { FieldInput } from '$comps/form/fieldInput'
	import { FieldAccess, ValidityErrorLevel } from '$comps/types'
	import DataViewer from '$comps/DataViewer.svelte'

	export let field: FieldInput

	let classValue = 'input text-black '
	classValue += field.access == FieldAccess.readonly ? 'bg-gray-200' : 'bg-white'
</script>

<!-- <DataViewer header="element" data={field.element} /> -->
<!-- <DataViewer header="field.value" data={field.value} /> -->

<label class="label" for={field.name} hidden={field.access == FieldAccess.hidden}>
	<span>{field.label}</span>
	<input
		type={field.element}
		id={field.name}
		name={field.name}
		placeholder={field.placeHolder}
		hidden={field.access == FieldAccess.hidden}
		readonly={field.access == FieldAccess.readonly}
		class={classValue}
		value={field.value.display}
		class:input-warning={field.validity.level == ValidityErrorLevel.warning}
		class:input-error={field.validity.level == ValidityErrorLevel.error}
		on:change
		on:keyup
	/>
</label>

<style>
	/* turn off spinner */
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
