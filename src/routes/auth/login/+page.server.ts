import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

// define validation schema
const schema = z.object({
	name: z.string().min(2),
	email: z.string().email()
});

// async function dbFetch(params) {
// 	return {
// 		name: 'phyl',
// 		email: 'phall@kssc.com'
// 	};
// }

// Case 1. load empty form
export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: do something with validated data

		return { form };
	}
};

// export const load = async () => {
// 	// server API
// 	const form = await superValidate(schema);
// 	console.log(form);

// 	// always return { form } in load and form actions
// 	return { form };
// };

// Case 2. load form from db
// export const load = async ({ params }) => {
// 	// Case 1. get data from server
// 	const data = await dbFetch(params);
// 	if (!user) throw error(404, 'Not found');
// 	const form = await superValidate(user, schema);

// 	// Case 2. empty form
// 	const form = await superValidate(schema);

// 	// always return { form } in load and form actions
// 	return { form };
// };
