<script lang="ts">
	import type { FieldInput } from '$comps/form/fieldInput'
	import { Field, FieldAccess } from '$comps/form/field'
	import { DataFieldDataType, ValidityErrorLevel } from '$comps/types'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const dispatch = createEventDispatcher()

	export let field: FieldInput

	const classValue = 'input text-black ' + field.colorBackground
	const min = field.minValue ? field.minValue.toString() : ''
	const max = field.maxValue ? field.maxValue.toString() : ''
	const step = field.spinStep ? field.spinStep : ''
	const dispatchType = 'changeItem'

	function onDoubleClick(event: MouseEvent) {
		if (field.dataType === DataFieldDataType.date) {
			const date = new Date()
			const year = date.getFullYear().toString()
			const dateMonth = date.getMonth() + 1
			const dateDay = date.getDate()
			const month = dateMonth < 10 ? '0' + dateMonth : dateMonth.toString()
			const day = dateDay < 10 ? '0' + dateDay : dateDay.toString()
			const value = year + '-' + month + '-' + day
			// field.valueCurrent = year + '-' + month + '-' + day
			dispatch(dispatchType, { fieldName: field.name, value })
		}
	}
</script>

<!-- <DataViewer header="element" data={field.element} /> -->
<!-- <DataViewer header="field.value" data={field.valueCurrent} /> -->

<label class="label" for={field.name} hidden={field.access == FieldAccess.hidden}>
	<span>{field.label}</span>
	<div>
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
			on:dblclick={onDoubleClick}
			on:keyup
			placeholder={field.placeHolder}
			readonly={field.access == FieldAccess.readonly}
			{step}
			type={field.element}
			value={field.valueCurrent}
		/>
	</div>
</label>
