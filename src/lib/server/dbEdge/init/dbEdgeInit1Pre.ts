import { codes, codeTypes, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initPreColumn } from '$server/dbEdge/init/dbEdgeInit1PreColumn'
import { initPreDataObjAction } from '$server/dbEdge/init/dbEdgeInit1PreDataObjAction'
import { initPreDataObjActionGroups } from './dbEdgeInit1PreDataObjActionGroup'
import { initPreDataObjFieldItem } from '$server/dbEdge/init/dbEdgeInit1PreDataObjFieldItem'
import { initPreTable } from '$server/dbEdge/init/dbEdgeInit1PreTable'
import { initPreTableColumn } from '$server/dbEdge/init/dbEdgeInit1PreTableColumn'

export async function initPre() {
	sectionHeader('Pre')
	// await initPreCodes()
	await initPreColumn()
	await initPreDataObjAction()
	await initPreDataObjActionGroups()
	await initPreDataObjFieldItem()
	await initPreTable()
	await initPreTableColumn()
}

async function initPreCodes() {
	await codeTypes([
		['app_cm', 0, 'ct_cm_cohort_attd_duration'],
		['app_cm', 0, 'ct_cm_doc_type'],
		['app_cm', 0, 'ct_cm_job_type'],
		['app_cm', 0, 'ct_cm_job_wage_type'],
		['app_cm', 0, 'ct_cm_job_training_related'],
		['app_cm', 0, 'ct_cm_service_flow_type'],
		['app_cm', 0, 'ct_cm_service_flow_end_type'],

		['app_cm', 0, 'ct_sys_do_action_type']
	])

	await codes([
		// ct_cm_cohort_attd_duration
		['ct_cm_cohort_attd_duration', 'app_cm', 'Full Class', 0],
		['ct_cm_cohort_attd_duration', 'app_cm', 'Half Class', 0],
		['ct_cm_cohort_attd_duration', 'app_cm', 'Missed Class', 0],

		// ct_cm_doc_type
		['ct_cm_doc_type', 'app_cm', 'Certificate - Asbestos Abatement', 0],
		['ct_cm_doc_type', 'app_cm', 'Certificate - Completion', 0],
		['ct_cm_doc_type', 'app_cm', 'Certificate - Lead Abatement', 0],
		['ct_cm_doc_type', 'app_cm', 'Certificate - OSHA 1', 0],
		['ct_cm_doc_type', 'app_cm', 'Certificate - OSHA 2', 0],
		['ct_cm_doc_type', 'app_cm', 'Employment notification', 0],
		['ct_cm_doc_type', 'app_cm', 'Employment verification', 0],
		['ct_cm_doc_type', 'app_cm', 'Evaluation form', 0],

		// ct_cm_job_type
		['ct_cm_job_type', 'app_cm', 'Full-Time', 0],
		['ct_cm_job_type', 'app_cm', 'Part-Time', 1],
		['ct_cm_job_type', 'app_cm', 'Seasonal', 2],
		['ct_cm_job_type', 'app_cm', 'Temporary', 3],

		// ct_cm_job_wage_type
		['ct_cm_job_wage_type', 'app_cm', 'Hourly', 0],
		['ct_cm_job_wage_type', 'app_cm', 'Weekly', 1],
		['ct_cm_job_wage_type', 'app_cm', 'Bi-Weekly', 2],
		['ct_cm_job_wage_type', 'app_cm', 'Monthly', 3],
		['ct_cm_job_wage_type', 'app_cm', 'Annually', 4],

		// ct_cm_job_training_related
		['ct_cm_job_training_related', 'app_cm', 'Yes', 0],
		['ct_cm_job_training_related', 'app_cm', 'No', 1],
		['ct_cm_job_training_related', 'app_cm', 'N/A', 2],

		// ct_cm_service_flow_type
		['ct_cm_service_flow_type', 'app_cm', 'From Administrator', 0],
		['ct_cm_service_flow_type', 'app_cm', 'From School', 0],
		['ct_cm_service_flow_type', 'app_cm', 'Walk-in', 0],
		['ct_cm_service_flow_type', 'app_cm', 'Our World', 0],

		// ct_cm_service_flow_end_type
		['ct_cm_service_flow_end_type', 'app_cm', 'Completed', 0],
		['ct_cm_service_flow_end_type', 'app_cm', 'Dropped Out', 0],
		['ct_cm_service_flow_end_type', 'app_cm', 'Suspended', 0],
		['ct_cm_service_flow_end_type', 'app_cm', 'Unappointed', 0],

		// ct_sys_do_action_type
		['ct_sys_do_action_type', 'app_sys', 'listEdit', 0],
		['ct_sys_do_action_type', 'app_sys', 'listNew', 0],
		['ct_sys_do_action_type', 'app_sys', 'detailDelete', 0],
		['ct_sys_do_action_type', 'app_sys', 'detailNew', 0],
		['ct_sys_do_action_type', 'app_sys', 'detailSaveAs', 0],
		['ct_sys_do_action_type', 'app_sys', 'detailSaveInsert', 0],
		['ct_sys_do_action_type', 'app_sys', 'detailSaveUpdate', 0],
		['ct_sys_do_action_type', 'app_sys', 'dialogCancel', 0],
		['ct_sys_do_action_type', 'app_sys', 'dialogDone', 0],
		['ct_sys_do_action_type', 'app_sys', 'dialogNext', 0],
		['ct_sys_do_action_type', 'app_sys', 'dialogPrevious', 0],
		['ct_sys_do_action_type', 'app_sys', 'none', 0],
		['ct_sys_do_action_type', 'app_sys', 'refresh', 0]
	])
}
