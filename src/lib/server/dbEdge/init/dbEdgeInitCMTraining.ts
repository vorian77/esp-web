import { addForm, addNode, getFormById, execute } from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	nodesPrograms,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	columns,
	tables,
	tableColumns
} from '$server/dbEdge/init/dbEdgeInitUtilities'

const FILE = 'initCMTraining'

export async function initCMTraining() {
	console.log()
	console.log(`${FILE}...`)
	await reset()
	await apps([['app_cm_training']])
	await nodesPrograms([
		[
			'app_cm_training',
			'program',
			'pgm_training_staff_adm',
			'Staff-Administrator',
			50,
			'application',
			'/apps',
			'Home'
		],
		[
			'app_cm_training',
			'program',
			'pgm_training_staff_provider',
			'Staff-Provider (Atlantic Impact)',
			60,
			'application',
			'/apps',
			'Home'
		],
		[
			'app_cm_training',
			'program',
			'pgm_training_student',
			'Student',
			70,
			'application',
			'/apps',
			'Home'
		]
	])

	// ut_sys_admin
	await userTypeResourcesApps([['ut_sys_admin', 'app_cm_training']])

	await userTypeResourcesPrograms([
		['ut_sys_admin', ['app_cm_training', 'pgm_training_staff_adm']],
		['ut_sys_admin', ['app_cm_training', 'pgm_training_staff_provider']],
		['ut_sys_admin', ['app_cm_training', 'pgm_training_student']]
	])

	await tables([['app_cm_training', 'Student', true]])
	await columns([
		['app_cm_training', 'agencyId', 'Agency ID', 'Agency ID', 'str', '', 'left', 0, 0]
	])
	await tableColumns([
		['app_cm_training', 'Student', 'id'],
		['app_cm_training', 'Student', 'agencyId'],
		['app_cm_training', 'Student', 'firstName'],
		['app_cm_training', 'Student', 'lastName'],
		['app_cm_training', 'Student', 'fullName'],
		['app_cm_training', 'Student', 'email'],
		['app_cm_training', 'Student', 'createdAt'],
		['app_cm_training', 'Student', 'modifiedAt'],
		['app_cm_training', 'Student', 'createdBy'],
		['app_cm_training', 'Student', 'modifiedBy']
	])

	await test()
	await form1()
	await form2()
	// await review(FILE, reviewQuery)
	const form = await getFormById('app_cm_training', 'form_training_provider_student_detail')
	console.log('form:', form)
	// console.log('form.dataActions[0].item', form?._dataActions[0]._items[0])
	// console.log('form.fields[0]._column:', form?._fields[0]._column)
}

async function test() {}

async function reset() {
	await execute(`
  delete sys_obj::Form filter .owner.name = 'app_cm_training';
  delete sys_app::Node filter .owner.name = 'app_cm_training';
  delete sys_db::Table filter .owner.name = 'app_cm_training';
  delete sys_db::Column filter .owner.name = 'app_cm_training';  
  delete sys_core::App filter .name = 'app_cm_training';
`)
}

async function form1() {
	/* node_training_provider_student_list */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'form_training_provider_student_list',
		header: 'Students',
		subHeader: 'All students enrolled in any courses.',
		tableModule: 'app_cm_training',
		tableName: 'Student',

		objActions: ['noa_list_new'],

		fields: [
			{
				columnName: 'id',
				codeElement: 'listField',
				codeInputType: 'listField',
				codeAccess: 'readOnly'
			},
			{
				columnName: 'agencyId',
				codeElement: 'listField',
				codeInputType: 'listField',
				codeAccess: 'readOnly'
			},
			{
				columnName: 'firstName',
				codeElement: 'listField',
				codeInputType: 'listField',
				codeAccess: 'readOnly'
			},
			{
				columnName: 'lastName',
				codeElement: 'listField',
				codeInputType: 'listField',
				codeAccess: 'readOnly'
			},
			{
				columnName: 'email',
				codeElement: 'listField',
				codeInputType: 'listField',
				codeAccess: 'readOnly'
			}
		],

		dataActions: [
			{
				codeType: 'select-filter'
			},
			{
				codeType: 'select-fields',
				items: [
					{
						dbName: 'id',
						fieldName: 'id'
					},
					{
						dbName: 'agencyId',
						fieldName: 'agencyId'
					},
					{
						dbName: 'nameFirst',
						fieldName: 'nameFirst'
					},
					{
						dbName: 'nameLast',
						fieldName: 'nameLast'
					},
					{
						dbName: 'email',
						fieldName: 'email'
					}
				]
			},
			{
				codeType: 'select-order',
				items: [
					{
						dbName: 'nameFirst',
						codeDirection: 'asc',
						order: 10
					},
					{
						dbName: 'nameLast',
						codeDirection: 'asc',
						order: 20
					}
				]
			}
		]
	})

	await addNode({
		owner: 'app_cm_training',
		parentNode: {
			owner: 'app_cm_training',
			name: 'pgm_training_staff_provider'
		},
		codeType: 'object',
		name: 'node_training_provider_student_list',
		header: 'Students',
		order: 10,
		codeIcon: 'application',
		page: '/apps',
		obj: 'form_training_provider_student_list',
		creator: 'user_sys'
	})
}
async function form2() {
	/* node_training_provider_student_detail */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'form_training_provider_student_detail',
		header: 'Student',
		tableModule: 'app_cm_training',
		tableName: 'Student',

		objActions: ['noa_detail_save', 'noa_detail_new', 'noa_detail_delete'],

		fields: [
			{
				columnName: 'id',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly'
			},
			{
				columnName: 'agencyId',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'required'
			},
			{
				columnName: 'firstName',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'required'
			},
			{
				columnName: 'lastName',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'required'
			},
			{
				columnName: 'email',
				codeElement: 'input',
				codeInputType: 'email',
				codeAccess: 'required'
			}
		],

		dataActions: [
			{
				codeType: 'select-filter',
				items: [
					{
						dbName: 'id',
						codeDataType: 'uuid',
						codeOp: 'eq',
						codeSource: 'data',
						sourceKey: 'objectId'
					}
				]
			},
			{
				codeType: 'select-fields',
				items: [
					{
						dbName: 'id',
						fieldName: 'id'
					},
					{
						dbName: 'agencyId',
						fieldName: 'agencyId'
					},
					{
						dbName: 'nameFirst',
						fieldName: 'nameFirst'
					},
					{
						dbName: 'nameLast',
						fieldName: 'nameLast'
					},
					{
						dbName: 'email',
						fieldName: 'email'
					}
				]
			}
		]
	})

	await addNode({
		owner: 'app_cm_training',
		parentNode: {
			owner: 'app_cm_training',
			name: 'node_training_provider_student_list'
		},
		codeType: 'object',
		name: 'node_training_provider_student_detail',
		header: 'Student',
		order: 10,
		codeIcon: 'application',
		page: '/apps',
		obj: 'form_training_provider_student_detail',
		creator: 'user_sys'
	})
}
