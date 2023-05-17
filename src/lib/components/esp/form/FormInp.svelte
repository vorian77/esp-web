<svelte:options accessors />

<script lang="ts">
	import { Validity, ValidityLevel } from '$comps/esp/form/form'

	export let field = {}
	export let validity: Validity = new Validity()

	export function setValidity(newValidity: Validity): void {
		validity = newValidity
	}
</script>

<label class="label" for={field.name}>
	<span>{field.label}</span>
	<input
		class="input bg-white text-black"
		type={field.type}
		id={field.name}
		name={field.name}
		placeholder={field.placeHolder ?? ''}
		value={field.value ?? ''}
		disabled={field?.disabled}
		class:input-warning={validity.level == ValidityLevel.warning}
		class:input-error={validity.level == ValidityLevel.error}
		on:change
	/>
</label>
