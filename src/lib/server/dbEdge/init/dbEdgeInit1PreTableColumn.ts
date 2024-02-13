import { sectionHeader, tableColumns } from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initPreTableColumn() {
	sectionHeader('TableColumn')

	await tableColumns([
		['CmClient', 'agencyId'],
		['CmClient', 'createdAt'],
		['CmClient', 'createdBy'],
		['CmClient', 'email'],
		['CmClient', 'firstName'],
		['CmClient', 'fullName'],
		['CmClient', 'id'],
		['CmClient', 'lastName'],
		['CmClient', 'modifiedAt'],
		['CmClient', 'modifiedBy'],
		['CmClient', 'note']
	])

	await tableColumns([
		['SysCode', 'codeType'],
		['SysCode', 'createdAt'],
		['SysCode', 'createdBy'],
		['SysCode', 'header'],
		['SysCode', 'id'],
		['SysCode', 'modifiedAt'],
		['SysCode', 'modifiedBy'],
		['SysCode', 'name'],
		['SysCode', 'order'],
		['SysCode', 'parent'],
		['SysCode', 'valueDecimal'],
		['SysCode', 'valueInteger'],
		['SysCode', 'valueString']
	])

	await tableColumns([
		['SysUser', 'avatar'],
		['SysUser', 'favFood'],
		['SysUser', 'id'],
		['SysUser', 'createdAt'],
		['SysUser', 'createdBy'],
		['SysUser', 'modifiedAt'],
		['SysUser', 'modifiedBy'],
		['SysUser', 'userName']
	])
}

async function initTableColumns() {}
