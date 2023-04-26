<script>
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/YO-Baltimore-logo.png';
</script>

<div id="full-screen" class="container">
	<div class="content">
		<div class="block">
			<img class="has-ratio" src={logo} width="260" alt="YO logo" />
		</div>

		<!-- button group -->
		<div class="flex-box box-3">
			<div class="buttons">
				<button class="button is-primary is-fullwidth is-rounded" on:click={() => goto('/demo')}>
					Get Started
				</button>
				<button
					class="button is-primary is-light is-fullwidth is-rounded "
					on:click={() => goto('/demo')}
				>
					Log in
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	#full-screen {
		height: 100vh;
		overflow: hidden; /* Hide scrollbars */
		background-image: url('$lib/assets/moed2.jpg');
		background-size: cover;
	}
	img {
		height: 100%;
	}
	.container {
		position: relative;
		text-align: center;
		color: whitesmoke;
	}

	.content {
		position: fixed;
		top: 70%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
</style>
