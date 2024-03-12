<script>
	import { page } from '$app/stores'
</script>

<div class="esp-card-space-y p-4 text-lg">
	<h2 class="h2">ERROR</h2>

	<div>File: {$page.error.file}</div>
	<div>Function/Class: {$page.error.function}</div>
	<div>
		<h3 class="h3">Message:</h3>
	</div>
	<textarea class="w-full" rows="5">{$page.error.message}</textarea>
</div>
