<script lang="ts">
	import { getUser } from '$comps/nav/navStore'
	import type { User } from '$comps/types'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'

	const FILENAME = 'routes/legalDisclosure'

	const user: User = getUser()
	const legalDisclosure = user.cm_ssr_disclosure

	async function accept() {
		const responsePromise: Response = await fetch('/api/legalDisclosure', {
			method: 'POST',
			body: JSON.stringify({
				applicantId: user.user_id
			})
		})
		const response = await responsePromise.json()
		if (response.success && response.data.disclosure == 1) {
			goto('/home')
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'accept',
				message: `Unable to update disclosure for user id: ${user.user_id}`
			})
		}
	}

	function decline() {
		goto('/logout')
	}

	function goBack() {
		history.back()
	}
</script>

<div class="esp-card-space-y">
	<h1 class="h1">Individual's Consent To Disclose Personal Information</h1>

	<p class="text-lg">
		By registering with this application you agree that the Career Partners can see and use the
		information contained within your application in order to better provide assistance to you in
		determining eligibility for assistance in obtaining employment, training for employment,
		education, or other services. Personal information such as social security number, race,
		ethnicity, sex and disability status is being requested for federal record keeping and reporting
		requirements only and is kept confidential.
	</p>

	{#if !legalDisclosure}
		<div class="flex gap-3">
			<button class="btn variant-filled-primary w-1/2" on:click={accept}>Accept</button>
			<button class="btn variant-filled-error w-1/2" on:click={decline}>Decline</button>
		</div>
	{:else}
		<div class="flex gap-3">
			<button class="btn variant-filled-primary w-full" on:click={goBack}>Ok</button>
		</div>
	{/if}
</div>
