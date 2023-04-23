<script>
	import welcomePic from '$lib/assets/moed2.jpg';
	import { goto } from '$app/navigation';
</script>

<body>
	<div class="container">
		<img src={welcomePic} alt="Snow" style="width:100%;" />
		<div class="centered">
			<p class="text-logo">
				Upgrade your future with education and employment at
				<span class="text-org">Youth Opportunity Baltimore </span>
			</p>
		</div>
	</div>

	<!-- button group -->
	<div class="flex-box box-3">
		<div class="buttons">
			<button class="button is-primary is-fullwidth is-rounded" on:click={() => goto('/demo')}>
				Get Started!
			</button>
			<button
				class="button is-link is-fullwidth is-outlined is-rounded"
				on:click={() => goto('/auth/login')}
			>
				Log in
			</button>
		</div>
	</div>
</body>

<!-- Footer -->

<!-- <nav class="navbar is-fixed-bottom navbar-footer">
	<div class="navbar-item">
		<p class="text-footer">
			By continuing you agree to the City of Baltimore's
			<a href="https://www.baltimorecity.gov/terms-of-use">Terms of Use</a>
			and
			<a href="https://www.baltimorecity.gov/privacy-policy">Privacy Policy</a>
		</p>
	</div>
</nav> -->
<style>
	.container {
		position: relative;
		text-align: center;
		color: white;
	}

	/* Centered text */
	.centered {
		position: fixed;
		top: 65%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
	.text-logo {
		font-size: 26px;
		font-weight: 700;
	}
	.text-org {
		font-weight: bolder;
	}
	.navbar-footer {
		border-top: 1px solid rgb(218, 214, 214);
		text-align: center;
	}
	.text-footer {
		font-size: 0.7rem;
		text-align: center;
		padding: 8px;
	}
	.body {
		background-color: blue;
	}
</style>
