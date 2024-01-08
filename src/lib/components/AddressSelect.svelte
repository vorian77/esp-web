<script lang="ts">
	// import type { DataObj } from '$comps/dataObj/dataObjOld'
	// export let formObj: DataObj
	export let currentSite = 0

	// function onSelect(ent_id) {
	// 	currentSite = ent_id
	// }
</script>

<!-- {#each formObj.values as v, index (v.ent_id)}
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

		<div class="mt-2">
			{#if v.ent_id == currentSite}
				<button class="btn variant-filled-primary w-full">Selected</button>
			{:else}
				<button class="btn variant-filled-secondary w-full" on:click={() => onSelect(v.ent_id)}
					>Select {v.rec_id}</button
				>
			{/if}
		</div>
	</div>
{/each} -->

<style>
	a {
		color: navy;
	}
</style>
