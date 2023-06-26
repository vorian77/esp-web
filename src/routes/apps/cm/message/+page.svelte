<script lang="ts">
	import ListboxSelectSingle from '$comps/ListboxSelectSingle.svelte'
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'

	function onChange() {
		alert('changed...')
	}

	const modal: ModalSettings = {
		type: 'alert',
		title: 'Example Alert',
		body: 'This is an example modal.',
		image: 'https://i.imgur.com/WOgTG96.gif'
	}
	modalStore.trigger(modal)

	async function openModal() {
		new Promise<boolean>((resolve) => {
			const modal: ModalSettings = {
				type: 'confirm',
				title: 'Please Confirm',
				body: 'Are you sure you wish to proceed?',
				response: (r: boolean) => {
					resolve(r)
				}
			}
			modalStore.trigger(modal)
		}).then((r: any) => {
			console.log('resolved response:', r)
		})
	}
</script>

<h2>Message Us</h2>

<!-- <ListboxSelectSingle /> -->

<Modal />

<button class="btn" on:click={openModal}>Open Modal</button>
