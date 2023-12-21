<script lang="ts">
	import type { FieldFile } from '$comps/form/fieldFile'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import type { ResponseBody } from '$comps/types.js'
	import { getURLDownload, objDelete, objExists, objUpload } from '$comps/fileTransferAWS'

	const FILENAME = '$comps/form/FormElFile.svelte'

	const toastStore = getToastStore()

	export let field: FieldFile
	export let onChange = (fieldName: string, valData: any, valDisplay: any, saveCallbacks: any) => {}

	enum Mode {
		unchanged = 'unchanged',
		changing = 'changing',
		changed = 'changed'
	}

	let files: FileList
	let elInput: any
	let mode: Mode = Mode.unchanged
	let keyInput: string | null = '-1'
	let keyDelete = ''
	let keyUpload: string
	let imgFileName: string

	let labelSelect: string
	let chooseBtnWidth: string
	const labelDelete = 'Delete ' + field.label

	$: chooseBtnWidth = imgFileName ? 'w-3/4' : 'w-full'
	$: labelSelect = imgFileName ? 'Choose New ' + field.label : 'Choose ' + field.label

	$: {
		// set mode
		const keyData = getKey(field.valueCurrent)
		if (keyData !== keyInput && mode !== Mode.changing) {
			mode = Mode.unchanged
		} else if (keyData === keyInput && mode === Mode.changing) {
			mode = Mode.changed
		}

		// render image based on mode
		if (mode === Mode.unchanged) {
			;(async () => {
				imgFileName = keyData ? await getURLDownload(keyData) : ''
			})()
		} else {
			imgFileName = files && files[0] && files[0].name ? URL.createObjectURL(files[0]) : ''
			// this comment required to prevent bug - always shows downloaded image
			console.log('ElFile.source.input:', imgFileName)
		}
	}

	$: showImg = imgFileName ? true : false

	function onDelete(event: Event) {
		mode = Mode.changing
		keyDelete = getKey(field.valueCurrent)
		keyInput = null
		elInput.value = ''
		onChange(field.name, null, null, fieldObjDelete)
	}

	function onChangeInput(event: Event) {
		mode = Mode.changing
		keyUpload = getKeyNew(field.valueCurrent)
		keyInput = keyUpload
		onChange(field.name, files[0].name, keyUpload, fieldObjUpload)
	}

	const fieldObjDelete = async function () {
		let objKey = keyDelete
		let fieldLabel = field.label

		if (await objExists(objKey)) {
			const result: ResponseBody = await objDelete(objKey)
			if (!result.success) {
				alert(`Could not delete object: ${objKey} for field: ${fieldLabel}.`)
				return false
			}
			const toastSettings: ToastSettings = {
				background: 'variant-filled-secondary',
				message: field.label + ' deleted successfully!'
			}
			toastStore.trigger(toastSettings)
		}
	}

	const fieldObjUpload = async function () {
		let objKey = keyUpload
		let fieldLabel = field.label
		let file = files[0]

		const result: ResponseBody = await objUpload(objKey, file)
		if (!result.success) {
			alert(`Unabled to upload ${fieldLabel}. Processing cancelled.`)
			return
		}

		const toastSettings: ToastSettings = {
			background: 'variant-filled-secondary',
			message: field.label + ' uploaded successfully!'
		}
		toastStore.trigger(toastSettings)
	}

	function getKey(fieldVal: any) {
		return fieldVal.display ? fieldVal.display : null
	}
	function getKeyNew(fieldVal: any) {
		let key = getKey(fieldVal)
		return key ? key : field.getKey()
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
			on:change={onChangeInput}
		/>
	</div>
</fieldset>
