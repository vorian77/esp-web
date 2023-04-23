<script>
	import { goto } from '$app/navigation';
</script>

<nav class="navbar navbar-top is-fixed-top">
	<div class="navbar-item">
		<a class="title is-4" href="/">KidSmart Mobile Device API Demo</a>
	</div>
</nav>

<body class="has-navbar-fixed-top">
	<div class="columns is-centered">
		<div class="column is-four-fifths">
			<slot />
		</div>
	</div>
</body>

<style>
	nav {
		border-bottom: 1px solid rgb(218, 214, 214);
		text-align: center;
	}
</style>
