import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addColumn } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreColumn() {
	sectionHeader('Column')

	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Address 1',
		name: 'addr1'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Address 2',
		name: 'addr2'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Agency ID',
		name: 'agencyId',
		owner: 'app_cm',
		placeHolder: 'Enter agency ID'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'All Tabs',
		name: 'allTabs'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'json',
		exprStorageKey: 'avatar_<int64,calc,random10>',
		header: 'Avatar',
		name: 'avatar'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'int64',
		header: 'Security Code',
		name: 'authSecurityCode',
		pattern: '^\\d{6}$',
		patternMsg: 'Security Code should be exactly 6 digits.'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Birth Date',
		name: 'birthDate'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Complete Button Label',
		name: 'btnLabelComplete'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'City',
		name: 'city'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Class Value',
		name: 'classValue'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Client',
		name: 'client',
		owner: 'app_cm'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Alignment',
		name: 'codeAlignment'
	})

	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Data Type',
		name: 'codeDataType'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Ethnicity',
		name: 'codeEthnicity',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Gender',
		name: 'codeGender',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Icon',
		name: 'codeIcon'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Certifications',
		isMultiSelect: true,
		name: 'codeMultiCerts'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Exams',
		isMultiSelect: true,
		name: 'codeMultiExams'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Items - Included',
		isMultiSelect: true,
		name: 'codeMultiItemsIncluded'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Items - Not Included',
		isMultiSelect: true,
		name: 'codeMultiItemsNotIncluded'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Requirements',
		isMultiSelect: true,
		name: 'codeMultiRqmts'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Race',
		name: 'codeRace',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Sector',
		name: 'codeSector'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'State',
		name: 'codeState',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Status',
		name: 'codeStatus',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Type',
		name: 'codeType',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Payment Type',
		name: 'codeTypePayment',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Cohort',
		name: 'cohort'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Color',
		name: 'color'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Column',
		name: 'column'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Columns',
		isMultiSelect: true,
		name: 'columns'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'Cost',
		minValue: 0,
		name: 'cost'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Course',
		name: 'course',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'datetime',
		header: 'Created At',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		isSetBySys: true,
		name: 'createdAt'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Created By',
		isExcludeUpdate: true,
		name: 'createdBy',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Creator',
		name: 'creator'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Service Flow',
		name: 'csf'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Cohort',
		name: 'csfCohort',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'custom_element',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		name: 'custom_element'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'bool',
		header: 'custom_select_bool',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_bool'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'custom_select_float',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_float'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'int64',
		header: 'custom_select_int',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_int'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'custom_select_str',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_str'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Data Object',
		name: 'dataObj'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Date',
		name: 'date'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'End Date',
		name: 'dateEnd'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Estimated End Date',
		name: 'dateEndEst'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Referral Date',
		name: 'dateReferral'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Start Date',
		name: 'dateStart'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Estimated Start Date',
		name: 'dateStartEst'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Description',
		name: 'description'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Order - Select',
		name: 'dbOrderSelect'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Actions',
		name: 'detailActions'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Data Object',
		name: 'detailDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Header',
		name: 'detailHeader'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Name',
		name: 'detailName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Detail-Order',
		name: 'detailOrder'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Parent Node Name',
		name: 'detailParentNodeName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Sub Header',
		name: 'detailSubHeader'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'Duration',
		maxValue: 24,
		minValue: 0,
		name: 'duration',
		spinStep: '0.25'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Email',
		name: 'email'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Storage Key Expression',
		name: 'exprStorageKey'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Favorite Food',
		isMultiSelect: true,
		name: 'favFood'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Field Name',
		name: 'fieldName'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'First Name',
		name: 'firstName'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Full Name',
		name: 'fullName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Has Management Columns',
		name: 'hasMgmt',
		toggleLabelFalse: 'No',
		toggleLabelTrue: 'Yes'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Header',
		name: 'header'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Header (Side)',
		name: 'headerSide'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Icon',
		name: 'icon'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'uuid',
		header: 'System ID',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		isSetBySys: true,
		name: 'id'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Index',
		name: 'index'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Parent Index',
		name: 'indexParent'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Active',
		name: 'isActive'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Last Name',
		name: 'lastName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Exclude-Insert',
		name: 'isExcludeInsert'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Exclude-Select',
		name: 'isExcludeSelect'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Exclude-Update',
		name: 'isExcludeUpdate'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Multiple Select',
		name: 'isMultiSelect'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Self Reference',
		name: 'isSelfReference'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Set By System',
		name: 'isSetBySys'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'json',
		header: 'Link',
		name: 'link'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Property',
		name: 'linkProperty'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Module',
		name: 'linkTableModule'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Name',
		name: 'linkTableName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Actions',
		name: 'listActions'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Data Object',
		name: 'listDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Expression Filter',
		name: 'listExprFilter'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Header',
		name: 'listHeader'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Name',
		name: 'listName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'List-Order',
		name: 'listOrder'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Parent Node Name',
		name: 'listParentNodeName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Sub Header',
		name: 'listSubHeader'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Match Column',
		name: 'matchColumn'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Maximum Length',
		name: 'maxLength'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Minimum Length',
		name: 'minLength'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'float64',
		header: 'Maximum Value',
		name: 'maxValue'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'float64',
		header: 'Minimum Value',
		name: 'minValue'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Module',
		name: 'mod'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'datetime',
		header: 'Modified At',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		isSetBySys: true,
		name: 'modifiedAt'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Modified By',
		name: 'modifiedBy',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Name',
		name: 'name'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Note',
		name: 'note'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Objects Owner',
		name: 'objsOwner'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Order',
		name: 'order'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Columns',
		name: 'outputDetailColumns'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Node',
		name: 'outputDetailNode'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Data Object',
		name: 'outputDetailDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Columns',
		name: 'outputListColumns'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Data Object',
		name: 'outputListDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Node',
		name: 'outputListNode'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Owner',
		name: 'owner',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Page',
		name: 'page'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Parent',
		isSelfReference: true,
		name: 'parent'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Password',
		name: 'password'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Pattern',
		name: 'pattern'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Pattern Message',
		name: 'patternMsg'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Pattern Replacement',
		name: 'patternReplacement'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Person',
		name: 'person',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Alternate Phone',
		name: 'phoneAlt'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Mobile Phone',
		name: 'phoneMobile'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Placeholder',
		name: 'placeHolder'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Provider',
		name: 'provider'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Schedule',
		name: 'schedule'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Service Flow',
		name: 'serviceFlow',
		owner: 'app_cm'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Spin Step',
		name: 'spinStep'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Staff - Administrator',
		name: 'staffAdmin'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Staff - Agency',
		name: 'staffAgency'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Staff - Instructor',
		name: 'staffInstructor'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Table',
		name: 'table'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Module',
		name: 'tableModule'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Name',
		name: 'tableName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Owner',
		name: 'tableOwner'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Toggle Label-False',
		name: 'toggleLabelFalse'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Toggle Label-False',
		name: 'toggleLabelTrue'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Mobile Phone Number',
		name: 'userName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'float64',
		header: 'Value-Decimal',
		name: 'valueDecimal'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int64',
		header: 'Value-Integer',
		name: 'valueInteger'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Value-String',
		name: 'valueString'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Zip',
		name: 'zip'
	})
}
