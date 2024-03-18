import { App, AppLevelTab } from '$comps/nav/types.app'
import { State } from '$comps/nav/types.appState'
import {
	DataObj,
	DataObjCardinality,
	DataObjData,
	memberOfEnum,
	ResponseBody,
	strRequired,
	valueOrDefault
} from '$comps/types'
import { apiDbQuery } from '$lib/api'
import { TokenApiQueryType, TokenApiQueryData, TokenApiQueryDataTree } from '$comps/types.token'
import { getEnhancement } from '$enhance/crud/_crud'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.appQuery.ts'

export async function query(
	state: State,
	tab: AppLevelTab,
	queryType: TokenApiQueryType,
	app: App | undefined = undefined
) {
	const dataRecord = { ...tab.data?.getData() }
	let { dataMeta, dataTree } = queryDataPre(queryType, app)
	console.log('types.appQuery.query.dataMeta:', dataMeta)
	const queryData = new TokenApiQueryData({ tree: dataTree, parms: dataMeta })
	let table = tab.getTable() // table will be undefined prior to retrieve

	dataTree = await queryExecuteActions(
		state,
		tab.dataObj?.actionsQuery,
		queryType,
		ActionQueryTriggerTiming.pre,
		table,
		dataTree
	)

	const result = await queryExecute(
		{ dataObjId: tab.dataObjId, dataObjRaw: tab.dataObjRaw },
		queryType,
		queryData
	)
	if (!result.success) return false

	// successful
	tab.isRetrieved = true
	tab.dataObjRaw = result.data.dataObjRaw
	const resultData = DataObjData.load(result.data.dataObjData)
	tab.dataObj = await DataObj.init(result.data.dataObjRaw, resultData)

	if (tab.dataObj) {
		if (tab.dataObj.cardinality === DataObjCardinality.list) {
			tab.data = resultData
			tab.listFilter()
			return true
		}

		table = tab.getTable()
		const queryDataRecord = resultData.getData()
		let dataAction = queryDataPost(queryType, dataRecord, queryDataRecord)
		tab.data = resultData

		dataTree.upsertData(table, dataAction)
		await queryExecuteActions(
			state,
			tab.dataObj?.actionsQuery,
			queryType,
			ActionQueryTriggerTiming.post,
			table,
			dataTree
		)

		return true
	}
	return false
}

function queryDataPre(queryType: TokenApiQueryType, app: App | undefined = undefined) {
	let dataTree = new TokenApiQueryDataTree()
	let dataMeta = {}
	if (app) {
		let offset = 0
		switch (queryType) {
			case TokenApiQueryType.delete:
			case TokenApiQueryType.saveInsert:
			case TokenApiQueryType.saveUpdate:
				offset = 0
				break
			case TokenApiQueryType.new:
				offset = 2
				break
			case TokenApiQueryType.retrieve:
				offset = 1
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'queryDataPre',
					message: `No case defined for queryType: ${queryType}`
				})
		}

		for (let i = 0; i < app.levels.length - offset; i++) {
			const level = app.levels[i]
			const currTab = level.getCurrTab()
			const dataObj = currTab.dataObj
			if (dataObj) {
				if (dataObj.cardinality === DataObjCardinality.list) {
					const { listRecordIdCurrent } = currTab.listData()
					if (listRecordIdCurrent) {
						dataTree.upsertData(dataObj.table?.name, currTab.listGetData())
					}
				} else {
					if (currTab.data) dataTree.upsertData(dataObj.table?.name, currTab.detailGetData())
				}
				if (level.programId) currTab.dataMeta.setValue('programId', level.programId, true)
				currTab.dataMeta.setParms(dataMeta)
			}
		}
	}
	return { dataTree, dataMeta }
}

function queryDataPost(queryType: TokenApiQueryType, dataRecord: any, queryDataQuery: any) {
	switch (queryType) {
		case TokenApiQueryType.delete:
			return dataRecord

		case TokenApiQueryType.saveInsert:
		case TokenApiQueryType.saveUpdate:
			for (const [key, value] of Object.entries(queryDataQuery)) {
				dataRecord[key] = value
			}
			return dataRecord

		case TokenApiQueryType.new:
		case TokenApiQueryType.retrieve:
			return queryDataQuery

		default:
			error(500, {
				file: FILENAME,
				function: 'queryDataPre',
				message: `No case defined for queryType: ${queryType}`
			})
	}
}

export async function queryExecute(
	dataObjSource: Record<string, any>,
	queryType: TokenApiQueryType,
	queryData: TokenApiQueryData
) {
	const result: ResponseBody = await apiDbQuery(queryType, dataObjSource, queryData)

	if (!result.success) {
		let errMsg = result.message
		if (result.message.toLowerCase().includes('invalid query')) {
			if (queryType === TokenApiQueryType.delete) {
				errMsg = 'Unable to delete this record.'
				if (result.message.toLowerCase().includes('still referenced in link')) {
					let parts = result.message.split('::')
					let table = parts[parts.length - 1]
					table = table.split(' ')[0]
					errMsg += ` It is referenced in record(s) of child table: ${table}.\n\nThe child table record(s) must be deleted before the parent table record can be deleted.`
				}
			}
			alert(errMsg)
		}
	}
	return result
}

async function queryExecuteActions(
	state: State,
	actionsQuery: ActionsQuery | undefined,
	queryType: TokenApiQueryType,
	queryTiming: ActionQueryTriggerTiming,
	table: string | undefined,
	data: TokenApiQueryDataTree
) {
	if (!actionsQuery) return data
	actionsQuery.actions.forEach(async (action) => {
		data = await action.execute(
			action.name,
			state,
			queryType,
			queryTiming,
			table,
			data,
			action.parms
		)
	})
	return data
}

export class ActionsQuery {
	actions: Array<ActionQueryFunction> = []
	private constructor(actions: Array<ActionQueryFunction>) {
		this.actions = actions
	}
	static async initEnhancement(actions: Array<ActionQuery> | null | undefined) {
		let actionsFunction: Array<ActionQueryFunction> = []
		if (actions) {
			for (let i = 0; i < actions.length; i++) {
				// getEnhancement() does not work properly with "forEach" loop
				actionsFunction.push(
					new ActionQueryFunction(actions[i], await getEnhancement(actions[i].name))
				)
			}
		}
		return new ActionsQuery(actionsFunction)
	}
}

export type ActionQueryParms = Record<string, any>

export class ActionQuery {
	name: string
	parms: ActionQueryParms
	triggers: Array<{ type: string; timing: string }>
	constructor(rawAction: ActionQuery) {
		const clazz = 'ActionQueryRaw'
		this.name = strRequired(rawAction.name, clazz, 'name')
		this.parms = valueOrDefault(rawAction.parms, {})
		this.triggers = valueOrDefault(rawAction.triggers, [])
	}
}

export class ActionQueryFunction extends ActionQuery {
	funct: Function
	constructor(actionQuery: ActionQuery, qaFunction: Function) {
		super(actionQuery)
		const clazz = 'ActionQueryFunction'
		this.funct = qaFunction
	}
	activate(timing: ActionQueryTriggerTiming, type: TokenApiQueryType) {
		return (
			this.triggers.findIndex((trigger) => trigger.timing === timing && trigger.type === type) > -1
		)
	}
	async execute(
		queryActionName: string,
		state: State,
		queryType: TokenApiQueryType,
		queryTiming: ActionQueryTriggerTiming,
		table: string | undefined,
		data: TokenApiQueryDataTree,
		parms: ActionQueryParms
	): Promise<TokenApiQueryDataTree> {
		if (!this.activate(queryTiming, queryType)) return data
		return this.funct(queryActionName, state, queryType, queryTiming, table, data, parms)
	}
}

export enum ActionQueryTriggerTiming {
	post = 'post',
	pre = 'pre'
}

export class ActionQueryTrigger {
	type: TokenApiQueryType
	timing: ActionQueryTriggerTiming
	constructor(type: string, timing: string) {
		const clazz = 'ActionQueryTrigger'
		this.type = memberOfEnum(type, clazz, 'type', 'TokenApiQueryType', TokenApiQueryType)
		this.timing = memberOfEnum(
			timing,
			clazz,
			'timing',
			'ActionQueryTriggerTiming',
			ActionQueryTriggerTiming
		)
	}
}
