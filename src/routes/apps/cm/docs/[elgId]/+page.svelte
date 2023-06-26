<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import type { FormSourceResponseType } from '$comps/types.js'
	import { asDelete, asGet, asUpsert } from '$lib/utils/utils'
	import { onDestroy } from 'svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/routes/apps/cm/(features)/docs/[elgId]/page.svelte'

	export let data

	const formDefn = data.formDefn

	let formObj = new FormClass(formDefn)
	let formElement: Form

	asUpsert('image', 'pageData', data)

	onDestroy(() => {
		asDelete('image', 'pageData')
		asDelete('image', 'file')
	})

	async function onFormSubmitted(event) {
		// data
		const imgFile = asGet('image', 'file')
		const imgType = imgFile.type
		const imgStorageKey = 'raw/' + event.detail.storageKey

		// process

		// get upload url
		let urlUpload = await getURL('get_url_upload', { imgType, imgStorageKey })

		// upload image
		const response = await uploadImage(urlUpload, imgFile)
		console.log('upload.response:', response)

		alert('Image uploaded successfully!')
		history.back()

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

<Form bind:formObj bind:this={formElement} on:formSubmitted={onFormSubmitted} />
