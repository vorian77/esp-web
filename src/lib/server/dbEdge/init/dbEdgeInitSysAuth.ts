import {
	apps,
	codes,
	codeTypes,
	userType,
	userUserType,
	nodeObjPrograms,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	tables,
	tableColumns
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addColumn,
	addCode,
	addCodeType,
	addDataObj,
	addNodeObj,
	addUser,
	execute,
	review
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'init_sys_auth'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initDB()
	await initDataObjs()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

const reviewQuery = ''

async function initDB() {
	await tables([['app_sys', 'sys_user', 'User', false]])

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'int64',
		header: 'Security Code',
		name: 'authSecurityCode'
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

async function initDataObjs() {
	await dataObjLogin()
	await dataObjReset()
	await dataObjSignup()
	await dataObjVerify()
}

async function dataObjLogin() {
	/* data_obj_auth_login */
	await addDataObj({
		creator: 'user_sys',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		codeRenderType: 'form',
		exprObject: `WITH 
		userName := <str,parms,userName>,
		password := <str,parms,password>,
		SELECT sys_user::User { userId := .id }
		FILTER .userName = userName and .password = password 
		`,
		header: 'Log in',
		isPopup: true,
		name: 'data_obj_auth_login',
		owner: 'app_sys',
		table: { owner: 'app_sys', mod: 'sys_user', name: 'User' },
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
				codeCustomElType: 'button',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'submit', value: 'data_obj_auth_login' },
					label: 'Log in'
				},
				dbOrderSelect: 30
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'link',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'page', value: 'data_obj_auth_reset_password' },
					label: 'Forgot Password?'
				},
				dbOrderSelect: 40
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'link',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'page', value: 'data_obj_auth_signup' },
					label: 'Sign up',
					prefix: `Don't have an account?`
				},
				dbOrderSelect: 50
			}
		]
	})
}

async function dataObjReset() {
	/* data_obj_auth_reset_password */
	await addDataObj({
		creator: 'user_sys',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		codeRenderType: 'form',
		exprObject: `WITH
		userName := <str,parms,userName>,
		password := <str,parms,password>,
		user := (
			UPDATE sys_user::User 
			FILTER .userName = userName
			SET { password := password }
		)
		SELECT { userId := user.id }`,
		header: 'Reset Password',
		isPopup: true,
		name: 'data_obj_auth_reset_password',
		owner: 'app_sys',
		table: { owner: 'app_sys', mod: 'sys_user', name: 'User' },
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
				codeCustomElType: 'button',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'submit', value: 'data_obj_auth_reset_password' },
					label: 'Reset Password'
				},
				dbOrderSelect: 30
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'text',
				columnName: 'custom_element',
				customElParms: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				dbOrderSelect: 40
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'link',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'page', value: 'data_obj_auth_signup' },
					label: 'Sign up',
					prefix: `Don't have an account?`
				},
				dbOrderSelect: 50
			}
		]
	})
}

async function dataObjSignup() {
	/* data_obj_auth_signup */
	await addDataObj({
		creator: 'user_sys',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		codeRenderType: 'form',
		exprObject: `WITH 
		orgName := <str,system,org_name>,
		org := (SELECT sys_core::Org FILTER .name = orgName),
		userName := <str,parms,userName>,
		password := <str,parms,password>,
		firstName := <str,parms,firstName>,
		lastName := <str,parms,lastName>,
		person := (SELECT sys_user::User {_id := .person.id} FILTER .userName = userName),
		userType := (SELECT sys_user::UserType FILTER .id = <uuid>org.userTypeDefault.id),
		user := (
			INSERT sys_user::User {
				owner := org,
				userName := userName,
				password := password,
				person := (
					INSERT default::Person {
						firstName := firstName,
						lastName := lastName
					}
				),
				userTypes := userType
			}
			UNLESS CONFLICT ON .userName
			ELSE (
				UPDATE sys_user::User
				SET {
					userName := userName,
					password := password,
					person := (
						UPDATE default::Person 
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
			isNew := user NOT IN sys_user::User
		}`,
		header: 'Sign up',
		isPopup: true,
		name: 'data_obj_auth_signup',
		owner: 'app_sys',
		table: { owner: 'app_sys', mod: 'sys_user', name: 'User' },
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
				codeCustomElType: 'button',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'submit', value: 'data_obj_auth_signup' },
					label: 'Sign up'
				},
				dbOrderSelect: 50
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'text',
				columnName: 'custom_element',
				customElParms: {
					align: 'center',
					label: `We'll text you to confirm your mobile phone number. Standard rates apply.`
				},
				dbOrderSelect: 60
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'link',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'page', value: 'data_obj_auth_login' },
					label: 'Log in',
					prefix: 'Already have an account?'
				},
				dbOrderSelect: 70
			}
		]
	})
}

async function dataObjVerify() {
	/* data_obj_auth_verify_phone_mobile */
	await addDataObj({
		creator: 'user_sys',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		codeRenderType: 'form',
		header: 'Verify Mobile Phone Number',
		isPopup: true,
		name: 'data_obj_auth_verify_phone_mobile',
		owner: 'app_sys',
		table: { owner: 'app_sys', mod: 'sys_user', name: 'User' },
		fields: [
			{
				codeElement: 'custom',
				codeCustomElType: 'text',
				columnName: 'custom_element',
				customElParms: {
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
				codeCustomElType: 'button',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'submit', value: 'data_obj_auth_verify_phone_mobile' },
					label: 'Verify'
				},
				dbOrderSelect: 30
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'link',
				columnName: 'custom_element',
				customElParms: {
					action: { type: 'resend_code' },
					label: 'Resend Security Code'
				},
				dbOrderSelect: 40
			}
		]
	})
}
