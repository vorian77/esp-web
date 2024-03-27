import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjFieldItems } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreDataObjFieldItem() {
	sectionHeader('DataObjFieldItem')
	await addDataObjFieldItems({
		exprSelect: `SELECT app_cm::CmCohortAttd {data := .id, display := std::to_str(<cal::local_date>.date)} 
		FILTER (.cohort = (SELECT app_cm::CmCsfCohort FILTER .id = <uuid,tree,CmCsfCohort.id>).cohort
			AND .id NOT IN (SELECT app_cm::CmCsfCohortAttd FILTER .csfCohort.id = <uuid,tree,CmCsfCohort.id>).cohortAttd.id)
			OR .id IN <uuidList,parms,fieldValueCurrent> 
		ORDER BY .display`,
		name: 'il_cm_cohort_attd_cohort',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: `SELECT app_cm::CmCsfCohort {data := .id, display := .csf.client.person.fullName} 
		FILTER (.cohort IN (SELECT app_cm::CmCohort FILTER .id = <uuid,tree,CmCohort.id>) 
			AND .csf NOT IN (SELECT app_cm::CmCsfCohortAttd FILTER .cohortAttd.id = <uuid,tree,CmCohortAttd.id>).csfCohort.csf)
			OR .id IN <uuidList,parms,fieldValueCurrent> 
		ORDER BY .csf.client.person.lastName THEN .csf.client.person.firstName`,
		name: 'il_cm_cohort_attd_student',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: `SELECT app_cm::CmEmployer {data := .id, display := .name} FILTER .owner IN (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY .name`,
		name: 'il_cm_employer_by_userName',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: 'SELECT app_cm::CmServiceFlow {data := .id, display := .header} ORDER BY .header',
		name: 'il_cm_service_flow',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: `SELECT app_cm::CmCohort {data := .id, display := .course.name ++ ' (' ++ .name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.dateStart) ++ ')'} FILTER .owner IN (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY .course.name`,
		name: 'il_cm_cohort_by_userName',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect: `SELECT (
      SELECT app_cm::CmCsfCohort {data := .id, display := .name} 
			FILTER 
        (.csf.id IN <uuidList,tree,CmClientServiceFlow.id> AND 
        .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', <str,parms,status>))
      ).cohort.course) OR .id IN <uuidList,parms,fieldValueCurrent> 
			ORDER BY .name`,
		name: 'il_cm_course_by_csfId_status',
		owner: 'app_cm'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.id IN <uuidList,tree,SysCodeType.id> OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY .name',
		name: 'il_sys_code_order_name_by_codeType_id',
		owner: 'app_sys_admin'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY .order',
		name: 'il_sys_code_order_index_by_codeType_name',
		owner: 'app_sys'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY .name',
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
			'SELECT sys_core::SysCodeType {data := .id, display := .header} FILTER .parent.name = <str,parms,codeTypeParentName> OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY .name',
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
			'SELECT sys_core::SysOrg { data := .id, display := .name } FILTER .roles.name = <str,parms,codeName> OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY .name',
		name: 'il_sys_role_org_by_codeName',
		owner: 'app_sys'
	})
	await addDataObjFieldItems({
		exprSelect:
			'SELECT sys_user::SysStaff { data := .id, display := .person.fullName } FILTER .roles.name = <str,parms,codeName> OR .id IN <uuidList,parms,fieldValueCurrent> ORDER BY str_lower(.person.lastName) then str_lower(.person.firstName)',
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
