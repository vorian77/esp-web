<script lang="ts">
	export let data
	const docsStatus = data.docsStatus
</script>

<h1 class="h1 mb-5">Proofs of Eligibility</h1>
<p>
	You can speed up the processing of your application by submitting digital images of documents that
	prove your eligibility for services.
</p>
<p>Don't worry if you don't have all or any of the documents, you can still register.</p>

<p>
	Click the button next to each requirement to see if you have a document that satisfies the
	eligibility.
</p>
<p>When you're done, click the Submit Registration button at the bottom of this page.</p>

<div>
	<h2 class="h2">Requirement</h2>
</div>

{#if { docsStatus }}
	<pre>{JSON.stringify(docsStatus, null, 2)}</pre>
{/if}

<style>
	p {
		margin-bottom: 12px;
	}
</style>
