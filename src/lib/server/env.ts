import { env } from '$env/dynamic/private'

export function getEnvVar(name: string) {
	return env[name] || ''
}
