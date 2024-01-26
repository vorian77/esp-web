<script lang="ts">
	import type { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess } from '$comps/form/field'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let field: FieldRadio
	const dispatchType = 'changeItem'

	let color = '#ff3e00'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		let newValue: string | null = target.value === field.valueCurrent ? null : target.value
		dispatch(dispatchType, { fieldName: field.name, value: newValue })
	}
</script>

<legend>{field.label}</legend>
<fieldset class={field.access === FieldAccess.required ? 'fieldsetRequired' : 'fieldsetOptional'}>
	{#each field.items as { data: id, display: label }, index (id)}
		<label class="flex items-center space-x-2 {index === 0 ? 'mt-3' : ''}">
			<input
				type="radio"
				name={field.name}
				value={id}
				checked={field.valueCurrent == id}
				on:click={onChange}
			/>
			<p>{label}</p>
		</label>
	{/each}
</fieldset>
