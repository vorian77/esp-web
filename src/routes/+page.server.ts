import { getEnvVar } from '$server/env'

export async function load() {
	return { system: { org_name: getEnvVar('ORG_NAME'), server_mode: getEnvVar('SERVER_MODE') } }
}
