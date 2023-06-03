<script>
	import Quotes from '$comps/Quotes.svelte'
	export let data
</script>

{#if data?.quote}
	<Quotes quote={data.quote} />
{/if}

<div class="esp-card-space-y">
	<h1 class="h1">CaseManager Home</h1>

	<ul>
		<li>
			<a class="anchor" href="/apps/cm/profile">Profile</a>
		</li>
		<li>
			<a class="anchor" href="/apps/cm/docs">Docs</a>
		</li>
		<li>
			<a class="anchor" href="/apps/cm/message">Listbox/Message Us</a>
		</li>
		<li>
			<a class="anchor" href="/apps/cm/apiTest">ESP API Test</a>
		</li>
		<li>
			<a class="anchor" href="/apps/cm/example">Example Form</a>
		</li>
		<li>
			<a class="anchor" href="/logout">Log out</a>
		</li>
	</ul>
</div>
