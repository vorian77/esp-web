import { sectionHeader, tables } from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initPreTable() {
	sectionHeader('Table')

	await tables([
		['app_sys_admin', 'default', 'SysPerson', false],

		['app_sys_admin', 'sys_db', 'SysColumn', true],
		['app_sys_admin', 'sys_db', 'SysTable', true],

		['app_sys_admin', 'sys_core', 'SysApp', false],
		['app_sys_admin', 'sys_core', 'SysCode', true],
		['app_sys_admin', 'sys_core', 'SysCodeType', true],
		['app_sys_admin', 'sys_core', 'SysDataObj', true],
		['app_sys_admin', 'sys_core', 'SysDataObjAction', true],
		['app_sys_admin', 'sys_core', 'SysDataObjColumn', true],
		['app_sys_admin', 'sys_core', 'SysDataObjFieldListItems', true],
		['app_sys_admin', 'sys_core', 'SysDataObjFieldLink', true],
		['app_sys_admin', 'sys_core', 'SysDataObjFieldLinkJoin', true],
		['app_sys_admin', 'sys_core', 'SysDataObjTable', true],
		['app_sys_admin', 'sys_core', 'SysNodeObj', true],
		['app_sys_admin', 'sys_core', 'SysNodeObjFooter', true],
		['app_sys_admin', 'sys_core', 'SysObjConfig', true],
		['app_sys_admin', 'sys_core', 'SysOrg', true],

		['app_sys_admin', 'sys_user', 'SysStaff', true],
		['app_sys_admin', 'sys_user', 'SysUser', false]
	])

	await tables([
		['app_cm', 'app_cm', 'CmServiceFlow', true],
		['app_cm', 'app_cm', 'CmClient', true],
		['app_cm', 'app_cm', 'CmClientServiceFlow', true],
		['app_cm', 'app_cm', 'CmCourse', true],
		['app_cm', 'app_cm', 'CmCohort', true],
		['app_cm', 'app_cm', 'CmCsfCohort', true],
		['app_cm', 'app_cm', 'CmCsfCohortAttd', true],
		['app_cm', 'app_cm', 'CmCsfNote', true]
	])
}
