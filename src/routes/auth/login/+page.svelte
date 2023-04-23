<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	// client API
	const { form, enhance, errors, constraints, reset, tainted, validate } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validationMethod: 'onblur'
	});
</script>

<h1 class="title">Sign Up Form</h1>

<div class="card">
	<div class="card-content">
		<form method="POST" use:enhance>
			<!-- fields -->
			<div class="field">
				<label class="label">Name</label>
				<div class="control">
					<input
						class="input"
						class:is-danger={$errors.name}
						type="text"
						name="name"
						placeholder="Enter your name"
						data-invalid={$errors.name}
						bind:value={$form.name}
					/>
					{#if $errors.name}
						<div class="content is-small">
							<p class="has-text-danger">{$errors.name}</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="field">
				<label class="label">E-Mail</label>
				<div class="control">
					<input
						class="input"
						class:is-danger={$errors.email}
						type="email"
						name="email"
						placeholder="Enter your email"
						data-invalid={$errors.email}
						bind:value={$form.email}
						{...$constraints.email}
					/>
					{#if $errors.email}
						<div class="content is-small">
							<p class="has-text-danger">{$errors.email}</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- buttons -->
			<div class="field is-grouped">
				<div class="control">
					<button class="button is-primary" type="submit" disabled={false}>Submit</button>
				</div>
				<div class="control">
					<button class="button is-primary is-light" type="reset">Reset</button>
				</div>
			</div>
		</form>
	</div>
</div>

<SuperDebug data={$form} />
