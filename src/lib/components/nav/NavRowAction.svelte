<script lang="ts">
	import type { AppRowActionType } from '$comps/nav/types.app'
	import Icon from '$comps/Icon.svelte'

	const NAV_COLOR = '#3b79e1'

	export let action: AppRowActionType
	export let icon: string
	export let onChange = async (action: AppRowActionType) => {}
</script>

<div
	role="button"
	tabindex="0"
	on:click={async () => await onChange(action)}
	on:keyup={async () => await onChange(action)}
>
	<Icon class="mt-0.5" name={icon} width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
</div>
