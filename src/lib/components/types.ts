// master types list
export * from '$comps/dataObj/dbScriptBuilder'
export * from '$comps/dataObj/types.dataObj'
export * from '$comps/form/types.field'
export * from '$comps/form/types.source'
export * from '$comps/form/types.validation'
export * from '$comps/nav/types.navTree'
export * from '$comps/nav/types.node'
export * from '$comps/types.user'
export * from '$utils/utils'

export enum SurfaceType {
	overlay = 'overlay',
	page = 'page',
	tab = 'tab'
}

export class Token {
	name: string | undefined
	constructor() {
		this.name = ''
	}
}
