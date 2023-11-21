<script lang="ts">
	/* <temp> 231026 - independent tree items because setting "ml-x" on in the parent 
    didn't work past about the 4th or so level
  */
	import type { NavTreeNode } from '$comps/types'

	export let node: NavTreeNode
	export let onProcessNode = async (node: NavTreeNode) => {}

	function getIndent(indent: number) {
		const INDENTS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24]
		if (indent <= INDENTS.length) {
			return INDENTS[indent]
		} else {
			return INDENTS[INDENTS.length - 1]
		}
	}
</script>

<div
	class="ml-{getIndent(node.indent)} p-1 mb-1 hover:bg-blue-400 rounded-lg
				{node.isSelected ? 'bg-blue-300 text-white' : ''}"
	role="button"
	tabindex="0"
	on:click={() => onProcessNode(node)}
	on:keyup={() => onProcessNode(node)}
>
	{node.nodeObj.header}
</div>
