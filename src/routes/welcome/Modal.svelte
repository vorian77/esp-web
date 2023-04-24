<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<form method="dialog">
			<p>
				<label for="favAnimal">Favorite animal:</label>
				<input id="favAnimal" type="test" />
			</p>
			<div>
				<button id="cancel" on:click={() => dialog.close()}>Cancel</button>
				<button id="submit" type="submit">Confirm</button>
			</div>
		</form>

		<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
	</div>
</dialog>
