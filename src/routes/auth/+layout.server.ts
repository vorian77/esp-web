import { getFormDefn } from '$lib/server/esp/form';

let authType = '';
let formIdLogin = '364001027435790416';
let formIdSignup = '363255616174555209';

export async function load({ url }) {
	authType = url.searchParams.getAll('type')[0];

	return {
		authType: authType,
		formDefnSignup: await getFormDefn(formIdSignup),
		formDefnLogin: await getFormDefn(formIdLogin)
	};
}
