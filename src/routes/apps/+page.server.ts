import { redirect } from '@sveltejs/kit'

export const load = ({}) => {
	// temp: defaulting to cm until other "apps" are deployed
	throw redirect(307, '/apps/cm')
}
