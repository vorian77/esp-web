<script lang="ts">
	import { Form as FormClass } from '$comps/form/form'
	import ContactUs from '$routes/home/cm/contactUs/ContactUs.svelte'

	export let data

	const formDefn = data.formDefn
	let formObj = new FormClass(formDefn)
</script>

<ContactUs bind:formObj />
