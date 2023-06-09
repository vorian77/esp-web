import { getForm } from '$server/dbForm'

export async function load() {
	return { reg_personal: await getForm('366967558092357709') }
}
