const FILENAME = '$comps/esp/form/types.form.field.ts'

export enum FieldAccess {
	readonly = 'readonly',
	hidden = 'hidden',
	optional = 'optional',
	required = 'required'
}

export enum FieldElement {
	header = 'header',
	input = 'input',
	listField = 'listField',
	pictureTake = 'pictureTake',
	select = 'select',
	textArea = 'textArea'
}

/*
<temp> - 231003 FieldElement.listField can be removed when edgeDB allows undefined members of array tuples
https://github.com/edgedb/edgedb-js/issues/554
*/

export enum FieldElementInputType {
	checkbox = 'checkbox',
	date = 'date',
	email = 'email',
	listField = 'listField',
	number = 'number',
	password = 'password',
	radio = 'radio',
	tel = 'tel',
	text = 'text'
}

/*
<temp> - 231003 FieldElementInputType.listField can be removed when edgeDB allows undefined members of array tuples
https://github.com/edgedb/edgedb-js/issues/554
*/
