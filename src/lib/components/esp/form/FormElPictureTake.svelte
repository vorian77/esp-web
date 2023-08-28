<script lang="ts">
	import type { FieldPictureTake } from '$comps/esp/form/fieldPictureTake'
	import { asGet, asUpsert } from '$lib/utils/utils'

	const FILENAME = 'FormElPictureTake.svelte'

	export let field: FieldPictureTake

	let files: FileList

	$: if (files) {
		// file input on:change
		const file: File = files[0]
		asUpsert('image_file', file)
		field.value = URL.createObjectURL(file)
	}

	function onImageError(event) {
		field.value = null
	}
</script>

<img
	class="mx-auto mt-2"
	src={field.value}
	alt={field.imageAltText}
	width={field.imageWidth}
	on:error={onImageError}
/>

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
