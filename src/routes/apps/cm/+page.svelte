<script lang="ts">
	import User from '$routes/apps/cm/UserCM.svelte'
	import Quotes from '$comps/Quotes.svelte'
	import Navigation from '$comps/Navigation.svelte'

	export let data
</script>

<User user={data.user} />
<Quotes quote={data.quote} />
<Navigation user={data.user} mode="page" />
