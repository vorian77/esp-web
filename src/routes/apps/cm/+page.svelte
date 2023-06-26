<script lang="ts">
	import User from '$routes/apps/cm/User.svelte'
	import Quotes from '$comps/Quotes.svelte'
	export let data
</script>

<User user={data.user} />
<Quotes quote={data.quote} />

<div class="esp-card-space-y text-lg">
	<ul>
		{#if data.user.cm_ssr_status != 'Submitted'}
			<li>
				<a class="anchor" href="/apps/cm/registration">Register</a>
			</li>
			<li>
				<a class="anchor" href="/apps/cm/contactUs">Contact Us</a>
			</li>
		{:else}
			<li>
				<a class="anchor" href="/apps/cm/profile">My Profile</a>
			</li>

			<li>
				<a class="anchor" href="/apps/cm/docs">Eligibility Documents</a>
			</li>
			<li>
				<a class="anchor" href="/apps/cm/contactUs">Contact Us</a>
			</li>
			<li>
				<button class="anchor" on:click={() => alert('My Goals feature comming soon!')}
					>My Goals</button
				>
			</li>

			<li>
				<button class="anchor" on:click={() => alert('My Messages feature comming soon!')}>
					My Messages
				</button>
			</li>
		{/if}
	</ul>
</div>

<style>
	li {
		margin-bottom: 10px;
	}
</style>
