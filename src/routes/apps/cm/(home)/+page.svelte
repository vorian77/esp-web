<script>
	import Quotes from '$comps/Quotes.svelte'
	export let data
</script>

{#if data?.quote}
	<Quotes quote={data.quote} />
{/if}

<div class="esp-card-space-y text-lg">
	<h1 class="h1">CaseManager Mobile</h1>

	<ul>
		<li>
			<a class="anchor" href="/apps/cm/registration">Registration</a>
		</li>
		<li>
			<a class="anchor" href="/apps/cm/docs">Eligibility Documents</a>
		</li>

		<li>
			<button class="anchor" on:click={() => alert('My Profile page comming soon!')}
				>My Profile</button
			>
		</li>

		<li>
			<button class="anchor" on:click={() => alert('Contact Us page comming soon!')}
				>Contact Us</button
			>
		</li>

		<li>
			<button class="anchor" on:click={() => alert('Legal Disclosure page comming soon!')}
				>Legal Disclosure</button
			>
		</li>

		<li>
			<button class="anchor" on:click={() => alert('My Goals feature comming soon!')}
				>My Goals</button
			>
		</li>

		<li>
			<button class="anchor" on:click={() => alert('My Messages feature comming soon!')}
				>My Messages</button
			>
		</li>

		<!-- <li>
			<a class="anchor" href="/apps/cm/profile">My Profile</a>
		</li> -->

		<!-- <li>
			<button class="anchor" href="/apps/cm/message">Listbox/Message Us</button>
		</li> -->
		<!-- <li>
			<a class="anchor" href="/apps/cm/apiTest">ESP API Test</a>
		</li>
		<li>
			<a class="anchor" href="/apps/cm/example">Example Form</a>
		</li> -->
		<li>
			<a class="anchor" href="/logout">Log out</a>
		</li>
	</ul>
</div>

<style>
	li {
		margin-bottom: 10px;
	}
</style>
