import { ResetDb, sectionHeader, tables } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addColumn, addDataObj, addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initFeatDocument() {
	await reset()
	await config()
}

async function reset() {
	sectionHeader('Local-Reset')
	const reset = new ResetDb()

	reset.delNodeObj('node_obj_cm_csf_document_detail')
	reset.delNodeObj('node_obj_cm_csf_document_list')

	reset.delDataObj('data_obj_cm_csf_document_detail')
	reset.delDataObj('data_obj_cm_csf_document_list')

	await reset.execute()
}

async function config() {
	sectionHeader('Data Objects')

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		tables: [{ index: '0', table: 'CmCsfDocument' }],
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		actionsFieldGroup: 'doag_base_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csf',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: { columnsDisplay: ['id'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				dbOrderSelect: 40,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isShareWithClient',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 70,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'staffAgency',
				dbOrderSelect: 80,
				indexTable: '0',
				link: { columnsDisplay: ['person', 'fullName'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateExpires',
				dbOrderSelect: 90,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		tables: [{ index: '0', table: 'CmCsfDocument' }],
		actionsFieldGroup: 'doag_base_detail',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: { imageField: 'file' },
				triggers: [
					{ type: 'delete', timing: 'pre' },
					{ type: 'delete', timing: 'post' },
					{ type: 'retrieve', timing: 'post' },
					{ type: 'saveInsert', timing: 'pre' },
					{ type: 'saveUpdate', timing: 'pre' },
					{ type: 'saveInsert', timing: 'post' },
					{ type: 'saveUpdate', timing: 'post' }
				]
			}
		],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csf',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave:
						'(SELECT app_cm::CmClientServiceFlow filter.id = (<uuid,tree,CmClientServiceFlow.id>))',
					table: { module: 'app_cm', name: 'CmClientServiceFlow' }
				}
			},
			{
				codeElement: 'date',
				columnName: 'dateIssued',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeType',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_doc_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'toggle',
				columnName: 'isShareWithClient',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'file',
				columnName: 'file',
				dbOrderSelect: 60,
				indexTable: '0',
				width: 300
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 80,
				indexTable: '0',
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParms: { codeName: 'cm_training_role_staff_agency' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateExpires',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 200,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 210,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 220,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 230,
				indexTable: '0',
				isDisplay: true
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		name: 'node_obj_cm_csf_document_list',
		order: 40,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		name: 'node_obj_cm_csf_document_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_document_list'
	})
}
