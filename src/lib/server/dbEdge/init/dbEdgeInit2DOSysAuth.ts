import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObj, addNodeFooter } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export default async function init() {
	sectionHeader('DataObject - SysAuth')
	await initDataObjAccount()
	await initDataObjLogin()
	await initDataObjResetPasswordAccount()
	await initDataObjResetPasswordLogin()
	await initDataObjVerify()
	await initNodeObjFooter()
	// await initDataObjSignup()
}

async function initDataObjAccount() {
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'My Account',
		name: 'data_obj_auth_account',
		owner: 'app_sys',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: { imageField: 'avatar' },
				triggers: [
					{ type: 'retrieve', timing: 'post' },
					{ type: 'saveInsert', timing: 'pre' },
					{ type: 'saveUpdate', timing: 'pre' },
					{ type: 'saveInsert', timing: 'post' },
					{ type: 'saveUpdate', timing: 'post' }
				]
			},
			{
				name: 'qa_user_update',
				triggers: [
					{ type: 'saveInsert', timing: 'post' },
					{ type: 'saveUpdate', timing: 'post' }
				]
			}
		],
		table: 'SysUser',
		tables: [
			{ index: '0', table: 'SysUser' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
		exprFilter: '.id = <uuid,user,id>',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				isDbFilter: true,
				isDisplay: false,
				dbOrderSelect: 10,
				indexTable: '0'
			},
			{
				columnName: 'firstName',
				dbOrderSelect: 20,
				indexTable: '1'
			},
			{
				columnName: 'lastName',
				dbOrderSelect: 30,
				indexTable: '1'
			},
			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeElement: 'select',
			// 	columnName: 'codeRace',
			// 	dbOrderSelect: 42,
			// 	itemsDb: 'il_sys_code_order_index_by_codeType_name',
			// 	itemsDbParms: { codeTypeName: 'ct_sys_person_race' },
			// 	link: {
			// 		columnsDisplay: ['name'],
			// 		table: { module: 'sys_core', name: 'SysCode' }
			// 	},
			// 	indexTable: '1'
			// },
			// {
			// 	codeAccess: 'optional',
			// 	codeElement: 'checkbox',
			// 	columnName: 'favFood',
			// 	dbOrderSelect: 44,
			// 	items: [
			// 		{
			// 			data: '10',
			// 			display: 'Apple'
			// 		},
			// 		{
			// 			data: '20',
			// 			display: 'Pizza'
			// 		},
			// 		{
			// 			data: '30',
			// 			display: 'Spaghetti'
			// 		}
			// 	],
			// 	indexTable: '1'
			// },
			{
				codeAccess: 'optional',
				codeElement: 'file',
				columnName: 'avatar',
				dbOrderSelect: 50,
				indexTable: '1',
				width: 300
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 220,
				isDisplay: true,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				codeDbDataSource: 'user',
				columnName: 'modifiedBy',
				dbOrderSelect: 230,
				isDisplay: true,
				indexTable: '0'
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

async function initDataObjLogin() {
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH 
		userName := <str,parms,userName>,
		password := <str,parms,password>,
		SELECT sys_user::SysUser { userId := .id }
		FILTER .userName = userName and .password = password 
		`,
		header: 'Log in',
		isPopup: true,
		name: 'data_obj_auth_login',
		owner: 'app_sys',
		table: 'SysUser',
		tables: [
			{ index: '0', table: 'SysUser' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
		fields: [
			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 10,
				indexTable: '0'
			},
			{
				codeElement: 'password',
				columnName: 'password',
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_login' },
					label: 'Log in'
				},
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'link',
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_reset_password_login' },
					label: 'Forgot Password?'
				},
				dbOrderSelect: 40,
				indexTable: '0'
			}
		]
	})
}

async function initDataObjResetPasswordAccount() {
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH
		userName := <str,parms,userName>,
		password := <str,parms,password>,
		user := (
			UPDATE sys_user::SysUser 
			FILTER .userName = userName
			SET { password := password }
		)
		SELECT { userId := user.id }`,
		header: 'Reset Password',
		isPopup: true,
		name: 'data_obj_auth_reset_password_account',
		owner: 'app_sys',
		table: 'SysUser',
		tables: [
			{ index: '0', table: 'SysUser' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
		fields: [
			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 10,
				indexTable: '0'
			},
			{
				codeElement: 'password',
				columnName: 'password',
				dbOrderSelect: 20,
				headerAlt: 'New Password',
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_reset_password_account' },
					label: 'Confirm Mobile Phone Number'
				},
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'text',
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				dbOrderSelect: 40,
				indexTable: '0'
			}
		]
	})
}

async function initDataObjResetPasswordLogin() {
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH
		userName := <str,parms,userName>,
		password := <str,parms,password>,
		user := (
			UPDATE sys_user::SysUser 
			FILTER .userName = userName
			SET { password := password }
		)
		SELECT { userId := user.id }`,
		header: 'Reset Password',
		isPopup: true,
		name: 'data_obj_auth_reset_password_login',
		owner: 'app_sys',
		table: 'SysUser',
		tables: [
			{ index: '0', table: 'SysUser' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
		fields: [
			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 10,
				indexTable: '0'
			},
			{
				codeElement: 'password',
				columnName: 'password',
				dbOrderSelect: 20,
				headerAlt: 'New Password',
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_reset_password_login' },
					label: 'Confirm Mobile Phone Number'
				},
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'text',
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'link',
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_login' },
					label: 'Log in',
					prefix: 'Already have an account?'
				},
				dbOrderSelect: 50,
				indexTable: '0'
			}
		]
	})
}

async function initDataObjVerify() {
	/* data_obj_auth_verify_phone_mobile */
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Verify Mobile Phone Number',
		isPopup: true,
		name: 'data_obj_auth_verify_phone_mobile',
		owner: 'app_sys',
		table: 'SysUser',
		tables: [
			{ index: '0', table: 'SysUser' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
		fields: [
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'text',
					label: `Check your message app for the security code and enter it here.`
				},
				dbOrderSelect: 10,
				indexTable: '0'
			},
			{
				columnName: 'authSecurityCode',
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_verify_phone_mobile' },
					label: 'Verify'
				},
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'link',
					action: { method: 'auth', type: 'resend_code' },
					label: 'Resend Security Code'
				},
				dbOrderSelect: 40,
				indexTable: '0'
			}
		]
	})
}

async function initDataObjSignup() {
	/* data_obj_auth_signup */
	await addDataObj({
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprObject: `WITH 
		orgName := <str,system,org_name>,
		org := (SELECT sys_core::SysOrg FILTER .name = orgName),
		userName := <str,parms,userName>,
		password := <str,parms,password>,
		firstName := <str,parms,firstName>,
		lastName := <str,parms,lastName>,
		person := (SELECT sys_user::SysUser {_id := .person.id} FILTER .userName = userName),
		user := (
			INSERT sys_user::SysUser {
				owner := org,
				userName := userName,
				password := password,
				person := (
					INSERT default::SysPerson {
						firstName := firstName,
						lastName := lastName
					}
				),
				userTypes := userType
			}
			UNLESS CONFLICT ON .userName
			ELSE (
				UPDATE sys_user::SysUser
				SET {
					userName := userName,
					password := password,
					person := (
						UPDATE default::SysPerson 
						FILTER .id = <uuid>person._id
						SET { 
							firstName := firstName,
							lastName := lastName
						}
					)
				}
			)
		)
		SELECT {
			userId := user.id,
			isNew := user NOT IN sys_user::SysUser
		}`,
		header: 'Sign up',
		isPopup: true,
		name: 'data_obj_auth_signup',
		owner: 'app_sys',
		table: 'SysUser',
		fields: [
			{
				columnName: 'firstName',
				dbOrderSelect: 10
			},
			{
				columnName: 'lastName',
				dbOrderSelect: 20
			},

			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 30
			},
			{
				codeElement: 'password',
				columnName: 'password',
				dbOrderSelect: 40
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_signup' },
					label: 'Sign up'
				},
				dbOrderSelect: 50
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'text',
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				dbOrderSelect: 60
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'link',
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_login' },
					label: 'Log in',
					prefix: 'Already have an account?'
				},
				dbOrderSelect: 70
			}
		]
	})
}

async function initNodeObjFooter() {
	sectionHeader('NodeObj-Footer')

	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'home',
		header: 'Home',
		name: 'node_obj_sys_footer_home',
		order: 10,
		owner: 'app_sys'
	})
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'page',
		header: 'Contact Us',
		name: 'node_obj_sys_footer_contact_us',
		order: 20,
		owner: 'app_sys',
		page: '/home/cm/contactUs'
	})
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'object',
		dataObj: 'data_obj_auth_account',
		header: 'My Account',
		name: 'node_obj_sys_footer_auth_account',
		order: 30,
		owner: 'app_sys'
	})
}
