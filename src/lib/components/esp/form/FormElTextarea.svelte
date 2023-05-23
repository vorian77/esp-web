<script lang="ts">
	import type { FieldTextarea } from '$comps/esp/form/fieldTextarea'
	export let field: FieldTextarea
</script>

<label for={field.name}>{field.label}</label>

<textarea id={field.name} name={field.name} rows={field.rows} cols={field.cols} on:change />
