<script>
	import FormInp from '$comps/esp/form/FormInp.svelte'
	import FormInpCheckbox from '$comps/esp/form/FormInpCheckbox.svelte'
	import FormInpRadio from '$comps/esp/form/FormInpRadio.svelte'
	import FormInpSelect from '$comps/esp/form/FormInpSelect.svelte'
	// import { applyAction, enhance, type SubmitFunction } from '$app/forms'

	export let formDefn = {}
	let elements = []
	// export let retrievalParms = {}

	function escalateValidity(event) {
		const validity = event.detail
		switch (validity.type) {
			case 'matchColumn':
				// get values
				let newValidity = {}
				const form = document.getElementById(formDefn.id)
				const formData = new FormData(form)
				const values = validity.fieldGroup.map((item) => formData.get(item.name))

				// set new validity
				if (values.every((val, i, arr) => val === arr[0])) {
					// equal - fields are valid
					newValidity = undefined
				} else {
					newValidity = {
						type: validity.type,
						message: validity.message
					}
					if (values.some((v) => !v)) {
						// one field blank/incomplete
						newValidity['level'] = 'warning'
					} else {
						// both fields are entered
						newValidity['level'] = 'error'
					}
				}
				// process newValidity
				validity.fieldGroup.forEach((item) => {
					elements[item.index].setValidity(newValidity)
				})
				break
		}
	}

	$: fields = [...formDefn.fields]
</script>

<div class="esp-card">
	<form method="POST" id={formDefn.id} action="?/update" novalidate>
		{#each fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.component === 'checkbox'}
					<FormInpCheckbox {field} />
				{:else if field.component === 'radio'}
					<FormInpRadio {field} />
				{:else if field.component === 'select'}
					<FormInpSelect {field} />
				{:else if !field.component}
					<FormInp {field} bind:this={elements[index]} on:escalateValidity={escalateValidity} />
				{/if}
			</div>
		{/each}

		<button type="submit" class="btn variant-filled-primary w-full mt-2"
			>{formDefn.submitButtonLabel}</button
		>
	</form>
</div>

<pre>{JSON.stringify(formDefn, null, 2)}</pre>
