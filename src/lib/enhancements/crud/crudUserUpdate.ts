import { TokenApiQueryDataTree, TokenApiQueryType } from '$comps/types.token'
import { type ActionQueryParms, ActionQueryTriggerTiming } from '$comps/nav/types.appQuery'
import { State } from '$comps/nav/types.appState'
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
	if (queryType === TokenApiQueryType.saveUpdate && queryTiming === ActionQueryTriggerTiming.post) {
		state.resetUser(false)
	}
	return data
}
