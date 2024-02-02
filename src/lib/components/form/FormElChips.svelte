<script lang="ts">
	import type { State } from '$comps/nav/types.appState'
	import type { FieldChips } from '$comps/form/fieldChips'
	import { ValidityErrorLevel } from '$comps/types'
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	const dispatchType = 'changeItem'

	const modalStore = getModalStore()

	export let field: FieldChips

	let valuesDisplay: any[] = field.valueCurrent

	function add() {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'overlayModalItems',
				meta: { overlayNode: field.overlayNode },
				response: (r: any) => {
					resolve(r)
				}
			}
			modalStore.trigger(modal)
		}).then((response) => {
			field.overlayNode = response
			valuesDisplay = field.overlayNode.data.map((i) => i.display)

			const valuesData = field.overlayNode.data.map((i) => i.data)
			dispatch(dispatchType, { fieldName: field.name, value: valuesData })
			console.log('FormElChips.values: ', { valuesDisplay, valuesData })
		})
	}

	function remove(i: number) {
		console.log('remove...')
		valuesDisplay = valuesDisplay.slice(0, i).concat(valuesDisplay.slice(i + 1))
	}
</script>

<div class="flex mt-6">
	<label for={field.name}>{field.label}</label>
	<button
		type="button"
		class="btn-icon btn-icon-sm variant-ghost-primary ml-2 -mt-1"
		on:click={() => add()}>+</button
	>
</div>

<div class="border-2 border-solid rounded-lg mt-2 p-2 min-h-11">
	<div class="flex flex-wrap items-center gap-2">
		{#each valuesDisplay as item, i}
			<button class="chip variant-filled-primary text-base" on:click={() => remove(i)}>
				<span>{item}</span>
				<span>x</span>
			</button>
		{/each}
	</div>
</div>

<!-- <textarea
	id={field.name}
	name={field.name}
	rows={field.rows}
	cols={field.cols}
	hidden={field.access == FieldAccess.hidden}
	readonly={field.access == FieldAccess.readonly}
	class={classValue}
	class:input-warning={field.validity.level == ValidityErrorLevel.warning}
	class:input-error={field.validity.level == ValidityErrorLevel.error}
	on:change
	on:keyup|preventDefault
	bind:value={field.valueCurrent}
/> -->
