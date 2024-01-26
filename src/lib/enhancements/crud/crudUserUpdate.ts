import { userUpdate } from '$comps/types'
import { TokenApiQueryDataTree } from '$lib/api'
import { type ActionQueryParms, ActionQueryTriggerTiming } from '$comps/nav/types.appQuery'
import { State } from '$comps/nav/types.appState'
import { TokenApiQueryType } from '$lib/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudUserUpdate.ts'

export async function qaExecuteUserUpdate(
	queryActionName: string,
	state: State,
	queryType: TokenApiQueryType,
	queryTiming: ActionQueryTriggerTiming,
	table: string | undefined,
	data: TokenApiQueryDataTree,
	parms: ActionQueryParms
): Promise<TokenApiQueryDataTree> {
	if (queryType === TokenApiQueryType.saveUpdate && queryTiming === ActionQueryTriggerTiming.post)
		userUpdate(data.getRecord(table))
	return data
}
