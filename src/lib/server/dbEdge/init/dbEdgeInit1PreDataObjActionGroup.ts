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
			'noa_detail_delete'
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
		actions: ['noa_common_refresh'],
		name: 'doag_base_refresh',
		owner: 'app_sys'
	})
	addDataObjActionGroup({
		actions: ['noa_detail_delete'],
		name: 'doag_modal_detail',
		owner: 'app_sys'
	})
	addDataObjActionGroup({
		actions: ['noa_detail_cancel', 'noa_detail_save_insert', 'noa_detail_save_update'],
		name: 'doag_modal_footer_detail',
		owner: 'app_sys'
	})
	addDataObjActionGroup({
		actions: ['noa_detail_cancel'],
		name: 'doag_modal_footer_select',
		owner: 'app_sys'
	})
}
