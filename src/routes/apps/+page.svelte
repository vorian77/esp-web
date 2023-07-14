<script lang="ts">
	import Navigation from '$comps/Navigation.svelte'
	import User from '$routes/apps/User.svelte'
	export let data
</script>

<User user={data.user} />

<Navigation user={data.user} mode="page" />
