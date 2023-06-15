<script>
	import { page } from '$app/stores'
</script>

<div class="esp-card-space-y text-lg">
	<h2 class="h2">ERROR</h2>

	<div>File: {$page.error.file}</div>
	<div>Function/Class: {$page.error.function}</div>
	<div>
		<h3 class="h3">Message:</h3>
	</div>
	<textarea rows="10" cols="30">{$page.error.message}</textarea>
</div>
