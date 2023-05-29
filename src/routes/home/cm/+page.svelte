<script>
	import Quotes from '$comps/quotes/quotes.svelte'
	export let data
</script>

{#if data?.quote}
	<Quotes quote={data.quote} />
{/if}

<div class="esp-card">
	<h2>CaseManager Home</h2>

	<ul>
		<li>
			<a href="/home/cm/profile">Profile</a>
		</li>
		<li>
			<a href="/home/cm/docs">Docs</a>
		</li>
		<li>
			<a href="/home/cm/message">Message Us</a>
		</li>
		<li>
			<a href="/home/cm/temp/example">Example Form</a>
		</li>
		<li>
			<a href="/logout">Log out</a>
		</li>
	</ul>
</div>
