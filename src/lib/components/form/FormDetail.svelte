<script lang="ts">
	import {
		BinarySelect,
		DataObj,
		DataObjData,
		Validation,
		ValidityField,
		ValidityErrorLevel,
		ValidityError
	} from '$comps/types'
	import type { State } from '$comps/nav/types.app'
	import DataObjActionsHeader from '$comps/dataObj/DataObjActionsHeader.svelte'
	import DataObjActionsFooter from '$comps/dataObj/DataObjActionsFooter.svelte'
	import FormElCustom from '$comps/form/FormElCustom.svelte'
	import FormElFile from '$comps/form/FormElFile.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import type { FieldItem } from '$comps/form/field'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import { FieldCustom } from '$comps/form/fieldCustom'
	import { FieldFile } from '$comps/form/fieldFile'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetail.svelte'
	const FORM_NAME = ''
	const SUBMIT_BUTTON_NAME = 'SUBMIT_BUTTON_NAME'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	$: loadData(dataObjData)

	function loadData(data: DataObjData) {
		dataObj.objData = data
		state.update({ objValidToSave: dataObj.preValidate() })
	}

	function onChangeFile(fieldName: string, valData: any, valDisplay: any, saveCallback: Function) {
		setFieldVal(fieldName, valData, valDisplay)
		dataObj.data.callbacksAdd(fieldName, saveCallback)
		console.log('onChangeFile:', { fieldName, valData, valDisplay })
	}
	function onChangeInput(event: any) {
		setFieldVal(event.target.name, event.currentTarget.value)
	}
	function onChangeSelect(fieldName: string, valueData: any, valueDisplay: any) {
		setFieldVal(fieldName, valueData, valueDisplay)
	}
	function onClickCheckbox(event: any) {
		const eventName = event.target.name.split('.')
		let fieldName: string

		if (eventName.length === 1) {
			// binary select
			fieldName = eventName.toString()
			const idx = dataObj.getFieldIdx(fieldName)
			if (idx >= 0) {
				const field = dataObj.fields[idx]
				const binarySelect = new BinarySelect(field.dataType)
				setFieldVal(fieldName, binarySelect.getValue(field.valueCurrent.data))
			}
		} else {
			// multi-select
			fieldName = eventName[0]
			const checkedItemID: string = eventName[1]
			const idx = dataObj.getFieldIdx(fieldName)
			if (idx >= 0) {
				const field = dataObj.fields[idx]

				const itemIdx = field.valueCurrent.items.findIndex((i: FieldItem) => {
					return i.data === checkedItemID
				})
				if (itemIdx >= 0)
					field.valueCurrent.items[itemIdx].selected = !field.valueCurrent.items[itemIdx].selected

				let values: Array<string> = []
				field.valueCurrent.items.forEach((i: FieldItem) => {
					if (i.selected) values.push(i.data)
				})
				setFieldVal(fieldName, values.toString())
			}
		}
	}

	function setFieldVal(fieldName: string, newValData: any, newValDisplay: any = undefined) {
		if (newValDisplay === undefined) newValDisplay = newValData
		const idx = dataObj.getFieldIdx(fieldName)
		if (idx >= 0) {
			dataObj.fields[idx].valueCurrent.data = newValData
			dataObj.fields[idx].valueCurrent.display = newValDisplay
			validateField(idx, newValData)
			state.update({ objHasChanged: dataObj.getStatusChanged() })
		}
		return idx
	}

	function validateField(fieldIdx: number, value: any) {
		const v: Validation = dataObj.fields[fieldIdx].validate(value)
		setValidities(v.validityFields)
	}

	function setValidities(newValidities: Array<ValidityField>) {
		newValidities.forEach(({ index, validity }) => {
			dataObj.fields[index].validity = validity
		})
		state.update({
			objValidToSave: dataObj.fields.every(({ validity }) => validity.error == ValidityError.none)
		})
	}
</script>

<DataObjActionsHeader {state} {dataObj} on:formCancelled />

<div class="mx-2 mb-6">
	<form id={'form_' + dataObj.name} on:submit|preventDefault>
		{#each dataObj.fields as field, idx (field.name)}
			{#if field.isDisplayable && field.isDisplay}
				<div class:mt-3={idx}>
					{#if field instanceof FieldCheckbox}
						<FormElInpCheckbox {field} on:click={onClickCheckbox} />
					{:else if field instanceof FieldCustom}
						<FormElCustom bind:field {state} data={dataObj.objData.dataObjRow.record} />
					{:else if field instanceof FieldFile}
						<FormElFile bind:field onChange={onChangeFile} />
					{:else if field instanceof FieldInput}
						<FormElInp {field} on:change={onChangeInput} on:keyup={onChangeInput} />
					{:else if field instanceof FieldRadio}
						<FormElInpRadio {field} on:change={onChangeInput} />
					{:else if field instanceof FieldSelect}
						<FormElSelect {field} onChange={onChangeSelect} />
					{:else if field instanceof FieldTextarea}
						<FormElTextarea {field} on:change={onChangeInput} on:keyup={onChangeInput} />
					{/if}
				</div>

				{#if dataObj.fields[idx].validity.level == ValidityErrorLevel.error}
					<div class="text-error-500 mb-3">
						<p>{dataObj.fields[idx].validity.message}</p>
					</div>
				{:else if dataObj.fields[idx].validity.level == ValidityErrorLevel.warning}
					<div class="text-warning-500 mb-3">
						<p>{dataObj.fields[idx].validity.message}</p>
					</div>
				{/if}
				<!-- Original Val: {field.valueSelected.data} Current Val: {field.value.data} HasChanged: {field.hasChanged} -->
			{/if}
		{/each}
	</form>
</div>

<DataObjActionsFooter {state} {dataObj} />

<!-- <DataViewer header="dataObjList" data={dataObjList} /> -->
<!-- <DataViewer header="dataSource" data={dataSource} /> -->
<!-- <DataViewer header="defn" data={formObj.defn} /> -->
