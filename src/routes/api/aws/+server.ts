import {
	DeleteObjectCommand,
	GetObjectCommand,
	HeadObjectCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getServerResponse } from '$comps/types'
import { AWS_KEY_ACCESS, AWS_KEY_SECRET, AWS_REGION, AWS_BUCKET } from '$env/static/private'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/aws/+server.ts'

const s3 = new S3Client({
	credentials: {
		accessKeyId: AWS_KEY_ACCESS,
		secretAccessKey: AWS_KEY_SECRET
	},
	region: AWS_REGION
})

export async function POST({ request }) {
	let fileStorageKey
	let fileType
	let bucketParams

	const requestData = await request.json()
	const { action, parms } = requestData

	switch (action) {
		case 'getURLDownLoad':
			fileStorageKey = validateParm('getURLDownload', 'fileStorageKey')
			return getURL(new GetObjectCommand({ Bucket: AWS_BUCKET, Key: fileStorageKey }))

		case 'getURLUpload':
			fileStorageKey = validateParm('getURLUpload', 'fileStorageKey')
			fileType = validateParm('getURLUpload', 'fileType')
			return getURL(
				new PutObjectCommand({
					Bucket: AWS_BUCKET,
					Key: fileStorageKey,
					ContentType: fileType
				})
			)

		case 'objDelete':
			fileStorageKey = validateParm('objDelete', 'fileStorageKey')
			bucketParams = { Bucket: AWS_BUCKET, Key: fileStorageKey }

			try {
				const data = await s3.send(new DeleteObjectCommand(bucketParams))
				return new Response(JSON.stringify({ success: true, data }))
			} catch (err) {
				throw err
			}
			break

		case 'objExists':
			fileStorageKey = validateParm('objExists', 'fileStorageKey')
			bucketParams = { Bucket: AWS_BUCKET, Key: fileStorageKey }

			try {
				const response = await s3.send(new HeadObjectCommand(bucketParams))
				return getServerResponse({ success: true })
			} catch (err: any) {
				return getServerResponse({ success: false })
			}
			break

		case 'objList':
			try {
				const { Contents } = await s3.send(
					new ListObjectsV2Command({
						Bucket: AWS_BUCKET
					})
				)
				return new Response(JSON.stringify({ success: true, data: Contents }))
			} catch (err) {
				throw err
			}

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for action: ${action}`
			})
	}

	async function getURL(command: any) {
		try {
			const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
			return new Response(JSON.stringify({ success: true, data: url }))
		} catch (err) {
			return new Response(JSON.stringify({ success: false, message: err }))
		}
	}

	function validateParm(functionName: string, parmName: string) {
		const val = parms[parmName]
		if (val) {
			return val
		} else {
			throw error(500, {
				file: FILENAME + ` (${functionName})`,
				function: 'POST',
				message: `Invalid request parm: ${parmName}`
			})
		}
	}
}
