<script lang="ts">
	import type { NavRowActionType } from '$comps/types'
	import Icon from '$comps/Icon.svelte'

	const NAV_COLOR = '#3b79e1'

	export let action: NavRowActionType
	export let icon: string
	export let onChange = async (action: NavRowActionType) => {}
</script>

<div
	role="button"
	tabindex="0"
	on:click={async () => await onChange(action)}
	on:keyup={async () => await onChange(action)}
>
	<Icon class="mt-0.5" name={icon} width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
</div>
