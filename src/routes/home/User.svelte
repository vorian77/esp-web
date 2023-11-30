<script lang="ts">
	import type { User } from '$comps/types'
	export let user: User | undefined
</script>

<div class="rounded-lg p-3 mb-3 bg-neutral-100">
	<div class="flex flex-col items-center">
		<div class="text-lg font-semibold">
			Welcome, {user ? user.per_name_full : ''}
		</div>
	</div>
</div>
