<script lang="ts">
	import src from '$assets/coming_soon.jpg'
	export let feature = ''
	export let description = ''
</script>

<h1 class="h1">{feature}</h1>

<p>
	{description}
</p>

<div class="content mt-14">
	<img class="mx-auto" {src} alt="Coming soon" />
</div>
