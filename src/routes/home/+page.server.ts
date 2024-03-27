export async function load({}) {
	// 230920 - though no data is loaded, /home/+page.server.ts is required
	// so that hooks.server.ts recognizes the '/home' route
	return {}
}
