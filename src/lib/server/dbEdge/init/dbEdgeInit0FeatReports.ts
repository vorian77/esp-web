import { nodeObjHeaders, ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObj, addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import init from './dbEdgeInit2DOSysAuth'

export async function initReports() {
	sectionHeader('DataObject - Reports')
	await reset()
	await initFeatures()
}

async function reset() {
	sectionHeader('Local-Reset')
	const reset = new ResetDb()

	reset.delNodeObj('node_obj_cm_ai_report_course_summary')
	reset.delNodeObj('node_obj_cm_ai_report_our_world_summary')
	reset.delNodeObj('node_obj_cm_ai_report_student_summary')
	reset.delNodeObj('node_hdr_cm_ai_reports')

	reset.delDataObj('data_obj_cm_ai_report_course_summary')
	reset.delDataObj('data_obj_cm_ai_report_our_world_summary')
	reset.delDataObj('data_obj_cm_ai_report_student_summary')

	await reset.execute()
}

async function initFeatures() {
	sectionHeader('DataObject - Reports')
	await initNodeObjHeaders()
	await initReportCourseSummary()
	await initReportOurWorldSummary()
	await initReportStudentSummary()
}

async function initNodeObjHeaders() {
	sectionHeader('NodeObjHeader - Report')
	// reports
	await nodeObjHeaders([
		['app_cm', 'node_pgm_cm_staff_provider', 'node_hdr_cm_ai_reports', 'Reports', 30, 'application']
	])
}

async function initReportCourseSummary() {
	await addDataObj({
		actionsFieldGroup: 'doag_base_refresh',
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
					NOT EXISTS .dateStart AND
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
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_ai_report_course_summary',
		header: 'Courses (Summary)',
		name: 'node_obj_cm_ai_report_course_summary',
		order: 30,
		owner: 'app_cm',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}

async function initReportOurWorldSummary() {
	await addDataObj({
		actionsFieldGroup: 'doag_base_refresh',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: `.serviceFlow.name = 'sf_cm_ai_our_world'`,
		header: 'Our World (Summary)',
		name: 'data_obj_cm_ai_report_our_world_summary',
		owner: 'app_cm',
		tables: [
			{ index: '0', table: 'CmClientServiceFlow' },
			{ columnParent: 'serviceFlow', indexParent: '0', index: '1', table: 'CmServiceFlow' },
			{ columnParent: 'client', indexParent: '0', index: '2', table: 'CmClient' },
			{ columnParent: 'person', indexParent: '2', index: '3', table: 'SysPerson' }
		],
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
				columnName: 'firstName',
				dbOrderList: 20,
				dbOrderSelect: 20,
				indexTable: '3'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'middleName',
				dbOrderSelect: 25,
				indexTable: '3'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				dbOrderList: 10,
				dbOrderSelect: 30,
				indexTable: '3'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'birthDate',
				dbOrderSelect: 40,
				indexTable: '3'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'phoneMobile',
				dbOrderSelect: 50,
				indexTable: '3'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				dbOrderSelect: 60,
				indexTable: '3'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'school',
				dbOrderSelect: 70,
				indexTable: '2'
			},

			{
				codeAccess: 'readOnly',
				columnName: 'agencyId',
				dbOrderSelect: 80,
				headerAlt: 'Group',
				indexTable: '2'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 200,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).serviceFlow.header`,
				headerAlt: 'Service Flows',
				indexTable: '0',
				nameCustom: 'customSF'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 210,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).codeReferralType.name`,
				headerAlt: 'Referral Types',
				indexTable: '0',
				nameCustom: 'customReferralTypes'
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_ai_report_our_world_summary',
		header: 'Our World (Summary)',
		name: 'node_obj_cm_ai_report_our_world_summary',
		order: 20,
		owner: 'app_cm',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}

async function initReportStudentSummary() {
	await addDataObj({
		actionsFieldGroup: 'doag_base_refresh',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs',
		header: 'Students (Summary)',
		name: 'data_obj_cm_ai_report_student_summary',
		owner: 'app_cm',
		tables: [
			{ index: '0', table: 'CmClient' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
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
				columnName: 'agencyId',
				dbOrderCrumb: 10,
				dbOrderList: 20,
				dbOrderSelect: 20,
				headerAlt: 'Group',
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				dbOrderCrumb: 20,
				dbOrderList: 20,
				dbOrderSelect: 30,
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				dbOrderCrumb: 30,
				dbOrderList: 10,
				dbOrderSelect: 40,
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 50,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).serviceFlow.header`,
				headerAlt: 'Service Flows',
				indexTable: '0',
				nameCustom: 'customSF'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 55,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).codeReferralType.name`,
				headerAlt: 'Referral Types',
				indexTable: '0',
				nameCustom: 'customReferralTypes'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 60,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd).dateReferral`,
				headerAlt: 'Service Flows - Pending Enrollments (Referral Date)',
				indexTable: '0',
				nameCustom: 'customSFPendingEnrollment'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 70,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					.dateStartEst < cal::to_local_date(datetime_current(), 'US/Eastern') AND
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd
					).dateStartEst`,
				headerAlt: 'Service Flows - Missed Enrollments (Est. Start Date)',
				indexTable: '0',
				nameCustom: 'customSFMissedEnrollments'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 80,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					NOT EXISTS .dateEnd
					).dateStart`,
				headerAlt: 'Service Flows - Enrollments (Start Date)',
				indexTable: '0',
				nameCustom: 'customSFEnrollments'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 85,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER 
					.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					EXISTS .dateEnd 
					).dateEnd`,
				headerAlt: 'Service Flows - Completions (End Data)',
				indexTable: '0',
				nameCustom: 'customSFCompletions'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 87,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client.id = app_cm::CmClient.id).codeReferralEndType.name`,
				headerAlt: 'Referral End Types',
				indexTable: '0',
				nameCustom: 'customReferralEndTypes'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 100,
				exprCustom: `(SELECT app_cm::CmCsfNote FILTER 
					.csf.client.id = app_cm::CmClient.id
					).date`,
				headerAlt: 'Notes (Date)',
				indexTable: '0',
				nameCustom: 'customNotes'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 110,
				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER .csf.client.id = app_cm::CmClient.id).cohort.course.name`,
				headerAlt: 'Courses',
				indexTable: '0',
				nameCustom: 'customSFCourses'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 120,
				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd 
					).dateReferral`,
				headerAlt: 'Cohorts - Pending (Referral Data)',
				indexTable: '0',
				nameCustom: 'customCohortsPending'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 120,
				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					.dateStartEst < cal::to_local_date(datetime_current(), 'US/Eastern') AND
					NOT EXISTS .dateStart AND
					NOT EXISTS .dateEnd 
					).dateReferral`,
				headerAlt: 'Cohorts - Missed Enrollments (Est. Start Date)',
				indexTable: '0',
				nameCustom: 'customCohortsMissedEnrollment'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 140,
				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					NOT EXISTS .dateEnd 
					).dateStart`,
				headerAlt: 'Cohorts - Enrollments (Start Date)',
				indexTable: '0',
				nameCustom: 'customCohortsEnrollments'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 150,
				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					EXISTS .dateEnd AND
					.codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Completed')) 
					).dateEnd`,
				headerAlt: 'Cohorts - Completions (End Date)',
				indexTable: '0',
				nameCustom: 'customCohortsCompletions'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 160,
				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER 
					.csf.client.id = app_cm::CmClient.id AND 
					EXISTS .dateStart AND
					EXISTS .dateEnd AND
					.codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', 'Dropped Out')) 
					).dateEnd`,
				headerAlt: 'Cohorts - Drop Outs (End Date)',
				indexTable: '0',
				nameCustom: 'customCohortsDropOuts'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_select_str',
				dbOrderSelect: 170,
				exprCustom: `(SELECT app_cm::CmCsfDocument FILTER 
					.csf.client.id = app_cm::CmClient.id
					).dateIssued`,
				headerAlt: 'Documents (Date Issued)',
				indexTable: '0',
				nameCustom: 'customDocuments'
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_ai_report_student_summary',
		header: 'Students (Summary)',
		name: 'node_obj_cm_ai_report_student_summary',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_hdr_cm_ai_reports'
	})
}
