import { addDataObj, addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import { execute } from '$routes/api/dbEdge/types.dbEdge'

const FILENAME = 'initSysAdminReports'

export default async function init() {
	console.log()
	console.log(`${FILENAME}.start...`)
	await resetDB()
	await initReportCourseSummary()
	console.log(`${FILENAME}.end`)
}

async function initReportCourseSummary() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs',
		header: 'Courses (Summary)',
		name: 'data_obj_cm_ai_report_course_summary',
		owner: 'app_cm',
		tables: [{ index: '0', table: 'CmCourse' }],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				headerAlt: 'Course',
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'number',
				columnName: 'custom_select_int',
				dbOrderSelect: 40,
				exprCustom: `(SELECT count((SELECT app_cm::CmCohort FILTER .course.id = app_cm::CmCourse.id)))`,
				headerAlt: 'Cohorts (Count)',
				indexTable: '0',
				nameCustom: 'customCohortsCount',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 50,
				exprCustom: `(SELECT app_cm::CmCohort FILTER .course.id = app_cm::CmCourse.id).name`,
				headerAlt: 'Cohorts',
				indexTable: '0',
				nameCustom: 'customCohorts'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				dbOrderSelect: 60,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id)))`,
				headerAlt: 'Students - Total',
				indexTable: '0',
				nameCustom: 'customStudentsTotal'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				dbOrderSelect: 70,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND NOT EXISTS .dateStart)))`,
				headerAlt: 'Students - Pending Enrollment',
				indexTable: '0',
				nameCustom: 'customStudentsEnrollPending'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				dbOrderSelect: 80,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort {*} FILTER
          .cohort.course.id = app_cm::CmCourse.id AND
          .dateStartEst < cal::to_local_date(datetime_current(), 'US/Eastern') )))`,
				headerAlt: 'Students - Missed Est. Enrollment',
				indexTable: '0',
				nameCustom: 'customStudentsEnrollMissed'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				dbOrderSelect: 90,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND EXISTS .dateStart AND NOT EXISTS .dateEnd AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Enrolled')) )))`,
				headerAlt: 'Students - Enrolled',
				indexTable: '0',
				nameCustom: 'customStudentsEnrolled'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				dbOrderSelect: 90,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND EXISTS .dateStart AND EXISTS .dateEnd AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Completed')) )))`,
				headerAlt: 'Students - Completed',
				indexTable: '0',
				nameCustom: 'customStudentsCompleted'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				dbOrderSelect: 90,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id AND EXISTS .dateStart AND EXISTS .dateEnd AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Dropped Out')) )))`,
				headerAlt: 'Students - Dropped Out',
				indexTable: '0',
				nameCustom: 'customStudentsDroppedOut'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_int',
				dbOrderSelect: 200,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCertification FILTER .course.id = app_cm::CmCourse.id )))`,
				headerAlt: 'Certifications Earned',
				indexTable: '0',
				nameCustom: 'customCertificationsEarned'
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_ai_report_course_summary',
		header: 'Courses (Summary)',
		name: 'node_obj_cm_ai_report_course_summary',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}

export async function resetDB() {
	let query = ''

	addNode('node_obj_cm_ai_report_course_summary')

	addReport('data_obj_cm_ai_report_course_summary')

	await execute(query)
	function addNode(name: string) {
		addStatement(`DELETE sys_core::SysNodeObj FILTER .name = '${name}'`)
	}
	function addReport(name: string) {
		addStatement(`DELETE sys_core::SysDataObj FILTER .name = '${name}'`)
	}
	function addStatement(statement: string) {
		if (query) query += ' '
		query += statement + ';'
	}
}
