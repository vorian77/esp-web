<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	export let data

	const formDefn = data.formDefn
	const form = new FormDefn(formDefn)

	async function onFormSubmitted(event) {
		console.log('onFormSubmit...')
		const responseData = event.detail.responseData
		const { url, imgLocalPath } = responseData
		console.log(responseData)

		// upload image
		try {
			// Upload file
			const reader = new FileReader()
			reader.onloadend = async () => {
				await fetch(url, {
					method: 'PUT',
					body: reader.result,
					headers: {
						'Content-Type': 'image/jpeg'
					}
				})
			}
			reader.readAsArrayBuffer(imgLocalPath)
			//reader.readAsDataURL(imgLocalPath)
		} catch (error) {
			console.log(`Error in handleSubmit on / route: ${error}`)
		}
	}
</script>

<Form {form} on:formSubmitted={onFormSubmitted} />

<!-- FORM DEFN:
<pre>{JSON.stringify(formDefn, null, 2)}</pre> -->

<!-- FORM:
<pre>{JSON.stringify(form, null, 2)}</pre> -->

<!-- PAGE DATA:
<pre>{JSON.stringify(form.pageData, null, 2)}</pre>

VALUES:
<pre>{JSON.stringify(form.values, null, 2)}</pre> -->

<!-- RESPONSE DATA:
<pre>{JSON.stringify(responseData, null, 2)}</pre> -->
