<script lang="ts">
	import type { FieldHeader, DynamicLabel } from '$comps/esp/form/fieldHeader'
	export let field: FieldHeader
	export let pageData: {} | undefined
	export let values: {} | undefined
	import { error } from '@sveltejs/kit'

	const FILENAME = 'FormElHeader.svelte'

	function getDynamicLabel(dynamicLabel: DynamicLabel) {
		if (!dynamicLabel) {
			return ''
		}

		function setValueData(parms: [], data: {}) {
			if (!data.hasOwnProperty(parms[0])) {
				throw error(500, {
					file: FILENAME,
					function: 'setValueData',
					message: `Data: "${JSON.stringify(data)}" does not contain key: "${parms[0]}".`
				})
			}
			if (parms.length == 1) {
				return data[parms[0]]
			} else {
				return setValueData(parms.slice(1), data[parms[0]])
			}
		}

		switch (dynamicLabel.source) {
			case 'pagedata':
				return setValueData(dynamicLabel.path, pageData)
				break
			case 'values':
				return setValueData(dynamicLabel.path, values)
				break
			default:
				throw error(500, {
					file: FILENAME,
					function: 'setValue',
					message: `No case defined for dynamic label source: ${dynamicLabel.source}.`
				})
		}
	}

	const dynamicLabel = getDynamicLabel(field.dynamicLabel)
</script>

<h3 class="h3 mb-6"><span class="font-semibold">{field.label}</span>{dynamicLabel}</h3>
