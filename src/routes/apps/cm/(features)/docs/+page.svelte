<script lang="ts">
	import { goto } from '$app/navigation'

	export let data
	const docsStatus = data.docsStatus
	docsStatus[0].uploaded = true
	docsStatus[2].uploaded = true

	function setDoc(id, eligibility) {
		goto(`/apps/cm/docs/${id}`)
	}

	function submitRegistration() {
		alert(`Submit registration...`)
	}
</script>

<h1 class="h1 mb-2">Proofs of Eligibility</h1>
<div class="text-sm">
	<p>
		You can speed up the processing of your application by submitting digital images of documents
		that prove your eligibility for services.
	</p>
	<p>Don't worry if you don't have all or any of the documents, you can still register.</p>

	<p>
		Click the button next to each requirement to see if you have a document that satisfies the
		eligibility.
	</p>
	<p>
		When you're done, click the <span class="text-primary-500 font-semibold"
			>Submit Registration</span
		> button at the bottom of this page.
	</p>
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
				<button class="btn variant-filled-secondary" on:click={() => setDoc(id, eligibility)}
					>Update...</button
				>
			{:else}
				<button class="btn variant-filled-primary" on:click={() => setDoc(id, eligibility)}
					>Upload...</button
				>
			{/if}
		</div>
	</div>
{/each}

<button type="button" class="btn variant-filled-primary w-full mt-2" on:click={submitRegistration}>
	Submit Registration
</button>

<style>
	p {
		margin-bottom: 12px;
	}
</style>
