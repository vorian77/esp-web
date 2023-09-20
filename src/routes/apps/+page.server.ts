export async function load({}) {
	// 230920 - though no data is loaded, /apps/+page.server.ts is required
	// so that hooks.server.ts recognizes the '/apps' route
	return {}
}
