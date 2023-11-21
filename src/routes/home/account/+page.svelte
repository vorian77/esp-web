<script lang="ts">
	import { Form as FormClass } from '$comps/form/form'
	import Form from '$comps/form/FormDetail.svelte'
	import AuthPage from '$routes/auth/AuthPage.svelte'

	export let data
	let pageCurrent = ''
	let changeForm

	let formObjAccount = new FormClass(data.auth_account)

	async function onFormSubmitted(event: CustomEvent) {
		const { formName } = event.detail
		changeForm(formName, formObjAccount)
	}
</script>

<AuthPage bind:data bind:pageCurrent bind:submitForm={changeForm} />

<Form bind:formObj={formObjAccount} on:formSubmitted={onFormSubmitted} />
