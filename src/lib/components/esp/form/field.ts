import { pipe, strRqd, strLower, valueOrDefault } from '$utils/utils'
import { Validity } from '$comps/esp/form/fieldValidation'

export class Field {
	element: FieldElement
	name: string
	label: string
	access: FieldAccess
	disabled: boolean
	validity: Validity
	value: string

	constructor(defn: {}) {
		defn = valueOrDefault(defn, {})
		this.element = pipe(defn.element, strRqd, strLower)
		this.name = strRqd(defn.name)
		this.label = strRqd(defn.label)
		this.access = valueOrDefault(defn.access, FieldAccess.required)
		this.disabled = this.access == FieldAccess.displayOnly
		this.validity = new Validity()
		this.value = '' // temp
	}
	initItems(itemsDefn) {
		let items = []
		itemsDefn.forEach((i) => {
			items.push(new FieldItem(i.id, i.label))
		})
		return items
	}
}

export enum FieldAccess {
	required = 'required',
	optional = 'optional',
	displayOnly = 'displayonly'
}
export enum FieldElement {
	input = 'input',
	select = 'select',
	textarea = 'textarea'
}
export class FieldItem {
	id: number
	label: string
	selected: boolean

	constructor(id: number, label: string, selected = false) {
		this.id = id
		this.label = label
		this.selected = selected
	}
}
export class FieldValue {
	name: string
	value: any

	constructor(name: string, value: any) {
		this.name = name
		this.value = value
	}
}
