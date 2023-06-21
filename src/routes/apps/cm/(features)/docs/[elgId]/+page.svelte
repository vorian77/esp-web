<script lang="ts">
	import { setContext, onMount } from 'svelte'
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import type { FormSourceResponseType } from '$comps/esp/form/types'
	import DATABUS from '$lib/utils/databus.utils'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/routes/apps/cm/(features)/docs/[elgId]/page.svelte'

	export let data

	const formDefn = data.formDefn
	let formObj = new FormClass(formDefn)
	let formElement: Form
	setContext('pageData', data)

	async function onFormSubmitted(event) {
		// data
		const imgFile = DATABUS.get('image', 'file')
		const imgType = imgFile.type
		const imgStorageKey = 'raw/' + event.detail.data.storageKey

		console.log('imgType:', imgType)
		console.log('imgFile:', imgFile)

		// process
		let resp

		// get upload url
		let urlUpload = await getURL('get_url_upload', { imgType, imgStorageKey })
		console.log('urlUpload:', urlUpload)

		// upload image
		const response = await uploadImage(urlUpload, imgFile)
		console.log('upload.response:', response)

		// alert('Image uploaded successfully!')
		// history.back()

		async function getURL(action: string, parms: {}) {
			const responsePromise = await fetch('/api/aws', {
				method: 'POST',
				body: JSON.stringify({ action, parms })
			})
			const response: FormSourceResponseType = await responsePromise.json()

			if (!response.data.url) {
				throw error(500, {
					file: FILENAME,
					function: 'getURL',
					message: `Unable to retrieve URL for ${action} - storage key: ${imgStorageKey}.`
				})
			}
			return response.data.url
		}

		async function uploadImage(url, imgFile) {
			try {
				const resp = await fetch(url, {
					method: 'PUT',
					body: imgFile,
					headers: {
						'Content-Type': imgFile.type
					}
				})
				const respData = resp.statusText
				console.log('uploadImage.resp', respData)
				return respData
			} catch (err) {
				throw error(500, {
					file: FILENAME,
					function: 'uploadImage',
					message: `Unable to upload img: ${imgFile.name} Error: ${err}`
				})
			}
		}
	}
</script>

<!-- Shared Image Type: {JSON.stringify($img)} -->
<Form bind:formObj bind:this={formElement} on:formSubmitted={onFormSubmitted} />

<!-- <h3>formObj.fields</h3>
<pre>{JSON.stringify(formObj.fields, null, 2)}</pre> -->
