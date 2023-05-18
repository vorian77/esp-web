<script>
	import { page } from '$app/stores'
</script>

<h1>ERROR</h1>
<pre>{JSON.stringify($page.error, null, 2)}</pre>
