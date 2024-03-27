import { qaExecuteFileStorage } from '$enhance/crud/crudFileStorage'
import { qaExecuteUserUpdate } from '$enhance/crud/crudUserUpdate'

import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/_crud.ts'

export async function getEnhancement(queryActionFunction: string): Promise<Function> {
	switch (queryActionFunction) {
		// case 'qa_data_obj_config':
		// 	// return (await import('$enhance/crud/crudDataObjConfig')).default
		// 	break

		case 'qa_file_storage':
			return qaExecuteFileStorage
			break

		case 'qa_user_update':
			return qaExecuteUserUpdate
			break

		// case 'qa_my_account':
		// 	// return (await import('$enhance/crud/crudMyAccount')).default
		// 	break

		default:
			error(500, {
				file: FILENAME,
				function: 'getEnhancement',
				message: `No case defined for query action: ${queryActionFunction}`
			})
	}
}
