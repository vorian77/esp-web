<script>
	import { Geolocation } from '@capacitor/geolocation';

	let lat;
	let long;

	async function getLocation() {
		const position = await Geolocation.getCurrentPosition();
		lat = position.coords.latitude;
		long = position.coords.longitude;
	}
</script>

<div class="card">
	<div class="card-content">
		<p class="title is-4">Geolocation API Test</p>
		<p class="subtitle is-6">
			Click to use your device's GPS to get your current location. Allow the app the required
			permissions once asked.
		</p>

		<div class="block">
			<p>Your location is:</p>
			<p>Latitude: {lat ? lat : ''}</p>
			<p>Longitude: {long ? long : ''}</p>
		</div>

		<button class="button is-primary is-fullwidth" on:click={getLocation}
			>Get Current Location</button
		>
	</div>
</div>
