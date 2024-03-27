<script lang="ts">
	import type { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess } from '$comps/form/field'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let field: FieldRadio

	const dispatchType = 'changeItem'
	const format = field.isDisplayBlock ? 'block mb-2' : 'inline mr-7'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		let newValue: string | null = target.value === field.valueCurrent ? null : target.value
		dispatch(dispatchType, { fieldName: field.name, value: newValue })
	}
</script>

<legend>{field.label}</legend>
<fieldset class={field.access === FieldAccess.required ? 'fieldsetRequired' : 'fieldsetOptional'}>
	<div class="mt-3">
		{#each field.items as { data: id, display: label }, index (id)}
			<label class="{format} {index === 0 ? 'mt-4' : ''}">
				<input
					type="radio"
					name={field.name}
					value={id}
					checked={field.valueCurrent == id}
					on:click={onChange}
				/>
				{label}
			</label>
		{/each}
	</div>
</fieldset>
