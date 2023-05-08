<script>
	import Quotes from '$comps/quotes/quotes.svelte';
	export let data;
</script>

<Quotes quote={data.quote} />

<div class="esp-card">
	<h2>Home</h2>

	<ul>
		<li>
			<a href="/home/cm/temp/profile">Profile</a>
		</li>
		<li>
			<a href="/home/cm/temp/docs">Docs</a>
		</li>
		<li>
			<a href="/home/cm/temp/message">Message Us</a>
		</li>
	</ul>
</div>
