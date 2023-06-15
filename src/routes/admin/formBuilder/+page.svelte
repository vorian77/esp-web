<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import FormBuilderColumn from '$routes/admin/formBuilder/FormBuilderColumn.svelte'

	export let data

	let form = new FormDefn(data.defnForm)
	let formCol = new FormDefn(data.defnFormCol)
	let columns = [0, 1]

	function onFormSubmitted() {}

	let newDefn =
		'At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.'
</script>

<Form bind:formObj={form} on:formSubmitted={onFormSubmitted} />

<h3 class="h3 mt-10">Columns</h3>

{#each columns as c, i}
	<div>
		<h5 class="h5">Column {i}</h5>

		<div id="column" class="mb-4 p-4 flex flex-wrap">
			<FormBuilderColumn {data} />
		</div>
	</div>
{/each}

<button type="button" class="btn variant-filled-primary w-full mt-2" on:click={onFormSubmitted}
	>Build Form Definition</button
>

<textarea id="formDefn" name="formDefn" rows="10" cols="50" class="mt-8">
	{newDefn}
</textarea>

<style>
	#column {
		border-radius: 25px;
		border: 2px solid #73ad21;
	}
</style>
