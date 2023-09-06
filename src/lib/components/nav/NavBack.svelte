<script lang="ts">
	import { navNodesCrumbs, processNodeCrumb } from '$comps/nav/navStore'
	import Icon from '$comps/Icon.svelte'
	const NAV_COLOR = '#3b79e1'
	function goBack() {
		processNodeCrumb($navNodesCrumbs.length - 2)
	}
</script>

<div
	role="button"
	tabindex="0"
	class:hidden={$navNodesCrumbs.length < 2}
	class="flex mr-2"
	on:click={goBack}
	on:keyup={goBack}
>
	<span style:cursor="pointer">
		<Icon class="mt-1" name="arrow-left" width="1rem" height="1rem" fill={NAV_COLOR} />
	</span>
</div>
