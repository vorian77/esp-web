import {
	addOrgs,
	apps,
	codeTypes,
	codes,
	nodeObjPages,
	nodeObjPrograms,
	nodeObjHeaders,
	resetDB,
	rootObj,
	tables,
	userType,
	userUserType,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addColumn,
	addDataObj,
	addDataObjAction,
	addDataObjFieldItems,
	addNodeFooter,
	addUser,
	review
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initSys'

export default async function initSys() {
	console.log()
	console.log(`${FILE}.start...`)
	await resetDB()
	await initSysCore()
	await initSysCodes()
	await initSysFieldItemsLists()
	await initSysColumns()
	await initSysDataObjActions()
	await initTablePerson()
	await dataObjAccount()
	await initFooter()
	await initSysApp()
	// await initReviewQuery()
	console.log(`${FILE}.end`)
}

async function initReviewQuery() {
	let reviewQuery = ''
	await review(FILE + '.2', reviewQuery)
}

async function initSysCore() {
	await rootObj()

	await addUser({
		firstName: 'System',
		lastName: 'User',
		userName: 'user_sys',
		password: '!8394812kalsdjfa*!@#$$*&'
	})

	await apps([['app_sys'], ['app_db']])

	await addOrgs([['System', 'System App']])
}

async function initSysCodes() {
	await codeTypes([
		['app_db', 0, 'ct_db_col_alignment'],
		['app_db', 0, 'ct_db_col_data_type'],

		['app_sys', 0, 'ct_sys_do_cardinality'],
		['app_sys', 0, 'ct_sys_do_component'],

		['app_sys', 0, 'ct_sys_do_field_access'],
		['app_sys', 0, 'ct_sys_do_field_element'],
		['app_sys', 0, 'ct_sys_do_field_element_custom_type'],
		['app_sys', 0, 'ct_sys_do_field_list_dir'],
		['app_sys', 0, 'ct_sys_do_field_op'],
		['app_sys', 0, 'ct_sys_do_field_source'],

		['app_sys', 0, 'ct_sys_do_render_type'],

		['app_sys', 0, 'ct_sys_node_obj_icon'],
		['app_sys', 0, 'ct_sys_node_obj_type'],

		['app_sys', 0, 'ct_sys_person_race'],
		['app_sys', 0, 'ct_sys_role_org'],
		['app_sys', 0, 'ct_sys_role_staff'],
		['app_sys', 0, 'ct_sys_state'],
		['app_sys', 0, 'ct_sys_status']
	])

	await codes([
		// db col - alignment
		['ct_db_col_alignment', 'app_db', 'center', 0],
		['ct_db_col_alignment', 'app_db', 'left', 1],
		['ct_db_col_alignment', 'app_db', 'justify', 2],
		['ct_db_col_alignment', 'app_db', 'right', 3],

		// db col - data type
		['ct_db_col_data_type', 'app_sys', 'bool', 0],
		['ct_db_col_data_type', 'app_sys', 'computed', 1],
		['ct_db_col_data_type', 'app_sys', 'date', 2],
		['ct_db_col_data_type', 'app_sys', 'datetime', 3],
		['ct_db_col_data_type', 'app_sys', 'decimal', 4],
		['ct_db_col_data_type', 'app_sys', 'edgeType', 5],
		['ct_db_col_data_type', 'app_sys', 'int16', 6],
		['ct_db_col_data_type', 'app_sys', 'int32', 7],
		['ct_db_col_data_type', 'app_sys', 'int64', 8],
		['ct_db_col_data_type', 'app_sys', 'json', 9],
		['ct_db_col_data_type', 'app_sys', 'str', 10],
		['ct_db_col_data_type', 'app_sys', 'uuid', 11],

		// data obj - cardinality
		['ct_sys_do_cardinality', 'app_sys', 'detail', 0],
		['ct_sys_do_cardinality', 'app_sys', 'list', 1],

		// data obj - components
		['ct_sys_do_component', 'app_sys', 'Home', 0],
		['ct_sys_do_component', 'app_sys', 'FormDetail', 1],
		['ct_sys_do_component', 'app_sys', 'FormList', 2],

		// data obj field - access
		['ct_sys_do_field_access', 'app_sys', 'optional', 0],
		['ct_sys_do_field_access', 'app_sys', 'readOnly', 1],
		['ct_sys_do_field_access', 'app_sys', 'required', 2],

		// data obj field - element
		['ct_sys_do_field_element', 'app_sys', 'checkbox', 0],
		['ct_sys_do_field_element', 'app_sys', 'custom', 1],
		['ct_sys_do_field_element', 'app_sys', 'date', 2],
		['ct_sys_do_field_element', 'app_sys', 'email', 3],
		['ct_sys_do_field_element', 'app_sys', 'file', 4],
		['ct_sys_do_field_element', 'app_sys', 'input', 5],
		['ct_sys_do_field_element', 'app_sys', 'number', 6],
		['ct_sys_do_field_element', 'app_sys', 'password', 7],
		['ct_sys_do_field_element', 'app_sys', 'radio', 8],
		['ct_sys_do_field_element', 'app_sys', 'select', 9],
		['ct_sys_do_field_element', 'app_sys', 'tel', 10],
		['ct_sys_do_field_element', 'app_sys', 'text', 11],
		['ct_sys_do_field_element', 'app_sys', 'textArea', 12],

		// data obj field - cusotm element type
		['ct_sys_do_field_element_custom_type', 'app_sys', 'button', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'header', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'link', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'text', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'textDynamic', 0],

		// data obj field - list direction
		['ct_sys_do_field_list_dir', 'app_sys', 'asc', 0],
		['ct_sys_do_field_list_dir', 'app_sys', 'desc', 1],

		// data obj field - op
		['ct_sys_do_field_op', 'app_sys', 'eq', 0],

		// data obj field - source
		['ct_sys_do_field_source', 'app_sys', 'calc', 0],
		['ct_sys_do_field_source', 'app_sys', 'env', 1],
		['ct_sys_do_field_source', 'app_sys', 'literal', 2],
		['ct_sys_do_field_source', 'app_sys', 'parms', 3],
		['ct_sys_do_field_source', 'app_sys', 'preset', 4],
		['ct_sys_do_field_source', 'app_sys', 'retrieve', 5],
		['ct_sys_do_field_source', 'app_sys', 'user', 6],

		// data obj - render type
		['ct_sys_do_render_type', 'app_sys', 'form', 0],

		// node obj - icons
		['ct_sys_node_obj_icon', 'app_sys', 'application', 0],
		['ct_sys_node_obj_icon', 'app_sys', 'root', 1],

		// node obj - types
		['ct_sys_node_obj_type', 'app_sys', 'header', 0],
		['ct_sys_node_obj_type', 'app_sys', 'home', 1],
		['ct_sys_node_obj_type', 'app_sys', 'object', 2],
		['ct_sys_node_obj_type', 'app_sys', 'page', 3],
		['ct_sys_node_obj_type', 'app_sys', 'program', 4],
		['ct_sys_node_obj_type', 'app_sys', 'programObject', 5],
		['ct_sys_node_obj_type', 'app_sys', 'treeRoot', 6],

		// sys - person - race
		['ct_sys_person_race', 'app_sys', 'American Indian and Alaskan Native', 0],
		['ct_sys_person_race', 'app_sys', 'Asian', 1],
		['ct_sys_person_race', 'app_sys', 'Black or African American', 2],
		['ct_sys_person_race', 'app_sys', 'Native Hawaiian and Other Pacific Islander', 3],
		['ct_sys_person_race', 'app_sys', 'Two or more races', 4],
		['ct_sys_person_race', 'app_sys', 'White', 5],
		['ct_sys_person_race', 'app_sys', 'Other', 6],
		['ct_sys_person_race', 'app_sys', 'Prefer Not To Say', 7],

		// sys - role - organization
		['ct_sys_role_org', 'app_sys', 'cm_training_role_org_agency', 0],
		['ct_sys_role_org', 'app_sys', 'cm_training_role_org_venue', 0],

		// sys - role - staff
		['ct_sys_role_staff', 'app_sys', 'cm_training_role_staff_admin', 0],
		['ct_sys_role_staff', 'app_sys', 'cm_training_role_staff_agency', 0],
		['ct_sys_role_staff', 'app_sys', 'cm_training_role_staff_instructor', 0],

		// sys - state
		['ct_sys_state', 'app_sys', 'Illinois', 0],
		['ct_sys_state', 'app_sys', 'Maryland', 0],
		['ct_sys_state', 'app_sys', 'Michigan', 0],
		['ct_sys_state', 'app_sys', 'Ohio', 0],
		['ct_sys_state', 'app_sys', 'Pennsylvania', 0],

		// sys - status
		['ct_sys_status', 'app_sys', 'Under development', 0],
		['ct_sys_status', 'app_sys', 'Submitted', 1],
		['ct_sys_status', 'app_sys', 'Under review', 2],
		['ct_sys_status', 'app_sys', 'Approved', 3],
		['ct_sys_status', 'app_sys', 'Rejected', 4]
	])
}

async function initSysFieldItemsLists() {
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::Code {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .order',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_code_order_index_by_codeTypeName'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::Code {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .name',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_code_order_name_by_codeTypeName'
	})

	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::CodeType {data := .id, display := .header} FILTER .parent.name = <str,parms,codeTypeParentName> ORDER BY .name',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_codeType_order_name_by_codeTypeParentName'
	})

	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::Org { data := .id, display := .name } FILTER .roles.name = <str,parms,codeName> ORDER BY .name',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_role_org_by_codeName'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_user::Staff { data := .id, display := .person.fullName } FILTER .roles.name = <str,parms,codeName> ORDER BY str_lower(.person.lastName) then str_lower(.person.firstName)',
		propertyId: 'id',
		propertyLabel: 'person.fullName',
		name: 'il_sys_role_staff_by_codeName'
	})
}

async function initSysColumns() {
	await columnsSpecial()
	await columnsMgmt()
	await columnsCommon()

	async function columnsSpecial() {
		// columns - mgmt
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'custom_element',
			isExcludeInsert: true,
			isExcludeSelect: true,
			isExcludeUpdate: true,
			name: 'custom_element'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'custom_select',
			isExcludeInsert: true,
			isExcludeUpdate: true,
			name: 'custom_select'
		})
		await addColumn({
			codeDataType: 'computed',
			codeDataTypePreset: 'str',
			creator: 'user_sys',
			exprSelect: `(SELECT sys_user::User {fullName := str_upper(.person.fullName)} FILTER .userName = <str,user,userName>)`,
			header: 'Full Name (uppercase)',
			isExcludeUpdate: true,
			name: 'computed_person_fullname_uppercase',
			owner: 'app_sys'
		})
	}

	async function columnsMgmt() {
		// columns - mgmt
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'uuid',
			header: 'System ID',
			isSetBySys: true,
			name: 'id'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'datetime',
			header: 'Created At',
			isExcludeUpdate: true,
			isSetBySys: true,
			name: 'createdAt'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'datetime',
			header: 'Modified At',
			isSetBySys: true,
			name: 'modifiedAt'
		})
		await addColumn({
			codeDataType: 'edgeType',
			codeDataTypePreset: 'str',
			creator: 'user_sys',
			edgeTypeDefn: {
				property: 'person.fullName',
				table: { mod: 'sys_user', name: 'User' }
			},
			exprPreset:
				'(SELECT sys_user::User { data := .id, display := .person.fullName } FILTER .userName = <str,user,userName>)',
			header: 'Created By',
			isExcludeUpdate: true,
			name: 'createdBy',
			owner: 'app_sys'
		})
		await addColumn({
			codeDataType: 'edgeType',
			codeDataTypePreset: 'str',
			creator: 'user_sys',
			edgeTypeDefn: {
				property: 'person.fullName',
				table: { mod: 'sys_user', name: 'User' }
			},
			exprPreset:
				'(SELECT sys_user::User { data := .id, display := .person.fullName } FILTER .userName = <str,user,userName>)',
			header: 'Modified By',
			name: 'modifiedBy',
			owner: 'app_sys'
		})
	}

	async function columnsCommon() {
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'int64',
			header: 'Security Code',
			name: 'authSecurityCode',
			pattern: '^\\d{6}$',
			patternMsg: 'Security Code should be exactly 6 digits.'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Category',
			name: 'codeCategory'
		})
		await addColumn({
			codeDataType: 'edgeType',
			creator: 'user_sys',
			edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
			header: 'Status',
			name: 'codeStatus',
			owner: 'app_sys'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'date',
			header: 'Estimated End Date',
			name: 'dateEndEst'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'date',
			header: 'Estimated Start Date',
			name: 'dateStartEst'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Description',
			name: 'description'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Header',
			name: 'header'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Active',
			name: 'isActive'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Name',
			name: 'name'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Note',
			name: 'note'
		})
		await addColumn({
			codeDataType: 'edgeType',
			creator: 'user_sys',
			edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Org' } },
			header: 'Owner',
			name: 'owner',
			owner: 'app_sys'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Password',
			name: 'password'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Mobile Phone Number',
			name: 'userName'
		})
	}
}

async function initSysDataObjActions() {
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_save',
		header: 'Save',
		order: 100
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_new',
		header: 'New',
		order: 110
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_edit',
		header: 'Edit',
		order: 120
	})
	await addDataObjAction({
		color: 'variant-filled-error',
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_delete',
		header: 'Delete',
		order: 130
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_columns',
		header: 'Columns',
		order: 140
	})
	await addDataObjAction({
		allTabs: true,
		color: 'none',
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_cancel',
		header: 'Cancel',
		order: 200
	})
	await addDataObjAction({
		allTabs: true,
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_save',
		header: 'Save',
		order: 210
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_save_new',
		header: 'Save/New',
		order: 220
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_save_as',
		header: 'Save As',
		order: 230
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_new',
		header: 'New',
		order: 240
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_delete',
		header: 'Delete',
		order: 250,
		color: 'variant-filled-error'
	})
	await addDataObjAction({
		allTabs: true,
		color: 'bg-primary-300',
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_back',
		header: '< Back',
		order: 5
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_print',
		header: 'Print',
		order: 300
	})
}

async function initTablePerson() {
	await tables([['app_sys', 'default', 'Person', false]])
	await columnsPerson()

	async function columnsPerson() {
		// columns - common
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Address 1',
			name: 'addr1'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Address 2',
			name: 'addr2'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'json',
			exprStorageKey: 'avatar_<raw,calc,random10>',
			header: 'Avatar',
			name: 'avatar'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'date',
			header: 'Birth Date',
			name: 'birthDate'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'City',
			name: 'city'
		})
		await addColumn({
			codeDataType: 'edgeType',
			creator: 'user_sys',
			edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
			header: 'Race',
			name: 'codeRace',
			owner: 'app_sys'
		})
		await addColumn({
			codeDataType: 'edgeType',
			creator: 'user_sys',
			edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
			header: 'State',
			name: 'codeState',
			owner: 'app_sys'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Email',
			name: 'email'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'json',
			header: 'Ethnicity',
			name: 'ethnicity'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Favorite Food',
			isMultiSelect: true,
			name: 'favFood'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'First Name',
			name: 'firstName'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Full Name',
			name: 'fullName'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Gender',
			name: 'gender'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Last Name',
			name: 'lastName'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Mobile Phone',
			name: 'phoneMobile'
		})
		await addColumn({
			creator: 'user_sys',
			owner: 'app_sys',
			codeDataType: 'str',
			header: 'Zip',
			name: 'zip'
		})
	}
}
async function dataObjAccount() {
	await tables([['app_sys', 'sys_user', 'User', false]])

	await addDataObj({
		creator: 'user_sys',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'My Account',
		name: 'data_obj_auth_account',
		owner: 'app_sys',
		table: { owner: 'app_sys', mod: 'sys_user', name: 'User' },
		link: { property: 'person', table: { mod: 'default', name: 'Person' } },
		exprFilter: '.id = <uuid,user,id>',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				isDbFilter: true,
				isDisplay: false,
				dbOrderSelect: 10
			},
			{
				columnName: 'firstName',
				dbOrderSelect: 20,
				isLinkMember: true
			},
			{
				columnName: 'lastName',
				dbOrderSelect: 30,
				isLinkMember: true
			},

			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'optional',
				codeElement: 'file',
				columnName: 'avatar',
				dbOrderSelect: 50,
				isLinkMember: true,
				width: 300
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'link',
					action: {
						method: 'auth',
						type: 'page',
						value: 'data_obj_auth_reset_password_account'
					},
					label: 'Reset Password?'
				},
				dbOrderSelect: 60
			}
		]
	})
}

async function initFooter() {
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'home',
		creator: 'user_sys',
		header: 'Home',
		name: 'node_obj_sys_footer_home',
		order: 10,
		owner: 'app_sys'
	})

	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'page',
		creator: 'user_sys',
		header: 'Contact Us',
		name: 'node_obj_sys_footer_contact_us',
		order: 20,
		owner: 'app_sys',
		page: '/home/cm/contactUs'
	})

	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'object',
		creator: 'user_sys',
		dataObj: 'data_obj_auth_account',
		header: 'My Account',
		name: 'node_obj_sys_footer_auth_account',
		order: 30,
		owner: 'app_sys',
		queryActions: [
			{
				name: 'myAccount',
				queryTypes: ['retrieve', 'saveUpdate'],
				timings: ['pre', 'post']
			}
		]
	})
}

async function initSysApp() {
	await nodeObjPrograms([['app_sys', 'node_pgm_sys_admin', 'SysAdmin', 10, 'application']])

	await nodeObjHeaders([
		['app_sys', 'node_pgm_sys_admin', 'node_hdr_sys_utility_header', 'Utilities', 40, 'application']
	])

	await nodeObjPages([
		[
			'app_sys',
			'node_sys_utility_header',
			'node_page_sys_utility_quotes',
			'Utility-Quotes',
			10,
			'application',
			'/home/cm/quotes'
		]
	])

	await widgets([['app_sys', 'widget_sys_user']])

	await userType([['app_sys', 'ut_sys_admin']])
	await userUserType([['user_sys', 'ut_sys_admin']])

	await userTypeResourcesApps([
		['ut_sys_admin', 'app_sys'],
		['ut_sys_admin', 'app_db']
	])
	await userTypeResourcesPrograms([['ut_sys_admin', 'node_pgm_sys_admin']])
	await userTypeResourcesWidgets([['ut_sys_admin', 'widget_sys_user']])
}
