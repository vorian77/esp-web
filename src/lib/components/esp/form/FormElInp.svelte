<script lang="ts">
	import type { FieldInput } from '$comps/esp/form/fieldInput'
	import { ValidityLevel } from '$comps/esp/form/types'

	export let field: FieldInput
</script>

<label class="label" for={field.name}>
	<span>{field.label}</span>
	<input
		class="input bg-white text-black"
		type={field.type}
		id={field.name}
		name={field.name}
		placeholder={field.placeHolder}
		value={field.value}
		disabled={field.disabled}
		class:input-warning={field.validity.level == ValidityLevel.warning}
		class:input-error={field.validity.level == ValidityLevel.error}
		on:change
	/>
</label>

<style>
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
