<script lang="ts">
	import NavBack from '$comps/nav/NavBack.svelte'
	import NavCrumb from '$comps/nav/NavCrumb.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
</script>

<div class="bg-blue-50 mt-2 mb-1 p-4 flex justify-between">
	<div class="flex">
		<div>
			<NavBack />
		</div>
		<div>
			<NavCrumb />
		</div>
	</div>
	<div>
		<NavRow />
	</div>
</div>
