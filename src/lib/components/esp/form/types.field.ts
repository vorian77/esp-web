const FILENAME = '$comps/esp/form/types.form.field.ts'

export enum FieldAccess {
	displayOnly = 'displayOnly',
	hidden = 'hidden',
	optional = 'optional',
	required = 'required'
}

export enum FieldElement {
	header = 'header',
	input = 'input',
	pictureTake = 'pictureTake',
	select = 'select',
	textarea = 'textarea'
}

export enum FieldElementInputType {
	checkbox = 'checkbox',
	date = 'date',
	email = 'email',
	number = 'number',
	password = 'password',
	radio = 'radio',
	tel = 'tel',
	text = 'text'
}