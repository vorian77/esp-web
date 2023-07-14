<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import AuthPage from '$routes/auth/AuthPage.svelte'

	export let data
	let pageCurrent = ''
	let changeForm

	let formObjAccount = new FormClass(data.auth_account)

	async function onFormSubmitted(event) {
		const { formName } = event.detail
		changeForm(formName, formObjAccount)
	}
</script>

<AuthPage bind:data bind:pageCurrent bind:submitForm={changeForm} />

<Form bind:formObj={formObjAccount} on:formSubmitted={onFormSubmitted} />
