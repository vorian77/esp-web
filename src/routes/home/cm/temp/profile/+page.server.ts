import { getFormDefn } from '$lib/server/esp/form';

let formId = '364158513654530125';

export async function load({ url }) {
	return {
		formDefn: await getFormDefn(formId)
	};
}
