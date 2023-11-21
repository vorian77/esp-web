<script lang="ts">
	import { Form } from '$comps/form/form'
	import { FieldValue, type Field } from '$comps/form/field'
	import {
		FieldElement,
		Validation,
		ValidityField,
		ValidityErrorLevel,
		ValidityError,
		valueOrDefault
	} from '$comps/types'
	import FormElFile from '$comps/form/FormElFile.svelte'
	import FormElInp from '$comps/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/form/FormElInpRadio.svelte'
	import FormElLabel from '$comps/form/FormElLabel.svelte'
	import FormElSelect from '$comps/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/form/FormElTextarea.svelte'
	import FormLink from '$comps/form/FormLink.svelte'
	import DataObjActions from '$comps/DataObjActions.svelte'
	import {
		navParms,
		navStatus,
		setNavStatusObjChanged,
		setNavStatusObjValid
	} from '$comps/nav/navStore'
	import DataViewer from '$comps/DataViewer.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const FILENAME = '$comps/form/FormDetail.svelte'
	const FORM_NAME = ''
	const SUBMIT_BUTTON_NAME = 'SUBMIT_BUTTON_NAME'

	export let dataObj: any
	export let surface = ''

	// export let scrollToTop = () => {}

	let formObj = new Form(dataObj.defn)
	let classPopup = ''
	let classPopupHeader = ''

	$: {
		classPopup = formObj.isPopup ? 'grid grid-cols-10 gap-4' : ''
		classPopupHeader = formObj.isPopup ? 'col-span-9' : ''
	}

	$: formObj.objData = $navParms
	$: setNavStatusObjChanged(formObj.hasChanged())
	$: setNavStatusObjValid(formObj.validToSave)

	// export async function submitForm() {
	// 	const v: Validation = formObj.validateForm()
	// 	if (v.status != ValidationStatus.valid) {
	// 		setValidities(v.validityFields)
	// 		return v
	// 	}
	// 	validToSave(true)

	// 	// post form to server
	// 	const responsePromise = await formObj.submitForm()
	// 	const response = await responsePromise.json()

	// 	// alert parent
	// 	dispatch('formSubmitted', { formName: formObj.name, ...response.data })
	// }

	function cancelForm(event: MouseEvent) {
		dispatch('formCancelled')
	}
	function onChangeFile(fieldName: string, valData: any, valDisplay: any, saveCallbacks: any) {
		setFieldVal(fieldName, valData, valDisplay)
		formObj.saveCallbackAdd(fieldName, saveCallbacks)
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
			const idx = formObj.getFieldIdx(fieldName)
			if (idx >= 0) {
				const field = formObj.fields[idx]
				const newValue = !valueOrDefault(field.value.data, false)
				setFieldVal(fieldName, newValue)
			}
		} else {
			// multi-select
			fieldName = eventName[0]
			const checkedItemID: string = eventName[1]
			const idx = formObj.getFieldIdx(fieldName)
			if (idx >= 0) {
				const field = formObj.fields[idx]

				const itemIdx = field.items.findIndex((i: FieldValue) => {
					return i.data === checkedItemID
				})
				if (itemIdx >= 0) field.items[itemIdx].selected = !field.items[itemIdx].selected

				let values: Array<string> = []
				field.items.forEach((i: FieldValue) => {
					if (i.selected) values.push(i.data)
				})
				setFieldVal(fieldName, values.toString())
			}
		}
	}

	function setFieldVal(fieldName: string, newValData: any, newValDisplay: any = undefined) {
		if (newValDisplay === undefined) newValDisplay = newValData
		const idx = formObj.getFieldIdx(fieldName)
		if (idx >= 0) {
			formObj.fields[idx].value = new FieldValue(newValData, newValDisplay)
			validateField(idx, newValData)
		}
		return idx
	}

	function validateField(fieldIdx: number, value: any) {
		const v: Validation = formObj.fields[fieldIdx].validate(value)
		setValidities(v.validityFields)
	}

	function setValidities(newValidities: Array<ValidityField>) {
		newValidities.forEach(({ index, validity }) => {
			formObj.fields[index].validity = validity
		})
		formObj.validToSave = formObj.fields.every(
			({ validity }) => validity.error == ValidityError.none
		)
	}
</script>

<!-- <DataViewer header="navStatus" data={$navStatus} /> -->

<div class={surface}>
	<div class="flex justify-between">
		<div>
			{#if formObj.header}
				<div class={classPopup}>
					<div class={classPopupHeader}>
						<h1 class="h1 {formObj.subHeader ? '' : 'mb-5'}">{formObj.header}</h1>
					</div>
				</div>
			{/if}
		</div>
		<div class="flex">
			<div>
				<DataObjActions {formObj} />
			</div>
			<div>
				{#if formObj.isPopup}
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled-error ml-2"
						on:click={cancelForm}>X</button
					>
				{/if}
			</div>
		</div>
	</div>

	{#if formObj.subHeader}
		<div class="mb-5">
			<p class="text-sm text-gray-500">
				{formObj.subHeader}
			</p>
		</div>
	{/if}

	<form id={'form_' + formObj.name} on:submit|preventDefault>
		{#each formObj.fields as field, idx (field.name)}
			{#if field.isDisplayable && field.isDisplay}
				<div class:mt-3={idx}>
					{#if field.element === FieldElement.checkbox}
						<FormElInpCheckbox {field} on:click={onClickCheckbox} />
					{:else if field.element === FieldElement.file}
						<FormElFile bind:field onChange={onChangeFile} />
					{:else if [FieldElement.date, FieldElement.email, FieldElement.number, FieldElement.password, FieldElement.tel, FieldElement.text].includes(field.element)}
						<FormElInp {field} on:change={onChangeInput} on:keyup={onChangeInput} />
					{:else if field.element === FieldElement.label}
						<div class:mt-9={idx}>
							<FormElLabel bind:field navParms={formObj.objData} />
						</div>
					{:else if field.element === FieldElement.radio}
						<FormElInpRadio {field} on:change={onChangeInput} />
					{:else if field.element === FieldElement.select}
						<FormElSelect {field} onChange={onChangeSelect} />
					{:else if field.element === FieldElement.textArea}
						<FormElTextarea {field} on:change={onChangeInput} on:keyup={onChangeInput} />
					{/if}
				</div>

				{#if formObj.fields[idx].validity.level == ValidityErrorLevel.error}
					<div class="text-error-500 mb-3">
						<p>{formObj.fields[idx].validity.message}</p>
					</div>
				{:else if formObj.fields[idx].validity.level == ValidityErrorLevel.warning}
					<div class="text-warning-500 mb-3">
						<p>{formObj.fields[idx].validity.message}</p>
					</div>
				{/if}
				Original Val: {field.valueSelected.data} Current Val: {field.value.data} HasChanged: {field.hasChanged}
			{/if}
		{/each}

		{#if formObj.submitButtonLabel}
			<button
				id={formObj.name}
				type="submit"
				class="btn variant-filled-primary w-full mt-2"
				disabled={!formObj.validToSave}
			>
				{formObj.submitButtonLabel}
			</button>
		{/if}
	</form>
	{#each formObj.footerText as txt}
		<div class="text-center {txt.fontSize}">
			<p>{txt.label}</p>
		</div>
	{/each}
	{#each formObj.footerLinks as link}
		<FormLink footerLink={link} on:form-link />
	{/each}
</div>

<!-- <DataViewer header="navData" data={$navData} /> -->
<!-- <DataViewer header="dataSource" data={dataSource} /> -->
<!-- <DataViewer header="defn" data={formObj.defn} /> -->
