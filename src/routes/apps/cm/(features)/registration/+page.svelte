<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton'

	function onCompleteHandler(e: Event): void {
		console.log('event:completed')
	}

	function onStepHandler(e: { step: number; state: { current: number; total: number } }): void {
		console.log('event:step', e)
	}
</script>

<h1 class="h1">Youth Opportunity Program Registration</h1>
<p class="p mb-10">This wizard walks you though submitting an application to MOED YO-Baltimore.</p>

<Stepper on:complete={onCompleteHandler} on:step={onStepHandler}>
	<Step>
		<svelte:fragment slot="header">About Me</svelte:fragment>
		Step 1
	</Step>
	<Step>
		<svelte:fragment slot="header">My Contact Info</svelte:fragment>
		Step 2
	</Step>
	<Step>
		<svelte:fragment slot="header">My Office Preference</svelte:fragment>
		Step 3
	</Step>
	<Step>
		<svelte:fragment slot="header">My Eligibility Documents</svelte:fragment>
		Step 4
	</Step>
</Stepper>
