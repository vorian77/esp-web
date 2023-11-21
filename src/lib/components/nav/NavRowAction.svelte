<script lang="ts">
	import type { DataObjRowChange, NavTreeNode } from '$comps/types'
	import Icon from '$comps/Icon.svelte'

	const NAV_COLOR = '#3b79e1'

	export let node: NavTreeNode
	export let action: DataObjRowChange
	export let icon: string
	export let onProcessRow = async (node: NavTreeNode, action: DataObjRowChange) => {}

	async function onClick() {
		await onProcessRow(node, action)
	}
</script>

<div role="button" tabindex="0" on:click={onClick} on:keyup={onClick}>
	<Icon class="mt-0.5" name={icon} width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
</div>
