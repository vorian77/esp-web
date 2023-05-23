<script>
	export let quote
</script>

<div class="esp-card">
	<h4>Quote ({quote.author})</h4>
	<dir style="text-sm">
		{quote.quote}
		<!-- <p><span>Author: </span>{quote.author}</p> -->
		<!-- <p><span>Category: </span>{quote.category}</p> -->
	</dir>
</div>

<style>
	span,
	h4 {
		font-weight: 600;
	}
</style>
