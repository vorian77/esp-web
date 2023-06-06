<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	export let data

	const formDefn = data.formDefn
	const form = new FormDefn(formDefn)

	async function onFormSubmitted(event) {
		console.log('ONFORMSUBMITTED...')
		// data
		const imgStorageKey = event.detail.responseData.storageKey
		console.log('imgStorageKey:', imgStorageKey)

		const field = form.fields.find((f) => f.name == 'pictObj')
		console.log('field:', field.name)
		const imgBlob = field.pictBlob
		console.log('blob:', imgBlob)
		const imgType = imgBlob.type
		console.log('imgType:', imgType)

		// processing
		const url = await getUploadURL(imgType, imgStorageKey)
		await uploadImg(url, imgBlob)

		async function getUploadURL(imgType, imgStorageKey) {
			console.log('imgStorageKey:', imgStorageKey)

			// generate URL
			let api = 'https://moed-yo-api.theappfactory.com'
			api += '/storage/img_url_upload'
			api += `?storageKey=${imgStorageKey}&storageContentType=${imgType}`
			const response = await fetch(api, { method: 'GET' })
			const respData = await response.json()
			let url = respData.url
			console.log('uploadURL:', url)
			// console.log('form.data:', form.data)

			return url
		}

		async function uploadImg(url, imgBlob) {
			// upload image
			try {
				// const result = await fetch(url, {
				// 	method: 'PUT',
				// 	body: dataUrl,
				// 	headers: {
				// 		'Content-Type': `image/png`
				// 	}
				// })
				// Upload file
				const reader = new FileReader()
				reader.onloadend = async () => {
					const resp = await fetch(url, {
						method: 'PUT',
						body: reader.result,
						headers: {
							'Content-Type': imgBlob.type
						}
					})
					const respData = await resp.text()
					console.log('reader response:', respData)
				}
				reader.readAsArrayBuffer(imgBlob)
				// reader.readAsDataURL(dataUrl)
			} catch (error) {
				console.log(`Error in handleSubmit on / route: ${error}`)
			}
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

<!-- console.log('GENERATE AWS S3 URL...')
	let api = 'https://moed-yo-api.theappfactory.com'
	api += '/storage/img_url_upload'
	api += `?storageKey=${imgStorageName}&storageContentType=image/jpeg`
	response = await fetch(api, { method: 'GET' })
	const respData = await response.json()
	const urlS3 = respData.url
	console.log('S3 url:', urlS3)

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
