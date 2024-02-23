import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initReset() {
	sectionHeader('Reset')
	const reset = new ResetDb()

	reset.addStatement(
		`UPDATE sys_user::SysUserType FILTER .name = 'ut_sys_amin' SET { resources -= (SELECT sys_core::getNodeObjByName('node_obj_sys_admin_app_list')) }`
	)

	reset.addStatement(`DELETE sys_core::SysNodeObj FILTER .codeType.name != 'program'`)
	reset.addTable('sys_core::SysNodeObjFooter')

	reset.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldChips := {} }`)
	reset.addTable('sys_core::SysDataObj')
	reset.addTable('sys_core::SysDataObjTable')

	reset.addTable('sys_core::SysDataObjAction')
	reset.addTable('sys_core::SysDataObjFieldChips')
	reset.addTable('sys_core::SysDataObjFieldItems')

	reset.addTable('sys_core::SysObjConfig')

	reset.addStatement(`UPDATE sys_db::SysTable SET { columns := {} }`)
	reset.addTable('sys_db::SysTable')
	reset.addTable('sys_db::SysColumn')

	await reset.execute()
}
