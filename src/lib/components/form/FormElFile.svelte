<script lang="ts">
	import type { FieldFile } from '$comps/form/fieldFile'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import {
		TokenApiFileUpload,
		TokenApiFileUploadAction,
		TokenApiFileUploadData
	} from '$comps/types.token'
	import { getURLDownload } from '$utils/utils.aws'
	import DataViewer from '$comps/DataViewer.svelte'
	import { size } from '@floating-ui/dom'

	const FILENAME = '$comps/form/FormElFile.svelte'

	const toastStore = getToastStore()

	export let field: FieldFile
	export let onChange = (fieldName: string, value: any) => {}

	enum Mode {
		unchanged = 'unchanged',
		changing = 'changing',
		changed = 'changed'
	}

	let files: FileList
	let elInput: any
	let mode: Mode = Mode.unchanged
	let storageAction: TokenApiFileUploadAction
	let storageData: TokenApiFileUploadData | undefined
	let storageKeyAction = 'none'
	let imgFileName: string

	let labelSelect: string
	let chooseBtnWidth: string
	const labelDelete = 'Delete ' + field.label

	$: chooseBtnWidth = imgFileName ? 'w-3/4' : 'w-full'
	$: labelSelect = imgFileName ? 'Choose New ' + field.label : 'Choose ' + field.label

	$: {
		initState(field.valueCurrent)

		// set mode
		if (!equals(storageData?.storageKey, storageKeyAction) && mode !== Mode.changing) {
			mode = Mode.unchanged
		} else if (equals(storageData?.storageKey, storageKeyAction) && mode === Mode.changing) {
			mode = Mode.changed
		}

		// render image based on mode
		if (mode === Mode.unchanged) {
			;(async () => {
				imgFileName = storageData?.storageKey ? await getURLDownload(storageData.storageKey) : ''
			})()
		} else {
			imgFileName = files && files[0] ? URL.createObjectURL(files[0]) : ''
			// this comment required to prevent bug - always shows downloaded image
			console.log('FormElFile.source.input:', imgFileName)
		}
	}

	$: showImg = imgFileName ? true : false

	function onDelete(event: Event) {
		mode = Mode.changing
		storageKeyAction = 'delete'
		elInput.value = ''
		onChange(
			field.name,
			new TokenApiFileUpload(TokenApiFileUploadAction.delete, storageData?.storageKey)
		)
	}

	function onNew(event: Event) {
		mode = Mode.changing
		storageKeyAction = storageData?.storageKey ? storageData.storageKey : field.getKey()
		onChange(
			field.name,
			new TokenApiFileUpload(TokenApiFileUploadAction.upload, storageKeyAction, files[0])
		)
	}

	function equals(val1: any, val2: any) {
		return JSON.stringify(val1) === JSON.stringify(val2)
	}

	function initState(valueField: TokenApiFileUploadData | undefined) {
		storageAction = TokenApiFileUploadAction.none
		storageData = valueField
			? new TokenApiFileUploadData(valueField.storageKey, valueField.fileName, valueField.fileType)
			: undefined
	}

	function isImage(fileType: string) {
		return fileType.includes('image')
	}
</script>

<fieldset>
	<legend>{field.label}</legend>

	<div>
		{#if imgFileName && storageData && storageData.isImage}
			<img class="mx-auto p-2" src={imgFileName} alt={field.label} width="80%" hidden={!showImg} />
		{:else if imgFileName && storageData && storageData.isPDF}
			<div class="flex justify-center">
				<iframe src={imgFileName} width="80%" height="600px" title={field.label} frameborder="0" />
			</div>
		{/if}

		<div class="flex">
			<label class="btn variant-filled-primary mt-2 {chooseBtnWidth}" for={field.name}>
				{labelSelect}
			</label>
			{#if imgFileName}
				<button class="btn variant-filled-error mt-2 ml-1 w-1/4" on:click={onDelete}>
					{labelDelete}
				</button>
			{/if}
		</div>

		<input
			class="input"
			type="file"
			id={field.name}
			name={field.name}
			accept="image/*,application/pdf"
			hidden={true}
			bind:files
			bind:this={elInput}
			on:change={onNew}
		/>
	</div>
	{#if storageData?.fileName && storageData?.fileType}
		Name: ({storageData.fileName}) Type: ({storageData.fileType})
	{/if}
</fieldset>
