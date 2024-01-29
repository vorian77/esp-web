<script lang="ts">
	import type { FieldToggle } from '$comps/form/fieldToggle'
	import { SlideToggle } from '@skeletonlabs/skeleton'
	import { DataFieldDataType } from '$comps/types'
	import { createEventDispatcher } from 'svelte'
	import { FieldAccess } from './field'

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
	console.log('FormElToggle:', field)

	function onChange(event: Event) {
		const idx = selections.findIndex((s: any) => {
			return s === field.valueCurrent
		})
		const newValue = selections[(idx + 1) % 2]
		setToggle(newValue)
		console.log('FormElToggle.onChange:', { currValue: field.valueCurrent, newValue, toggleValue })
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

<!-- <div class="flex">
	<label for={field.name}></label>
	<input
		type="checkbox"
		id={field.name}
		name={field.name}
		class="mt-1 rounded-sm"
		bind:checked={binarySelectChecked}
		on:change={onChange}
	/>
	<div class="ml-2">{field.label}</div>
</div> -->
