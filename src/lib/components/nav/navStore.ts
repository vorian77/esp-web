import { writable } from 'svelte/store'
import { NavNode } from '$comps/types'
import { getArray } from '$utils/utils'
import type { FormSourceResponseType } from '$comps/types'

export let navNodesBranch = writable([NavNode])
export let navNodesTraversal = writable([NavNode])

export function setBranchByDBNodes(dbNodes: any) {
	dbNodes = getArray(dbNodes)
	let navNodes: Array<NavNode> = []
	dbNodes.forEach((n: any) => {
		navNodes.push(new NavNode(n.type, n.id, n.name, n.label, n.icon, n.obj_id, n.obj_link))
		navNodesBranch.set(navNodes)
	})
}

export async function setBranchChildren(parentId: string) {
	const responsePromise = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ action: 'getNodesOfProgram', programId: parentId })
	})
	const response: FormSourceResponseType = await responsePromise.json()
	const newNodes = response.data
	setBranchByDBNodes(newNodes)
}

export function addNode(bookName: string, author: string) {
	// navNodesBranch.update((nodes) => [{ name: bookName, author: author }, ...nodes])
}
