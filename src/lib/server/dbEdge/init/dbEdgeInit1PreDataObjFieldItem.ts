import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjFieldItems } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreDataObjFieldItem() {
	sectionHeader('DataObjFieldItem')

	await addDataObjFieldItems({
		exprSelect: `SELECT app_cm::CmEmployer {data := .id, display := .name} FILTER .owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs ORDER BY .name`,
		name: 'il_cm_employer_by_userName',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT app_cm::CmServiceFlow {data := .id, display := .header} ORDER BY .header',
		name: 'il_cm_service_flow',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: `SELECT app_cm::CmCohort {data := .id, display := .course.name ++ ' (' ++ .name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.dateStart) ++ ')'} FILTER .owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs ORDER BY .course.name`,
		name: 'il_cm_cohort_by_userName',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: `SELECT (
      SELECT app_cm::CmCsfCohort 
      FILTER 
        .csf.id = <uuid,tree,CmClientServiceFlow.id> AND 
        .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', <str,parms,status>))
      ).cohort.course {data := .id, display := .name} ORDER BY .name`,
		name: 'il_cm_course_by_csfId_status',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.id = <uuid,tree,SysCodeType.id> ORDER BY .name',
		name: 'il_sys_code_order_name_by_codeType_id',
		owner: 'app_sys_admin'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .order',
		name: 'il_sys_code_order_index_by_codeType_name',
		owner: 'app_sys'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .name',
		name: 'il_sys_code_order_name_by_codeType_name',
		owner: 'app_sys'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT sys_core::SysCodeType {data := .id, display := .name} ORDER BY .name',
		name: 'il_sys_codeType_order_name',
		owner: 'app_sys_admin'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysCodeType {data := .id, display := .header} FILTER .parent.name = <str,parms,codeTypeParentName> ORDER BY .name',
		name: 'il_sys_codeType_order_name_by_codeTypeParent_name',
		owner: 'app_sys'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT sys_db::SysColumn {data := .id, display := .name} ORDER BY .name',
		name: 'il_sys_column_order_name',
		owner: 'app_sys_admin'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT sys_core::SysDataObj {data := .id, display := .name} ORDER BY .name',
		name: 'il_sys_data_obj_order_name',
		owner: 'app_sys_admin'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT sys_core::SysNodeObj {data := .id, display := .name} ORDER BY .name',
		name: 'il_sys_node_obj_order_name',
		owner: 'app_sys_admin'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysOrg { data := .id, display := .name } FILTER .roles.name = <str,parms,codeName> ORDER BY .name',
		name: 'il_sys_role_org_by_codeName',
		owner: 'app_sys'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_user::SysStaff { data := .id, display := .person.fullName } FILTER .roles.name = <str,parms,codeName> ORDER BY str_lower(.person.lastName) then str_lower(.person.firstName)',
		name: 'il_sys_role_staff_by_codeName',
		owner: 'app_sys'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT sys_db::SysColumn {data := .id, display := .name} ORDER BY .name',
		name: 'il_sys_table_column_order_name',
		owner: 'app_sys_admin'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT sys_db::SysTable {data := .id, display := .name} ORDER BY .name',
		name: 'il_sys_table_order_name',
		owner: 'app_sys_admin'
	})
}
