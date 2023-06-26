<script lang="ts">
	import type { FieldTextarea } from '$comps/esp/form/fieldTextarea'
	import { FieldAccess, ValidityErrorLevel } from '$comps/types'
	export let field: FieldTextarea
	let classValue = 'rounded-lg ' + field.classValue + ' '
	classValue += field.access == FieldAccess.readonly ? 'bg-gray-200' : 'bg-white'
</script>

<label for={field.name}>{field.label}</label>

<textarea
	id={field.name}
	name={field.name}
	rows={field.rows}
	cols={field.cols}
	hidden={field.access == FieldAccess.hidden}
	readonly={field.access == FieldAccess.readonly}
	class={classValue}
	class:input-warning={field.validity.level == ValidityErrorLevel.warning}
	class:input-error={field.validity.level == ValidityErrorLevel.error}
	on:change
	on:keyup|preventDefault
/>
