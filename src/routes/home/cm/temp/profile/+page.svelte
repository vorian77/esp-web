<script>
	import Form from '$comps/esp/form/Form.svelte';
	export let data;
</script>

<h2>Profile</h2>

<Form formDefn={data.formDefn} />
