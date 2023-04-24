<script setup>
	import { enhance } from '$app/forms'
	//import { ActionData } from './$types'

	import FormElText from '$lib/components/form/FormElText.svelte'
	import * as yup from 'yup'

	export let form
	export let formDef

	const comps = [{ type: 'text', component: FormElText }]

	// const comps = new Map([
	// 	['checkbox', resolveComponent('FormElCheckbox')],
	// 	['date', resolveComponent('FormElDate')],
	// 	['radio', resolveComponent('FormElRadio')],
	// 	['select', resolveComponent('FormElSelect')],
	// 	['text', resolveComponent('FormElText')]
	// ]);

	function getComp(type) {
		let obj = comps.find((comp) => comp.type === type)
		return obj.component
	}

	function onSubmit(e) {
		const formData = new FormData(e.target)

		const data = {}
		for (let field of formData) {
			const [key, value] = field
			data[key] = value
		}
		alert(JSON.stringify(data, null, 2))
	}
</script>

<div class="box">
	<!-- Title -->
	<h1 class="title">{formDef.formLabel}</h1>

	<form method="POST" use:enhance>
		<div class="field">
			<label class="label" for="nameFirst">First Name</label>
			<div class="control">
				<input
					class="input"
					type="text"
					id="nameFirst"
					name="nameFirst"
					placeholder="Enter your first name..."
					required
				/>
			</div>
		</div>

		<div class="field is-grouped mt-5">
			<div class="control">
				<button type="submit" class="button is-primary">Submit</button>
			</div>
			<div class="control">
				<button type="reset" class="button is-primary is-light">Reset</button>
			</div>
		</div>
	</form>

	<!-- Fields -->
	<!-- <ul>
		{#each formDef.fields as field, index (field.name)}
			<div class="block">
				<li>
					<svelte:component this={getComp(field.component)} {field} />
				</li>
			</div>
		{/each}
	</ul> -->

	<!-- Button Group -->
	<!-- <div class="field is-grouped mt-5">
		<div class="control">
			<button class="button is-primary" on:click={onSubmit}>Submit</button>
		</div>
		<div class="control">
			<button class="button is-primary is-light">Cancel</button>
		</div>
	</div> -->
</div>
