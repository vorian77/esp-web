import { FieldItem } from '../form/field'
import { valueOrDefault, strOptional, strRequired, booleanOrFalse } from '../types'

export class Overlay {
	btnLabelComplete?: string
	constructor(obj: any) {
		const clazz = 'OverlayField'
		obj = valueOrDefault(obj, {})
		this.btnLabelComplete = strOptional(obj.btnLabelComplete, clazz, 'btnLabelComplete')
	}
}

export class OverlayFieldChips extends Overlay {
	columnLabelDisplay: string
	header: string
	headerSub?: string
	isMultiSelect: boolean
	itemsList: Array<FieldItem> = []
	itemsSelected: string[] = []
	constructor(obj: any) {
		const clazz = 'OverlayFieldChips'
		super(obj)
		this.columnLabelDisplay = strRequired(obj.columnLabelDisplay, clazz, 'columnLabelDisplay')
		this.header = strRequired(obj.header, clazz, 'header')
		this.headerSub = strOptional(obj.headerSub, clazz, 'headerSub')
		this.isMultiSelect = booleanOrFalse(obj.isMultiSelect, 'isMultiSelect')
	}
	setSelected(selected: string[]) {
		this.itemsSelected = selected
	}
	getItemsDisplay() {
		console.log('getItemsDisplay:', { itemsSelected: this.itemsSelected })
		let items: Array<FieldItem> = []
		this.itemsList.forEach((item) => {
			if (this.itemsSelected.includes(item.data)) items.push(item)
		})
		return items
	}
}

export class OverlayRecord extends Overlay {
	dataObjName: string
	recordSubmitted: Record<string, any> = {}
	constructor(obj: any) {
		const clazz = 'OverlayRecord'
		super(obj)
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObj')
	}
}
