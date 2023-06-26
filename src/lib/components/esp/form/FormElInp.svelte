<script lang="ts">
	import type { FieldInput } from '$comps/esp/form/fieldInput'
	import { FieldAccess, ValidityErrorLevel } from '$comps/types'

	export let field: FieldInput

	let classValue = 'input text-black '
	classValue += field.access == FieldAccess.readonly ? 'bg-gray-200' : 'bg-white'
</script>

<label class="label" for={field.name} hidden={field.access == FieldAccess.hidden}>
	<span>{field.label}</span>
	<input
		type={field.type}
		id={field.name}
		name={field.name}
		placeholder={field.placeHolder}
		value={field.value}
		hidden={field.access == FieldAccess.hidden}
		readonly={field.access == FieldAccess.readonly}
		class={classValue}
		class:input-warning={field.validity.level == ValidityErrorLevel.warning}
		class:input-error={field.validity.level == ValidityErrorLevel.error}
		on:change
		on:keyup|preventDefault
	/>
</label>

<!-- <input class="input" title="Input (disabled)" type="text" placeholder="input disabled" disabled="true" /> -->

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
