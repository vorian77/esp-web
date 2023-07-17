<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton'
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import type { FormSourceResponseType } from '$comps/types.js'
	import { asDelete, asGet } from '$lib/utils/utils'
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { onDestroy } from 'svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/routes/apps/cm/docs/ElgDocRec.svelte'

	export let formDefn: any

	let formObj = new FormClass(formDefn)
	let formElement: Form

	onDestroy(() => {
		asDelete('image', 'file')
	})

	async function onFormSubmitted(event) {
		// data
		const imgFile = asGet('image', 'file')
		if (!imgFile.name) {
			toastStore.trigger({
				message: 'No change made to uploaded image.',
				background: 'variant-filled-warning'
			})
			if ($modalStore[0].response) $modalStore[0].response(false)
			modalStore.close()
			return
		}

		const imgType = imgFile.type
		const imgStorageKey = 'raw/' + event.detail.storageKey

		// process

		// get upload url
		let urlUpload = await getURL('get_url_upload', { imgType, imgStorageKey })

		// upload image
		const response = await uploadImage(urlUpload, imgFile)
		toastStore.trigger({
			message: 'Document uploaded successfully!'
		})
		if ($modalStore[0].response) $modalStore[0].response(true)
		modalStore.close()

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
				return respData
			} catch (err) {
				throw error(500, {
					file: FILENAME,
					function: 'uploadImage',
					message: `Unable to upload image: ${imgFile.name} Error: ${err}`
				})
			}
		}
	}

	function onformCancelled() {
		modalStore.close()
	}
</script>

<div class="esp-card-space-y">
	<Form
		bind:formObj
		bind:this={formElement}
		on:formSubmitted={onFormSubmitted}
		on:formCancelled={onformCancelled}
	/>
</div>
