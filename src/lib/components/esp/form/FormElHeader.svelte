<script lang="ts">
	import type { FieldHeader } from '$comps/esp/form/fieldHeader'
	export let field: FieldHeader
	export let pageData: {} | undefined
	export let values: {} | undefined
	import { error } from '@sveltejs/kit'

	const FILENAME = 'FormElHeader.svelte'

	function setValue(valueSource) {
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
		if (!valueSource) {
			return ''
		}
		const parms = valueSource.split('.')
		switch (parms[0].toLowerCase()) {
			case 'pagedata':
				return setValueData(parms.slice(1), pageData)
				break
			case 'values':
				return setValueData(parms.slice(1), values)
				break
			default:
				throw error(500, {
					file: FILENAME,
					function: 'setValue',
					message: `No case defined for value data source: ${parms[0]}.`
				})
		}
	}

	const val = setValue(field.value)
</script>

<h3 class="h3 mb-6"><span class="font-semibold">{field.label}</span>{val}</h3>
