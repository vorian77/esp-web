<script lang="ts">
	import {
		DataObj,
		DataObjData,
		Validation,
		ValidityField,
		ValidityErrorLevel,
		ValidityError
	} from '$comps/types'
	import type { State } from '$comps/nav/types.appState'
	import DataObjActionsHeader from '$comps/dataObj/DataObjActionsHeader.svelte'
	import DataObjActionsFooter from '$comps/dataObj/DataObjActionsFooter.svelte'
	import FormElChips from '$comps/form/FormElChips.svelte'
	import FormElCustom from '$comps/form/FormElCustom.svelte'
	import FormElFile from '$comps/form/FormElFile.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import FormElToggle from '$comps/form/FormElToggle.svelte'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import { FieldChips } from '$comps/form/fieldChips'
	import { FieldCustom } from '$comps/form/fieldCustom'
	import { FieldFile } from '$comps/form/fieldFile'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetail.svelte'
	const FORM_NAME = ''
	const SUBMIT_BUTTON_NAME = 'SUBMIT_BUTTON_NAME'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let list: string[] = ['id', 'name', 'description', 'status', 'created_at', 'updated_at']

	$: loadData(dataObjData)

	function loadData(data: DataObjData) {
		dataObj.objData = data
		state.update({ objValidToSave: dataObj.preValidate() })
	}

	function onChangeFile(fieldName: string, value: any) {
		console.log('FormDetail.onChangeFile:', value)
		setFieldVal(fieldName, value)
	}

	function onChangeInput(event: any) {
		setFieldVal(event.target.name, event.currentTarget.value)
	}

	function onChangeItem(event: CustomEvent) {
		const fieldName = event.detail.fieldName
		const value = event.detail.value
		setFieldVal(fieldName, value)
	}

	function setFieldVal(fieldName: string, value: any) {
		const idx = dataObj.getFieldIdx(fieldName)
		if (idx >= 0) {
			dataObj.fields[idx].valueCurrent = value
			validateField(idx, value)
			// console.log('FormDetail.setFieldVal:', { fieldName, value })
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
						<FormElInpCheckbox {field} on:changeItem={onChangeItem} />
					{:else if field instanceof FieldChips}
						<FormElChips {field} on:changeItem={onChangeItem} />
					{:else if field instanceof FieldCustom}
						<FormElCustom bind:field {state} data={dataObj.objData.getData()} />
					{:else if field instanceof FieldFile}
						<FormElFile bind:field onChange={onChangeFile} />
					{:else if field instanceof FieldInput}
						<FormElInp
							{field}
							on:change={onChangeInput}
							on:keyup={onChangeInput}
							on:changeItem={onChangeItem}
						/>
					{:else if field instanceof FieldRadio}
						<FormElInpRadio {field} on:changeItem={onChangeItem} />
					{:else if field instanceof FieldSelect}
						<FormElSelect {field} on:changeItem={onChangeItem} />
					{:else if field instanceof FieldTextarea}
						<FormElTextarea {field} on:change={onChangeInput} on:keyup={onChangeInput} />
					{:else if field instanceof FieldToggle}
						<FormElToggle {field} on:changeItem={onChangeItem} />
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
