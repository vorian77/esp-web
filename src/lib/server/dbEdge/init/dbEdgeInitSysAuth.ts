import { addDataObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initSysAuth'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initDataObjLogin()
	await initDataObjResetPasswordAccount()
	await initDataObjResetPasswordLogin()
	// await initDataObjSignup()
	await initDataObjVerify()
	await initDataObjAccount()
	console.log(`${FILE}.end`)
}

async function initDataObjLogin() {
	await addDataObj({
		creator: 'user_sys',
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
		fields: [
			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 10
			},
			{
				codeElement: 'password',
				columnName: 'password',
				dbOrderSelect: 20
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_login' },
					label: 'Log in'
				},
				dbOrderSelect: 30
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'link',
					action: { method: 'auth', type: 'page', value: 'data_obj_auth_reset_password_login' },
					label: 'Forgot Password?'
				},
				dbOrderSelect: 40
			}
		]
	})
}

async function initDataObjResetPasswordAccount() {
	await addDataObj({
		creator: 'user_sys',
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
		fields: [
			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 10
			},
			{
				codeElement: 'password',
				columnName: 'password',
				dbOrderSelect: 20,
				headerAlt: 'New Password'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_reset_password_account' },
					label: 'Confirm Mobile Phone Number'
				},
				dbOrderSelect: 30
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'text',
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				dbOrderSelect: 40
			}
		]
	})
}

async function initDataObjResetPasswordLogin() {
	await addDataObj({
		creator: 'user_sys',
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
		fields: [
			{
				codeElement: 'tel',
				columnName: 'userName',
				dbOrderSelect: 10
			},
			{
				codeElement: 'password',
				columnName: 'password',
				dbOrderSelect: 20,
				headerAlt: 'New Password'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_reset_password_login' },
					label: 'Confirm Mobile Phone Number'
				},
				dbOrderSelect: 30
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'text',
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				dbOrderSelect: 40
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
				dbOrderSelect: 50
			}
		]
	})
}

async function initDataObjSignup() {
	/* data_obj_auth_signup */
	await addDataObj({
		creator: 'user_sys',
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

async function initDataObjVerify() {
	/* data_obj_auth_verify_phone_mobile */
	await addDataObj({
		creator: 'user_sys',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Verify Mobile Phone Number',
		isPopup: true,
		name: 'data_obj_auth_verify_phone_mobile',
		owner: 'app_sys',
		table: 'SysUser',
		fields: [
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'text',
					label: `Check your message app for the security code and enter it here.`
				},
				dbOrderSelect: 10
			},
			{
				columnName: 'authSecurityCode',
				dbOrderSelect: 20
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'button',
					action: { method: 'auth', type: 'submit', value: 'data_obj_auth_verify_phone_mobile' },
					label: 'Verify'
				},
				dbOrderSelect: 30
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: {
					_type: 'link',
					action: { method: 'auth', type: 'resend_code' },
					label: 'Resend Security Code'
				},
				dbOrderSelect: 40
			}
		]
	})
}

async function initDataObjAccount() {
	await addDataObj({
		creator: 'user_sys',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'My Account',
		name: 'data_obj_auth_account',
		owner: 'app_sys',
		table: 'SysUser',
		link: { property: 'person', table: { mod: 'default', name: 'SysPerson' } },
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
