<script lang="ts">
	import { Camera, CameraResultType } from '@capacitor/camera'
	import type { FieldPictureTake } from '$comps/esp/form/fieldPictureTake'
	import { ValidityLevel } from '$comps/esp/form/types'

	// aws setup

	const FILENAME = 'FormElPictureTake.svelte'

	export let field: FieldPictureTake

	// if (field.value) {
	// 	format = field.value?.format
	// 	dataUrl = field.value?.dataUrl
	// }

	$: format = ''
	$: imgData = ''
	$: imgURL = '/src/lib/assets/cup.jpg'
	$: imgType = ''
	$: imgWebPath = ''

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			// ImageOptions
			quality: 90,
			allowEditing: true,
			//resultType: CameraResultType.Uri
			resultType: CameraResultType.Base64
			//resultType: CameraResultType.DataUrl
		})
		// console.log('TAKE PICTURE...')
		format = image.format
		imgType = 'image/' + image.format
		// console.log('imgType:', imgType)

		//dataUrl = image.dataUrl
		// imgData = image.dataUrl

		// console.log('imgType:', imgType)
		// console.log(imgData)

		//imgWebPath = image.webPath
		//console.log(imgWebPath)

		// convert Base64 into binary
		// https://stackoverflow.com/a/62144916/473881
		imgData = image.base64String
		const rawData = atob(imgData)
		// console.log('rawData length:', rawData.length)
		const bytes = new Array(rawData.length)
		for (let i = 0; i < rawData.length; i++) {
			bytes[i] = rawData.charCodeAt(i)
		}
		const arr = new Uint8Array(bytes)
		field.pictBlob = new Blob([arr], { type: imgType })
		// imgBlob = blob

		// convert binary into url
		imgURL = URL.createObjectURL(field.pictBlob)
		// console.log('imgURL:', imgURL)

		//on:dismount revokeObjectURL(imgUrl)
		// axios can return blob by adding resposneType: 'blob' - saves converting anything
	}
</script>

<label class="label" for={field.name}>
	<img class="mx-auto mt-2" src={imgURL} alt={field.imageAltText} width={field.imageWidth} />
	<button type="button" class="btn variant-filled-primary w-full mt-2" on:click={takePicture}
		>{field.buttonLabel}</button
	>

	<!-- type="hidden" -->

	<input
		id={field.name}
		name={field.name}
		value={JSON.stringify({ imgType, imgURL })}
		class="input bg-white text-black"
		class:input-warning={field.validity.level == ValidityLevel.warning}
		class:input-error={field.validity.level == ValidityLevel.error}
		on:change
	/>
</label>

<!-- <div>
	FORMAT:
	{format}
</div>
<div>
	DATA URL:
	{dataUrl}
</div> -->

<!-- <label class="label" for={field.name}1>
	<span>{field.label}</span>
	<input
		class="input bg-white text-black"
		type={field.type}
		id={field.name}
		name={field.name}
		placeholder={field.placeHolder}
		value={field.value}
		disabled={field.disabled}
		class:input-warning={field.validity.level == ValidityLevel.warning}
		class:input-error={field.validity.level == ValidityLevel.error}
		on:change
	/>
</label> -->
