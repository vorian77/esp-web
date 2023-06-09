<script lang="ts">
	import type { FieldInput } from '$comps/esp/form/fieldInput'
	import { ValidityErrorLevel } from '$comps/esp/form/types'

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
		class:input-warning={field.validity.level == ValidityErrorLevel.warning}
		class:input-error={field.validity.level == ValidityErrorLevel.error}
		on:change
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
