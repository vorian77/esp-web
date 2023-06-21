<script lang="ts">
	import type { FieldPictureTake } from '$comps/esp/form/fieldPictureTake'
	import { getContext, tick } from 'svelte'
	import DATABUS from '$lib/utils/databus.utils'

	const FILENAME = 'FormElPictureTake.svelte'

	export let field: FieldPictureTake
	const pageData: {} = getContext('pageData')

	let files: FileList

	field.value = pageData.imgStorageUrl

	$: if (files) {
		// file input on:change
		const file: File = files[0]
		const fileType: string = file.type

		field.value = URL.createObjectURL(file)

		DATABUS.upsert('image', 'type', fileType)
		DATABUS.upsert('image', 'file', file)
	}
	function onImageError(event) {
		field.value = null
	}
	export function setImage(newImageURL: string) {
		field.value = newImageURL
	}
</script>

<label class="label" for={field.name}>
	<img
		class="mx-auto mt-2"
		src={field.value}
		alt={field.imageAltText}
		width={field.imageWidth}
		on:error={onImageError}
	/>
</label>

<label class="btn variant-filled-primary w-full mt-2" for={field.name}
	>2. Take picture of document</label
>
<input
	class="input"
	type="file"
	id={field.name}
	name={field.name}
	accept="image/*"
	hidden={true}
	bind:files
	bind:value={field.value}
	on:change
/>

<div>
	FIELD.VALUE: {field.value}
</div>
