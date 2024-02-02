<script lang="ts">
	import type { FieldToggle } from '$comps/form/fieldToggle'
	import { SlideToggle } from '@skeletonlabs/skeleton'
	import { DataFieldDataType } from '$comps/types'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	const dispatchType = 'changeItem'

	export let field: FieldToggle

	let selections = (function () {
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
	let toggleLabel: string = ''
	setToggle(field.valueCurrent)

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
		if (field.labelFalse && field.labelTrue) {
			toggleLabel = toggleValue ? field.labelTrue : field.labelFalse
		}
	}
</script>

<div class="mb-1">
	<legend>{field.label}</legend>
</div>
<SlideToggle
	name={field.name}
	bind:checked={toggleValue}
	on:change={onChange}
	active="bg-primary-500">{toggleLabel}</SlideToggle
>
