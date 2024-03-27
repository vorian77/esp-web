<script lang="ts">
	import type { FieldToggle } from '$comps/form/fieldToggle'
	import { SlideToggle } from '@skeletonlabs/skeleton'
	import { DataFieldDataType } from '$comps/types'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const dispatch = createEventDispatcher()
	const dispatchType = 'changeItem'

	export let field: FieldToggle

	let selections = (function () {
		if (field.valueFalse && field.valueTrue) {
			return [field.valueTrue, field.valueFalse]
		}
		switch (field.dataType) {
			case DataFieldDataType.bool:
				return [true, false]

			case DataFieldDataType.int16:
				return [1, 0]

			case DataFieldDataType.str:
				return ['Yes', 'No']

			default:
				return [true, false]
		}
	})()
	let toggleValue: boolean

	$: {
		if (field.valueCurrent === undefined || field.valueCurrent === null) {
			field.valueCurrent = field.presetTrue ? selections[0] : selections[1]
			dispatch(dispatchType, { fieldName: field.name, value: field.valueCurrent })
		}
		setToggle(field.valueCurrent)
	}

	function onChange(event: Event) {
		const idx = selections.findIndex((s: any) => {
			return s === field.valueCurrent
		})
		const newValue = selections[(idx + 1) % 2]
		setToggle(newValue)
		dispatch(dispatchType, { fieldName: field.name, value: newValue })
	}

	function setToggle(value: any) {
		toggleValue = value === selections[0]
	}
</script>

<div class="mb-1">
	<legend>{field.label}</legend>
</div>
<SlideToggle
	name={field.name}
	bind:checked={toggleValue}
	on:change={onChange}
	active="bg-primary-500"
>
	{#if field.valueShow}
		{field.valueCurrent}
	{/if}
</SlideToggle>
