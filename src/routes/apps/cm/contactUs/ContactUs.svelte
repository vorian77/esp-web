<script lang="ts">
	import type { Form } from '$comps/esp/form/form'
	import { goto } from '$app/navigation'
	export let formObj: Form

	function call(phoneNbr) {
		window.location.href = 'tel:' + phoneNbr
	}
	function message(office, officeId) {
		goto(`/apps/cm/contactUs/${office}/${officeId}`)
	}
</script>

<h1 class="h1">Contact Us</h1>

<p class="mt-1 mb-5">
	For more information or to register in person, contact one of our offices directly.
</p>

{#each formObj.values as v, index (v.ent_id)}
	{@const areaCode = v.rec_contact1_ph_off.slice(0, 3)}
	{@const exchange = v.rec_contact1_ph_off.slice(3, 6)}
	{@const extension = v.rec_contact1_ph_off.slice(6, 10)}
	<div class="card bg-gray-100 rounded-lg p-4 mb-4">
		<h2 class="h2 font-semibold">{v.rec_id}</h2>
		<div>{v.rec_addr_line1}</div>
		{#if v.rec_addr_line2}
			<div>{v.rec_addr_line2}</div>
		{/if}
		<span
			>{v.rec_addr_city},
			{v.state}
			{v.rec_addr_zip}</span
		>
		<div>{v.manager}</div>
		<div>
			<a href="tel:{v.rec_contact1_ph_off}">({areaCode}) {exchange}-{extension}</a>
		</div>
		<div><a href="mailto:{v.rec_email}">{v.rec_email}</a></div>

		<div class="flex gap-3 mt-2">
			<button class="btn variant-filled-primary w-1/2" on:click={() => call(v.rec_contact1_ph_off)}
				>Call</button
			>
			<button class="btn variant-filled-primary w-1/2" on:click={() => message(v.rec_id, v.ent_id)}
				>Message</button
			>
		</div>
	</div>
{/each}

<style>
	a {
		color: navy;
	}
</style>
