<script lang="ts">
	export let user

	const name = user.per_name_full
	const site = user.site
</script>

<div class="rounded-lg p-3 mb-3 bg-neutral-100">
	<div class="flex flex-col items-center">
		<div class="text-lg font-semibold">
			Welcome, {name}
		</div>
		<div class="text-sm">
			{site}
		</div>
	</div>
</div>
