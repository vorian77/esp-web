<script>
	import { goto } from '$app/navigation';
</script>

<div id="full-screen" class="container">
	<div class="content">
		<div class="block">
			<p class="text-logo">
				<span class="text-logo-bold">Upgrade</span> your future with education and employment at
				<span class="text-logo-bold">Youth Opportunity Baltimore </span>
			</p>
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
		top: 83%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
	.text-logo {
		font-size: 26px;
		font-weight: 700;
	}
	.text-logo-bold {
		font-weight: bolder;
	}
</style>
