export async function load({}) {
	// 230920 - though no data is loaded, /legalDisclosure/+page.server.ts
	// is required so that hooks.server.ts recognizes the '/legalDisclosure' route
	return {}
}
