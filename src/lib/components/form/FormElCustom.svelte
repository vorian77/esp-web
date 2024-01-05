<script lang="ts">
	import type { State } from '$comps/nav/types.app'
	import {
		FieldCustom,
		FieldCustomType,
		FieldCustomParmsAction,
		FieldCustomParmsButton,
		FieldCustomParmsHeader,
		FieldCustomParmsLink,
		FieldCustomParmsText
	} from '$comps/form/fieldCustom'
	import type { DataObjRecord } from '$comps/types'
	import DataViewer from '$comps/DataViewer.svelte'
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import { createEventDispatcher, onMount } from 'svelte'
	import { error } from '@sveltejs/kit'
	import f from '/src/action_data_obj_auth_account_change_password.ts'

	const FILENAME = '/$comps/form/FormElCustom.svelte'

	const drawerStore = getDrawerStore()
	const dispatch = createEventDispatcher()

	export let state: State
	export let field: FieldCustom
	export let data: DataObjRecord

	let parmsButton: FieldCustomParmsButton
	let parmsHeader: FieldCustomParmsHeader
	let parmsLink: FieldCustomParmsLink
	let parmsText: FieldCustomParmsText
	let funct: string | undefined

	$: if (field) {
		switch (field.codeType) {
			case FieldCustomType.button:
				parmsButton = field.parms as FieldCustomParmsButton
				funct = parmsLink.action.function
				break
			case FieldCustomType.header:
				parmsHeader = field.parms as FieldCustomParmsHeader
				break
			case FieldCustomType.link:
				parmsLink = field.parms as FieldCustomParmsLink
				funct = parmsLink.action.function
				break
			case FieldCustomType.text:
				parmsText = field.parms as FieldCustomParmsText
				break
			default:
				throw error(500, {
					file: FILENAME,
					function: 'POST',
					message: `No case defined for type: ${field.codeType}`
				})
		}
	}

	// let customAction: any

	onMount(async () => {
		if (funct) {
			// const mod = '$actions/action_data_obj_auth_account_change_password.ts'
			const mod = 'action_data_obj_auth_account_change_password'
			const module = (await import(`/${mod}.ts`)).default
			// customAction = module
			// const module = await import(`./dir/${file}.js`)

			// console.log('FormElCustom.function:', { funct, customAction })
			const file = `action_data_obj_auth_account_change_password`
			// console.log('FormElCustom:', { funct })
			// const mod = `./${file}.ts`
			// const mod = `./src/actions/action_data_obj_auth_account_change_password.ts`
			// customAction = await import(mod)

			// funct = `./lib/actions/${funct}.ts`
			// funct = `action_data_obj_auth_account_change_password`
			// funct = `$actions/${funct}.ts`
			// console.log('customAction', { funct })
			// customAction = (await import(mod)).default

			// customAction = await import(funct)

			// customAction = (await import('$actions/action_data_obj_auth_account_change_password.ts'))
			// 	.default
		}
	})

	// function customAction(action: any, data: any) {
	// 	console.log('customAction', { action })
	// }

	async function action(action: any) {
		// console.log('action', { action, data })
		// await customAction(drawerStore, action, data)
		// await f(drawerStore, action, data)
		// dispatch('customFieldAction', { action, data })
	}
</script>

{#if field.codeType === FieldCustomType.button}
	{@const color = parmsButton.color || 'variant-filled-primary'}
	{@const disabled = !(state.objHasChanged && state.objValidToSave)}
	<button class="btn {color} w-full" {disabled} on:click={() => action(parmsButton.action)}>
		{field.label}
	</button>
{/if}

{#if field.codeType === FieldCustomType.header}
	{@const size = parmsHeader.size ? 'h' + parmsHeader.size : 'h3'}
	{@const dynamicText =
		parmsHeader.source && parmsHeader.sourceKey ? ': ' + parmsHeader.sourceKey : ''}
	<div class="mt-8 {size}">
		<p>{field.label}<span class="font-semibold">{dynamicText}</span></p>
	</div>
{/if}

{#if field.codeType === FieldCustomType.link}
	{@const prefix = parmsLink.prefix ? parmsLink.prefix + ' ' : ''}
	<button class="btn w-full" on:click={() => action(parmsLink.action)}>
		<p>{prefix}<span class="text-blue-500">{field.label}</span></p>
	</button>
{/if}

{#if field.codeType === FieldCustomType.text}
	{@const align = parmsText.align ? 'text-' + parmsText.align : 'text-left'}
	<div class={align}>
		{field.label}
	</div>
{/if}
