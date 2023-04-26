<script>
	import { formFieldProxy } from 'sveltekit-superforms/client';
</script>

<form on:submit>
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

	<div class="field">
		<label class="label" for="nameLast">Last Name</label>
		<div class="control">
			<input
				class="input"
				type="text"
				id="nameLast"
				name="nameLast"
				placeholder="Enter your last name..."
				required
			/>
		</div>
	</div>

	<div class="field is-grouped mt-5">
		<div class="control">
			<button type="submit" class="button is-primary is-outline is-fullwidth">Submit</button>
		</div>
	</div>
</form>
