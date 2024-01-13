import { App, QueryActionTiming, State } from '$comps/nav/types.app'
import { apiFetch, ApiFunction, TokenApiDbTableColumns, TokenApiQueryType } from '$lib/api'
import type { DataObjRecord, ResponseBody } from '$comps/types'
import { FieldValue } from '$comps/form/field'
import { userUpdate } from '$comps/types'
import { getURLDownload, objDelete, objExists, objUpload } from '$comps/fileTransferAWS'

import { type ToastSettings } from '@skeletonlabs/skeleton'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudDataObjConfig.ts'

const columnsMgmt = ['owner', 'createdBy', 'modifiedBy', 'createdAt', 'modifiedAt']

export default async function action(
	state: State,
	data: DataObjRecord,
	queryActionTiming: QueryActionTiming,
	queryType: TokenApiQueryType
) {
	console.log('crudDataObjConfig', {
		data,
		queryActionTiming,
		queryType,
		columns: await getColumns('app_cm', 'CmCourse')
	})
	setValue(data, 'outputDetailColumns', '{key: 123}')
	return data
}

function setValue(data: DataObjRecord, fieldName: string, value: string) {
	const val = JSON.stringify(value)
	data[fieldName] = new FieldValue(val, val, [])
}

async function getColumns(tableModule: string, tableName: string) {
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetTableColumns,
		new TokenApiDbTableColumns(tableModule, tableName)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getColumns',
			message: `Error retrieving nodes for table module: ${tableModule} -  table name: ${tableName}`
		})
	}
}
