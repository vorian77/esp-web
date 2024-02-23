import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjFieldChips } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initDataObjFieldChips() {
	sectionHeader('DataObjFieldChips')

	await addDataObjFieldChips({
		btnLabelComplete: 'Select Columns',
		columnLabelDisplay: 'Column',
		header: 'Select Columns',
		headerSub: 'Columns associated with the selected table.',
		isMultiSelect: true,
		name: 'data_obj_field_chips_sys_column',
		owner: 'app_sys_admin'
	})
}
