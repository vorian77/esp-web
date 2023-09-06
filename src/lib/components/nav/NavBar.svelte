<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton'
	import NavBack from '$comps/nav/NavBack.svelte'
	import NavCrumb from '$comps/nav/NavCrumb.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
</script>

<AppBar background="bg-neutral-100" class="mt-2 mb-1">
	<svelte:fragment slot="lead">
		<div>
			<NavBack />
		</div>
		<div>
			<NavCrumb />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail"><NavRow /></svelte:fragment>
</AppBar>
