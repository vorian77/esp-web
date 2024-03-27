<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'
	import ElgDocRec from './ElgDocRec.svelte'

	export let docsStatus: Array<{}> = []

	const modalStore = getModalStore()

	let formDefn = {}

	async function setDocModal(elgId: number) {
		const formDefn = await getFormData(elgId)
		openModal(formDefn)

		async function getFormData(elgId: number) {
			const responePromise: Response = await fetch('/home/cm/docs', {
				method: 'POST',
				body: JSON.stringify({ elgId }),
				headers: {
					'content-type': 'application/json'
				}
			})
			const data = await responePromise.json()
			return data.formDefn
		}

		async function getlistData() {
			const responePromise: Response = await fetch('/home/cm/docs', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			})
			return await responePromise.json()
		}

		async function openModal(formDefn: {}) {
			const modal: ModalSettings = {
				type: 'component',
				component: {
					ref: ElgDocRec,
					props: { formDefn }
				},
				response: async (r: any) => {
					if (r) {
						docsStatus = await getlistData()
					}
				}
			}
			modalStore.trigger(modal)
		}
	}
</script>

<div class="text-sm">
	<p>
		You can speed up the processing of your application by submitting digital images of documents
		that prove your eligibility for services.
	</p>

	<p>
		Click the button next to each requirement to see if you have a document that satisfies that
		particular requirement.
	</p>

	<p>Don't worry if you don't have all or any of the documents.</p>
</div>

<div>
	<h2 class="h2 text-center bg-slate-100 mt-5">Document Categories</h2>
</div>

{#each docsStatus as { id, ct_col_ext, eligibility, uploaded }, index (id)}
	<div class="grid grid-cols-3 gap-2">
		<div class="col-span-2 text-right self-center">
			{eligibility}:
		</div>
		<div class="self-center my-4">
			{#if uploaded}
				<button class="btn variant-soft-secondary" on:click={() => setDocModal(id)}
					>Update...</button
				>
			{:else}
				<button class="btn variant-filled-secondary" on:click={() => setDocModal(id)}
					>Upload...</button
				>
			{/if}
		</div>
	</div>
{/each}

<style>
	p {
		margin-bottom: 12px;
	}
</style>
