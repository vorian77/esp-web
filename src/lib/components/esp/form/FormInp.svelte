<script>
	import { createEventDispatcher } from 'svelte'
	import { validateField } from '$comps/esp/form/formValidate'

	const dispatch = createEventDispatcher()

	export let field = {}
	export let validity = {}

	export function setValidity(newValidity) {
		validity = newValidity
	}

	function onChange(event) {
		const newValidity = validateField(field, event)
		if (newValidity?.escalate) {
			dispatch('escalateValidity', newValidity)
		} else {
			setValidity(newValidity)
		}
	}
</script>

<label class="label" for={field.name}>
	<span>{field.label}</span>
	<input
		class="input bg-white text-black"
		class:input-warning={validity?.level == 'warning'}
		class:input-error={validity?.level == 'error'}
		type={field.type}
		id={field.name}
		name={field.name}
		placeholder={field.placeHolder ?? ''}
		value={field.value ?? ''}
		disabled={field?.disabled}
		on:change={onChange}
	/>
</label>

{#if validity?.level == 'error'}
	<div class="text-error-500 mb-3">
		<p class="">{validity.message}</p>
	</div>
{:else if validity?.level == 'warning'}
	<div class="text-warning-500 mb-3">
		<p class="">{validity.message}</p>
	</div>
{/if}
