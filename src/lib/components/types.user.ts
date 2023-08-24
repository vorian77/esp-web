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
		return undefined !== this.user.resource_home_screen_widgets.find((r) => r.name === resource)
	}
}
