<script lang="ts">
	import type { FieldInput } from '$comps/form/fieldInput'
	import { FieldAccess, ValidityErrorLevel } from '$comps/types'
	import DataViewer from '$comps/DataViewer.svelte'

	export let field: FieldInput

	const classValue = 'input text-black ' + field.colorBackground
	const min = field.minValue ? field.minValue.toString() : ''
	const max = field.maxValue ? field.maxValue.toString() : ''
	const step = field.spinStep ? field.spinStep : ''
</script>

<!-- <DataViewer header="element" data={field.element} /> -->
<!-- <DataViewer header="field.value" data={field.value} /> -->

<label class="label" for={field.name} hidden={field.access == FieldAccess.hidden}>
	<span>{field.label}</span>
	<div class="show_always">
		<input
			class={classValue}
			class:input-warning={field.validity.level == ValidityErrorLevel.warning}
			class:input-error={field.validity.level == ValidityErrorLevel.error}
			hidden={field.access == FieldAccess.hidden}
			id={field.name}
			{max}
			{min}
			name={field.name}
			on:change
			on:keyup
			placeholder={field.placeHolder}
			readonly={field.access == FieldAccess.readonly}
			{step}
			type={field.element}
			value={field.valueCurrent.display}
		/>
	</div>
</label>

<!-- <div class="show_always">
	<input type="number" class="show_spin" step="0.5" />
</div> -->

<!-- <style>
	/* turn off spinner */
	/* Chrome, Safari, Edge, Opera */
	/* disable globally if required */
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	/* restore to hidden until mouse over */
	.show_spinner input[type='number']::-webkit-outer-spin-button,
	.show_spinner input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: inner-spin-button;
	}

	/* restore and show permanently */
	.show_always input[type='number']::-webkit-outer-spin-button,
	.show_always input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: inner-spin-button;
		opacity: 1;
		margin-left: 10px;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style> -->
