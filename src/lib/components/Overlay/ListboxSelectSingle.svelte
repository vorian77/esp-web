<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
	let valueSingle: string = 'tv'
	function onChange() {
		alert('on change...')
	}
</script>

<ListBox on:click={onChange}>
	<ListBoxItem bind:group={valueSingle} name="medium" value="books">Books</ListBoxItem>
	<ListBoxItem bind:group={valueSingle} name="medium" value="movies">Movies</ListBoxItem>
	<ListBoxItem bind:group={valueSingle} name="medium" value="tv">TV</ListBoxItem>
</ListBox>

<div class="text-center"><code class="code">Selected: {valueSingle}</code></div>
