import type { DataObjRecord } from '$comps/types'
import { nbrOptional, nbrRequired, strRequired, valueOrDefault } from '$utils/utils'

export class User {
	user: any
	firstName: string
	fullName: string
	id: string
	initials: string
	lastName: string
	org: { name: string; appName: string } | undefined
	resource_footer: Array<any> = []
	resource_programs: Array<any> = []
	resource_widgets: Array<any> = []
	userName: string

	// old
	cm_ssr_disclosure: number | undefined
	per_name_full: string
	site: string
	status: string
	user_id: number | undefined

	constructor(obj: any) {
		this.user = valueOrDefault(obj, {})
		this.fullName = strRequired(obj.fullName, 'User', 'fullName')
		this.firstName = strRequired(obj.firstName, 'User', 'firstName')
		this.lastName = strRequired(obj.lastName, 'User', 'lastName')
		this.initials = this.firstName.toUpperCase()[0] + this.lastName.toUpperCase()[0]

		this.id = strRequired(obj.id, 'User', 'id')
		this.org = obj.org ? { name: obj.org.name, appName: obj.org.appName } : undefined
		this.resource_footer = obj.resource_footer
		this.resource_programs = obj.resource_programs
		this.resource_widgets = obj.resource_widgets
		this.userName = strRequired(obj.userName, 'User', 'userName')

		// old
		// this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')
		// this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
		// this.site = strRequired(obj.site, 'User', 'site')
		// this.status = strRequired(obj.status, 'User', 'status')
		// this.user_id = nbrOptional(obj.user_id, 'User')
	}

	hasResourceWidget(resource: string): boolean {
		if (!this.user.resource_widgets) {
			return false
		}
		return undefined !== this.user.resource_widgets.find((r: any) => r.name === resource)
	}

	update(record: DataObjRecord) {
		this.firstName = Object.hasOwn(record, 'firstName') ? record.firstName.display : this.firstName
		this.lastName = Object.hasOwn(record, 'lastName') ? record.lastName.display : this.lastName
		this.fullName = this.firstName + ' ' + this.lastName
	}
}
