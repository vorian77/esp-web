<script>
	import { Camera, CameraResultType } from '@capacitor/camera';

	let currentPict;

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri
		});
		currentPict = image.webPath;
	};
</script>

<div class="card">
	<div class="card-content">
		<p class="title is-4">Camera API Test</p>
		<p class="subtitle is-6">
			Click to use your device's camera to take a picture. Allow the app the required permissions
			once asked.
		</p>

		<div class="block">
			<div class="media">
				<div class="media-content">
					<div class="card-image">
						<figure class="image ">
							<img src={currentPict} alt="Native API demo pic" width="200" />
						</figure>
					</div>
				</div>
			</div>
		</div>

		<button class="button is-primary is-fullwidth" on:click={takePicture}>Take A Picture</button>
	</div>
</div>
