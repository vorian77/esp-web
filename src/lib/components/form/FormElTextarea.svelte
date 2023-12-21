<script lang="ts">
	import type { FieldTextarea } from '$comps/form/fieldTextarea'
	import { FieldAccess, ValidityErrorLevel } from '$comps/types'

	export let field: FieldTextarea

	let classValue = 'rounded-lg ' + field.classValue + ' ' + field.colorBackground
	if (field.cols === 0) classValue += ' w-full'
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
	bind:value={field.valueCurrent.display}
/>
