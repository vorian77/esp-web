<script lang="ts">
	import { Camera, CameraResultType } from '@capacitor/camera'
	import type { FieldPictureTake } from '$comps/esp/form/fieldPictureTake'
	import { getContext, tick } from 'svelte'
	import DATABUS from '$lib/utils/databus.utils'

	const FILENAME = 'FormElPictureTake.svelte'

	export let field: FieldPictureTake
	const pageData = getContext('pageData')

	let imgURL = pageData.imgStorageUrl

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			// ImageOptions
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Base64
		})
		const uploadImgType = 'image/' + image.format

		// convert Base64 into binary
		// https://stackoverflow.com/a/62144916/473881
		const rawData = atob(image.base64String)
		const bytes = new Array(rawData.length)
		for (let i = 0; i < rawData.length; i++) {
			bytes[i] = rawData.charCodeAt(i)
		}
		const arr = new Uint8Array(bytes)

		const uploadImgBlob = new Blob([arr], { type: uploadImgType })

		// convert binary into url
		imgURL = URL.createObjectURL(uploadImgBlob)

		field.value = uploadImgType

		// parentImg.setImage = { type: uploadImgType }
		DATABUS.upsert('image', 'type', uploadImgType)
		DATABUS.upsert('image', 'blob', uploadImgBlob)

		// dispatch change event
		await tick()
		const elem = document.getElementById(field.name)
		elem.dispatchEvent(new Event('change'))
	}
</script>

<label class="label" for={field.name}>
	<img class="mx-auto mt-2" src={imgURL} alt={field.imageAltText} width={field.imageWidth} />

	<button
		type="button"
		class="btn variant-filled-primary w-full mt-2"
		on:click={() => takePicture()}>{field.buttonLabel}</button
	>
	<input
		class="input"
		type="text"
		id={field.name}
		name={field.name}
		value={field.value}
		on:change
	/>

	<div>Field: {field.name}</div>
	{JSON.stringify(field.validity)}
</label>
