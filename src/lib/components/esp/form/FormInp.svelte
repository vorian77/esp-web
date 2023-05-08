<script>
	export let field = {}
	export let errors
	const fieldType = field.type || 'text'
</script>

<label class="label" for="field.name">
	<span>{field.label}</span>
	<input
		class="input bg-white text-black"
		class:input-error={errors[field.name]}
		type={fieldType}
		name={field.name}
		placeholder={field.placeHolder ?? ''}
		value={field.value ?? ''}
	/>
</label>
