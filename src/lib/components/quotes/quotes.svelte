<script>
	export let quote;
</script>

<div class="esp-card">
	<h4>Quote</h4>
	<dir style="text-sm">
		<p>{quote.quote}</p>
		<p><span>Author: </span>{quote.author}</p>
		<!-- <p><span>Category: </span>{quote.category}</p> -->
		<!-- <p>API: {quote.api}</p> -->
	</dir>
</div>

<style>
	span,
	h4 {
		font-weight: 600;
	}
</style>
