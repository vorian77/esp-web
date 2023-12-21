<script lang="ts">
	import type { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess } from '$comps/types'
	export let field: FieldRadio
	console.log('FormElInpRadio', field)

	let color = '#ff3e00'
</script>

<legend>{field.label}</legend>
<fieldset class={field.access === FieldAccess.required ? 'fieldsetRequired' : 'fieldsetOptional'}>
	{#each field.valueCurrent.items as { data: id, display: label, selected }, index (id)}
		<label class="flex items-center space-x-2 {index === 0 ? 'mt-3' : ''}">
			<input
				type="radio"
				name={field.name}
				value={id}
				checked={field.valueCurrent.data == id}
				on:change
			/>
			<p>{label}</p>
		</label>
	{/each}
</fieldset>
