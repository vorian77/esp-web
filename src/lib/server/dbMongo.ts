import { MongoClient, ServerApiVersion } from 'mongodb'
import { onMount, onDestroy } from 'svelte'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/mongoDB.ts'

import { MONGODB_URI } from '$env/static/private'

// Replace the placeholder with your Atlas connection string
const uri = MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
})

try {
	await client.connect()
} catch (err) {
	throw error(500, {
		file: FILENAME,
		function: 'Launch',
		message: 'Connection to MongoDB failed.'
	})
}

onMount(() => {
	return client.close()
})

export async function dbGetForm(formName: string) {
	const forms = client.db('ESP').collection('forms')
	const result = await forms.findOne({ name: formName }, { projection: { _id: 0 } })
	console.log('dbGetForm:', formName)

	if (!result) {
		throw error(500, {
			file: FILENAME,
			function: 'dbGetForm',
			message: `Unable to retrieve form (${formName}).`
		})
	}

	return result
}

export async function dbUpsertForm(newForm: {}) {
	const forms = client.db('ESP').collection('forms')
	return await forms.replaceOne({ name: newForm.name }, newForm, { upsert: true })
	throw error(500, {
		file: FILENAME,
		function: 'dbUpsertForm',
		message: `Unable to upsert form (${JSON.stringify(newForm)}).`
	})
}
