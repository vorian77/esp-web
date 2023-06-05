<script lang="ts">
	import { Camera, CameraResultType } from '@capacitor/camera'
	import type { FieldPictureTake } from '$comps/esp/form/fieldPictureTake'
	import { ValidityLevel } from '$comps/esp/form/types'
	export let field: FieldPictureTake

	const FILENAME = 'FormElPictureTake.svelte'

	$: currentPict = ''

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri
		})
		currentPict = image.webPath
	}
</script>

<label class="label" for={field.name}>
	<img class="mx-auto mt-2" src={currentPict} alt={field.imageAltText} width={field.imageWidth} />
	<button type="button" class="btn variant-filled-primary w-full mt-2" on:click={takePicture}
		>{field.buttonLabel}</button
	>

	<!-- type="hidden" -->
	<input
		id={field.name}
		name={field.name}
		value={currentPict}
		class="input bg-white text-black"
		class:input-warning={field.validity.level == ValidityLevel.warning}
		class:input-error={field.validity.level == ValidityLevel.error}
		on:change
	/>
</label>

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
