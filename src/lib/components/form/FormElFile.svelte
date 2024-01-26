<script lang="ts">
	import type { FieldFile } from '$comps/form/fieldFile'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import { TokenApiFileUpload, TokenApiFileUploadAction } from '$lib/api'
	import { getURLDownload, objDelete, objExists, objUpload } from '$utils/utils.aws'

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
	let storageKeyAction = 'none'
	let storageKeyField: string | undefined
	let imgFileName: string

	let labelSelect: string
	let chooseBtnWidth: string
	const labelDelete = 'Delete ' + field.label

	$: chooseBtnWidth = imgFileName ? 'w-3/4' : 'w-full'
	$: labelSelect = imgFileName ? 'Choose New ' + field.label : 'Choose ' + field.label

	$: {
		setState(field.valueCurrent)

		// set mode
		if (!equals(storageKeyField, storageKeyAction) && mode !== Mode.changing) {
			mode = Mode.unchanged
		} else if (equals(storageKeyField, storageKeyAction) && mode === Mode.changing) {
			mode = Mode.changed
		}

		// render image based on mode
		if (mode === Mode.unchanged) {
			;(async () => {
				imgFileName = storageKeyField ? await getURLDownload(storageKeyField) : ''
			})()
		} else {
			imgFileName = files && files[0] ? URL.createObjectURL(files[0]) : ''
			// this comment required to prevent bug - always shows downloaded image
			console.log('ElFile.source.input:', imgFileName)
		}
	}

	$: showImg = imgFileName ? true : false

	function onDelete(event: Event) {
		mode = Mode.changing
		storageKeyAction = 'delete'
		elInput.value = ''
		onChange(field.name, new TokenApiFileUpload(TokenApiFileUploadAction.delete, storageKeyField))
	}

	function onNew(event: Event) {
		mode = Mode.changing
		storageKeyAction = storageKeyField ? storageKeyField : field.getKey()
		onChange(
			field.name,
			new TokenApiFileUpload(TokenApiFileUploadAction.upload, storageKeyAction, files[0])
		)
	}

	function setState(valueField: TokenApiFileUpload | undefined) {
		storageAction = TokenApiFileUploadAction.none
		storageKeyField = valueField ? valueField.storageKey : undefined
	}

	function equals(val1: any, val2: any) {
		return JSON.stringify(val1) === JSON.stringify(val2)
	}
</script>

<fieldset>
	<legend>{field.label}</legend>

	<div>
		<img
			class="mx-auto p-2"
			src={imgFileName}
			alt={field.label}
			width={field.width}
			hidden={!showImg}
		/>

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
			accept="image/*"
			hidden={true}
			bind:files
			bind:this={elInput}
			on:change={onNew}
		/>
	</div>
</fieldset>
