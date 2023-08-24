<script lang="ts">
	export let user
</script>

<div class="rounded-lg p-3 mb-3 bg-neutral-100">
	<div class="flex flex-col items-center">
		<div class="text-lg font-semibold">
			Welcome, {user.per_name_full}
		</div>
		<div class="text-sm text-center">
			<div>
				{#if user.site}
					{user.site}
				{/if}
			</div>
			<div>
				{#if user.status}
					Application Status: {user.status}
				{/if}
			</div>
		</div>
	</div>
</div>
