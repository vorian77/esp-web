<script lang="ts">
	import { getContext, setContext } from 'svelte'
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import type { FormSourceResponseType } from '$comps/esp/form/types'

	export let data
	const formDefn = data.formDefn
	let formObj = new FormDefn(formDefn)
	setContext('pageData', formDefn.pageData)

	async function onFormSubmitted(event) {
		console.log('ONFORMSUBMITTED...')
		console.log('event.detail:', event.detail)
		// data - response from api submit and pagedata
		const imgStorageKey = event.detail.storageKey
		//console.log('storageKey:', imgStorageKey)

		// const imgBlob = getContext('uploadImgBlob')
		// const imgType = getContext('uploadImgType')

		// processing
		// const url = await getUploadURL(imgType, imgStorageKey)
		// console.log('uploadURL:', url)
		//await uploadImg(url, imgBlob)

		async function getUploadURL(imgType, imgStorageKey) {
			const responsePromise = await fetch('/api/aws', {
				method: 'POST',
				body: { action: 'url_upload', imgType, imgStorageKey }
			})
			const response: FormSourceResponseType = await responsePromise.json()
			console.log('response:', response)
			let url = response.data.url
			return url
		}

		async function uploadImg(url, imgBlob) {
			try {
				// const reader = new FileReader()
				// reader.onloadend = async () => {
				// 	const resp = await fetch(url, {
				// 		method: 'PUT',
				// 		body: reader.result,
				// 		headers: {
				// 			'Content-Type': imgBlob.type
				// 		}
				// 	})
				// 	const respData = await resp.text()
				// 	console.log('reader response:', respData)
				// }
				// reader.readAsArrayBuffer(imgBlob)
			} catch (error) {
				console.log(`Error in handleSubmit on / route: ${error}`)
			}
		}
	}
</script>

<Form bind:formObj on:formSubmitted={onFormSubmitted} />

<h3>formObj.submitResponse</h3>
<pre>{JSON.stringify(formObj.submitResponse, null, 2)}</pre>

<h3>formObj.fields</h3>
<pre>{JSON.stringify(formObj.fields, null, 2)}</pre>

<!-- console.log('GENERATE AWS S3 URL...')
	return new Response(JSON.stringify({ success: true }))

	console.log('AWS_KEY_ACCESS:', AWS_KEY_ACCESS)

	// upload image to S3
	try {
		const s3Parms = {
			credentials: {
				accessKeyId: AWS_KEY_ACCESS,
				secretAccessKey: AWS_KEY_SECRET
			},
			region: AWS_REGION,
			signatureVersion: 'v4'
		}
		const s3 = new S3Client(s3Parms)

		// const client = new S3Client({
		// 	region: 'us-east-2',
		// 	accessKeyId: ACCESS_KEY,
		// 	secretAccessKey: SECRET_KEY
		// })
		const command = new PutObjectCommand({
			Bucket: AWS_BUCKET,
			Key: imgName,
			Body: 'Hello S3!'
		})
		// const response = await s3.send(command)
		// console.log(response)

		// const fs = require('fs/promises')
		// const imageFile = fs.readFile('/Users/filepath/image-file.png')
		await axios.put(urlS3, blob, {
			headers: {
				'Content-Type': imgType
			}
		})
		// reader.readAsArrayBuffer(blob)
		// reader.readAsDataURL(imgURL)
	} catch (error) {
		console.log(`Error in handleSubmit on / route: ${error}`)
	} -->
