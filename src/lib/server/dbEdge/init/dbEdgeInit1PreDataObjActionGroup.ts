import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjActionGroup } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreDataObjActionGroups() {
	sectionHeader('initPreDataObjActionGroups')
	await reset()
	await initFeatures()
}

async function reset() {
	sectionHeader('Reset')
	const reset = new ResetDb()

	reset.addStatement(`UPDATE sys_core::SysDataObjActionGroup SET { actions := {}}`)
	reset.delTableRecords('sys_core::SysDataObjActionGroup')

	await reset.execute()
}

async function initFeatures() {
	addDataObjActionGroup({
		actions: [
			'noa_detail_save_insert',
			'noa_detail_save_update',
			'noa_detail_new',
			'noa_detail_delete_insert',
			'noa_detail_delete_update'
		],
		name: 'doag_base_detail',
		owner: 'app_sys'
	})
	addDataObjActionGroup({
		actions: ['noa_list_new'],
		name: 'doag_base_list',
		owner: 'app_sys'
	})

	addDataObjActionGroup({
		actions: ['noa_dialog_cancel', 'noa_dialog_complete'],
		name: 'doag_base_field_list_config_dialog',
		owner: 'app_sys'
	})

	addDataObjActionGroup({
		actions: ['noa_dialog_cancel', 'noa_dialog_complete'],
		name: 'doag_base_field_list_select',
		owner: 'app_sys'
	})

	addDataObjActionGroup({
		actions: [
			'noa_detail_save_insert',
			'noa_detail_save_update',
			'noa_detail_delete_insert',
			'noa_detail_delete_update'
		],
		name: 'doag_base_field_list_config_edit',
		owner: 'app_sys'
	})

	addDataObjActionGroup({
		actions: ['noa_list_refresh'],
		name: 'doag_base_report',
		owner: 'app_sys'
	})
}
