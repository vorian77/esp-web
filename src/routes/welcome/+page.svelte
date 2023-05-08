<script>
	import { goto } from '$app/navigation';
	import logo from '$assets/YO-Baltimore-logo.png';
</script>

<div id="full-screen" class="container">
	<div class="content">
		<img class="mx-auto" src={logo} width="260" alt="YO logo" />

		<!-- button group -->
		<div class="flex-box">
			<a type="button" class="btn variant-filled-primary w-full mt-10" href="/auth?type=signup"
				>Get started</a
			>
			<a type="button" class="btn variant-ringed-primary w-full mt-1" href="/auth?type=login"
				>Log in</a
			>
		</div>
	</div>
</div>

<style>
	#full-screen {
		height: 100vh;
		overflow: hidden; /* Hide scrollbars */
		background-image: url('$assets/moed2.jpg');
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
		top: 72%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
</style>
