import { valueOrDefault } from '$utils/utils'

export enum UserType {
	student = 'student',
	staff = 'staff',
	admin = 'admin'
}

export class User {
	user: any

	constructor(obj: any) {
		this.user = valueOrDefault(obj, {})
	}

	hasResourceWidget(resource: string): boolean {
		if (!this.user.resource_widgets) {
			return false
		}
		return undefined !== this.user.resource_widgets.find((r) => r.name === resource)
	}
}
