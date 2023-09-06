<script lang="ts">
	import { navNodeCurrent } from '$comps/nav/navStore'
	import NavBack from '$comps/nav/NavBack.svelte'
</script>

<h1>Form</h1>
SelectedNode:
<pre>{JSON.stringify($navNodeCurrent, null, 2)}</pre>
