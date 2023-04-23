<script>
	// import Form from '$lib/components/form/Form.svelte';

	const formDef = {
		formName: 'authLogin',
		formLabel: 'Log in',
		fields: [
			{
				component: 'text',
				name: 'nameFirst',
				label: 'First Name',
				placeHolder: 'Enter first name...'
			},
			{
				component: 'text',
				name: 'nameLast',
				label: 'Last Name',
				placeHolder: 'Enter last name...'
			}
			// {
			//   component: "text",
			//   type: "password",
			//   name: "password",
			//   label: "Password",
			// },
			// {
			//   component: "date",
			//   name: "birthdate",
			//   label: "Birthdate",
			//   CalendarTitle: "Select Your Birthdate",
			// },
			// {
			//   component: "text",
			//   type: "email",
			//   name: "email",
			//   label: "Email",
			// },
			// {
			//   component: "text",
			//   type: "tel",
			//   name: "phoneMobile",
			//   label: "Mobile Phone Number",
			// },
			// {
			//   component: "text",
			//   type: "number",
			//   name: "zip",
			//   label: "Zip",
			// },

			// {
			//   component: "radio",
			//   name: "ice-cream",
			//   label: "Ice Cream",
			//   items: [
			//     { id: "1", label: "Vanilla", selected: false },
			//     { id: "2", label: "Chocolate", selected: true },
			//     { id: "3", label: "Mint", selected: false },
			//   ],
			// },
			// {
			//   component: "select",
			//   name: "pets",
			//   label: "Pets",
			//   items: [
			//     { id: "cat", label: "Cat", selected: false },
			//     { id: "dog", label: "Dog", selected: true },
			//     { id: "snake", label: "Snake", selected: false },
			//   ],
			// },
			// {
			//   component: "checkbox",
			//   name: "city",
			//   label: "City",
			//   justify: "start",
			//   labelPlacement: "end",
			//   selected: "true",
			// },
		]
	};
</script>

<!-- <Form {formDef} /> -->
