import { nbrOptional, nbrRequired, strRequired, valueOrDefault } from '$utils/utils'

export enum UserType {
	student = 'student',
	staff = 'staff',
	admin = 'admin'
}

export class User {
	dodoBird: string = 'phyl'
	user: any
	app_name: string
	cm_ssr_disclosure: number | undefined
	initials: string
	per_name_full: string
	site: string
	status: string
	user_id: number | undefined
	resource_programs: Array<any> = []
	resource_widgets: Array<any> = []

	constructor(obj: any) {
		this.user = valueOrDefault(obj, {})

		if (Object.keys(obj).length > 0) {
			this.app_name = strRequired(obj.app_name, 'User', 'app_name')
			this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')

			this.initials = strRequired(obj.initials, 'User', 'initials')
			this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
			this.site = strRequired(obj.site, 'User', 'site')
			this.status = strRequired(obj.status, 'User', 'status')
			this.user_id = nbrOptional(obj.user_id, 'User')
			this.resource_programs = obj.resource_programs
			this.resource_widgets = obj.resource_widgets
		} else {
			console.log('types.user.constructor - invalid obj')
		}
	}

	hasResourceWidget(resource: string): boolean {
		if (!this.user.resource_widgets) {
			return false
		}
		return undefined !== this.user.resource_widgets.find((r: any) => r.name === resource)
	}
}
