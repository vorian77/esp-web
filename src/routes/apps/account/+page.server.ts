import { getForm } from '$server/dbForm'

export async function load({ locals }) {
	return {
		auth_account: await getForm('auth_account', locals.user),
		auth_verify_phone_mobile: await getForm('auth_verify_phone_mobile')
	}
}
