import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addOverlayNodeFieldItems } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreOverlayNodeFieldItem() {
	sectionHeader('OverlayNodeFieldItem')

	await addOverlayNodeFieldItems({
		btnLabelComplete: 'Select Columns',
		columnLabelDisplay: 'Column',
		header: 'Select Columns',
		headerSub: 'Columns associated with the selected table.',
		isMultiSelect: true,
		name: 'overlay_node_field_items_sys_column',
		owner: 'app_sys_admin'
	})
}
