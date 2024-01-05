import { getEnvVar } from '$server/env'
import { init } from '$server/dbEdge/init/dbEdgeInit'

export async function load() {
	// <temp>  230908 - database init
	await init()

	return { system: { org_name: getEnvVar('ORG_NAME'), server_mode: getEnvVar('SERVER_MODE') } }
}
