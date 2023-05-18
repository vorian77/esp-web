<svelte:options accessors />

<script lang="ts">
	import type { FieldInput } from '$comps/esp/form/fieldInput'
	import { Validity, ValidityLevel } from '$comps/esp/form/fieldValidation'

	export let field: FieldInput

	export function setValidity(newValidity: Validity): void {
		field.validity = newValidity
	}
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
