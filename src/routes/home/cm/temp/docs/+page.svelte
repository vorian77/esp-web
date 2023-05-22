<script>
	import { Camera, CameraResultType } from '@capacitor/camera'
	import FormElSelect from '$comps/esp/form/FormElSelect.svelte'
	import { FieldSelect } from '$comps/esp/form/fieldSelect'

	let currentPict

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri
		})
		currentPict = image.webPath
	}

	const fieldDefn = {
		element: 'select',
		name: 'documentType',
		label: '1. Select document type',
		items: [
			{
				id: 1,
				label: 'Address/Residency'
			},
			{
				id: 2,
				label: 'Birthday/Age'
			},
			{
				id: 3,
				label: 'Citizenship/Alien Status'
			},
			{
				id: 4,
				label: 'Out of School Status'
			},
			{
				id: 5,
				label: 'Selective Service Registration'
			},
			{
				id: 6,
				label: 'Social Security Number'
			}
		]
	}

	const field = new FieldSelect(fieldDefn, 0)
	function msg() {
		alert('Uploading document...')
	}
</script>

<div class="esp-card">
	<h3 class="font-bold">Eligibility Documentation</h3>

	<section class="">
		<FormElSelect {field} />

		<button type="button" class="btn variant-filled-primary w-full mt-2" on:click={takePicture}
			>2. Take a picture of the document with your camera</button
		>

		<img class="mx-auto mt-2" src={currentPict} alt="demo pic" width="250" />

		<button type="button" class="btn variant-filled-primary w-full mt-2" on:click={msg}
			>3. Submit Document</button
		>
	</section>
</div>
