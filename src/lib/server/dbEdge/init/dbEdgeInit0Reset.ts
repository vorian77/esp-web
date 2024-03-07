import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initReset() {
	sectionHeader('Reset')
	const reset = new ResetDb()

	reset.addStatement(
		`UPDATE sys_user::SysUserType FILTER .name = 'ut_sys_amin' SET { resources -= (SELECT sys_core::getNodeObjByName('node_obj_sys_admin_app_list')) }`
	)

	// reset.addStatement(`DELETE sys_core::SysNodeObj FILTER .codeType.name != 'program'`)
	reset.addStatement(`DELETE sys_core::SysNodeObj`)
	reset.addTable('sys_core::SysNodeObjFooter')

	// data object
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldListChips := {} }`)
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldListConfig := {} }`)
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldListItems := {} }`)
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldListSelect := {} }`)

	reset.addTable('sys_core::SysDataObjFieldListChips')
	reset.addTable('sys_core::SysDataObjFieldListConfig')
	reset.addTable('sys_core::SysDataObjFieldListItems')
	reset.addTable('sys_core::SysDataObjFieldListSelect')

	reset.addTable('sys_core::SysDataObj')

	// other
	reset.addTable('sys_core::SysDataObjAction')
	reset.addTable('sys_core::SysObjConfig')

	// db
	reset.addStatement(`UPDATE sys_db::SysTable SET { columns := {} }`)
	reset.addTable('sys_db::SysTable')
	reset.addTable('sys_db::SysColumn')

	await reset.execute()
}
