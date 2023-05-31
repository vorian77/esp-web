<script>
	import Quotes from '$comps/quotes/quotes.svelte'
	export let data
</script>

{#if data?.quote}
	<Quotes quote={data.quote} />
{/if}

<div class="esp-card">
	<h1>CaseManager Home</h1>

	<ul>
		<li>
			<a class="anchor" href="/home/cm/profile">Profile</a>
		</li>
		<li>
			<a class="anchor" href="/home/cm/docs">Docs</a>
		</li>
		<li>
			<a class="anchor" href="/home/cm/message">Message Us</a>
		</li>
		<li>
			<a class="anchor" href="/home/cm/temp/example">Example Form</a>
		</li>
		<li>
			<a class="anchor" href="/logout">Log out</a>
		</li>
	</ul>
</div>
