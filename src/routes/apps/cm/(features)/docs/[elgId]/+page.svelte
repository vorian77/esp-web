<script lang="ts">
	import { setContext } from 'svelte'
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import type { FormSourceResponseType } from '$comps/esp/form/types'
	import DATABUS from '$lib/utils/databus.utils'

	export let data

	const formDefn = data.formDefn
	let formObj = new FormDefn(formDefn)
	setContext('pageData', data)

	async function onFormSubmitted(event) {
		// data
		const imgType = DATABUS.get('image', 'type')
		const imgBlob = DATABUS.get('image', 'blob')
		const imgStorageKey = event.detail.storageKey

		// process
		const url = await getUploadURL(imgType, imgStorageKey)
		await uploadImg(url, imgBlob)
		alert('Image uploaded successfully!')
		history.back()

		async function getUploadURL(imgType, imgStorageKey) {
			const responsePromise = await fetch('/api/aws', {
				method: 'POST',
				body: JSON.stringify({ action: 'get_url_upload', imgType, imgStorageKey })
			})
			const response: FormSourceResponseType = await responsePromise.json()
			return response.data.url
		}

		async function uploadImg(url, imgBlob) {
			try {
				const reader = new FileReader()
				reader.onloadend = async () => {
					const resp = await fetch(url, {
						method: 'PUT',
						body: reader.result,
						headers: {
							'Content-Type': imgBlob.type
						}
					})
				}
				reader.readAsArrayBuffer(imgBlob)
			} catch (error) {
				console.log(`Unable to upload img: ${imgStorageKey} Error: ${error}`)
			}
		}
	}
</script>

<!-- Shared Image Type: {JSON.stringify($img)} -->
<Form bind:formObj on:formSubmitted={onFormSubmitted} />

<h3>formObj.fields</h3>
<pre>{JSON.stringify(formObj.fields, null, 2)}</pre>
