import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initReset() {
	sectionHeader('Reset')
	const reset = new ResetDb()

	reset.addStatement(
		`UPDATE sys_user::SysUserType FILTER .name = 'ut_sys_amin' SET { resources -= (SELECT sys_core::getNodeObjByName('node_obj_sys_admin_app_list')) }`
	)

	reset.delTableRecords(`sys_core::SysNodeObj`)
	reset.delTableRecords('sys_core::SysNodeObjFooter')

	// data object
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldListConfig := {} }`)
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldListItems := {} }`)
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldListSelect := {} }`)

	reset.delTableRecords('sys_core::SysDataObjFieldListConfig')
	reset.delTableRecords('sys_core::SysDataObjFieldListItems')
	reset.delTableRecords('sys_core::SysDataObjFieldListSelect')

	reset.addStatement(`UPDATE sys_core::SysDataObj SET { parentColumn := {} }`)
	reset.addStatement(`UPDATE sys_core::SysDataObj SET { parentTable := {} }`)
	reset.addStatement(`UPDATE sys_core::SysDataObj SET { tables := {} }`)

	reset.delTableRecords('sys_core::SysDataObjTable')

	reset.delTableRecords('sys_core::SysDataObj')

	// other
	reset.delTableRecords('sys_core::SysDataObjActionGroup')
	reset.delTableRecords('sys_core::SysDataObjAction')
	reset.delTableRecords('sys_core::SysObjConfig')

	// db
	reset.addStatement(`UPDATE sys_db::SysTable SET { columns := {} }`)
	reset.delTableRecords('sys_db::SysTable')
	reset.delTableRecords('sys_db::SysColumn')

	await reset.execute()
}
