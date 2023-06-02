<script>
	export let name
	export let width = '1rem'
	export let height = '1rem'
	export let fill = '#000000'
	export let focusable = false
	let icons = [
		{
			box: 32,
			name: 'hamburger-menu',
			svg: `<svg fill="${fill}" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="matrix(1,0,0,1,-1024,-192)"> <rect id="Icons" x="0" y="0" width="1280" height="800" style="fill:none;"></rect> <g id="Icons1" serif:id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1" transform="matrix(1.50868,0,0,1.01217,6.67804,191.698)"> <g transform="matrix(0.149202,0,0,0.173437,664.206,42.142)"> <rect x="103.288" y="8.535" width="212.447" height="34.133" style="fill-rule:nonzero;"></rect> </g> <g transform="matrix(0.149202,0,0,0.173437,664.345,27.4)"> <rect x="103.288" y="8.535" width="212.447" height="34.133" style="fill-rule:nonzero;"></rect> </g> <g transform="matrix(0.149202,0,0,0.173437,664.345,12.658)"> <rect x="103.288" y="8.535" width="212.447" height="34.133" style="fill-rule:nonzero;"></rect> </g> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif:id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g transform="matrix(0.638317,0.368532,-0.368532,0.638317,785.021,-208.975)"> <g id="coffee-beans"> <g id="coffee-bean1" serif:id="coffee-bean"> </g> </g> </g> <g id="coffee-bean-filled"> </g> <g transform="matrix(0.638317,0.368532,-0.368532,0.638317,913.062,-208.975)"> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif:id="coffee-bean"> </g> </g> </g> <g id="clipboard"> </g> <g transform="matrix(1,0,0,1,128.011,1.35415)"> <g id="clipboard-paste"> </g> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g> </g></svg>`
		},
		{
			box: 32,
			name: 'back',
			svg: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="${fill}" stroke="#000000" stroke-width="5.12"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="${fill}" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="${fill}" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>`
		},
		{
			box: 32,
			name: 'quote-enclosed',
			svg: `<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11.61 11.84C11.61 14.92 10.94 15.61 9.15 16.67C9.03 16.74 8.9 16.77 8.77 16.77C8.51 16.77 8.26 16.64 8.12 16.4C7.91 16.04 8.03 15.58 8.38 15.37C9.59 14.65 10.01 14.39 10.09 12.58H8.19C7.1 12.58 6.25 11.73 6.25 10.64V9.16C6.25 8.07 7.1 7.22 8.19 7.22H9.68C10.75 7.22 11.62 8.09 11.62 9.16V11.84H11.61ZM17.75 11.84C17.75 14.92 17.08 15.61 15.29 16.67C15.17 16.74 15.04 16.77 14.91 16.77C14.65 16.77 14.4 16.64 14.26 16.4C14.05 16.04 14.17 15.58 14.52 15.37C15.73 14.65 16.15 14.39 16.23 12.58H14.32C13.23 12.58 12.38 11.73 12.38 10.64V9.16C12.38 8.07 13.23 7.22 14.32 7.22H15.81C16.88 7.22 17.75 8.09 17.75 9.16V11.84Z" fill="${fill}"/>`
		}
	]
	let displayIcon = icons.find((e) => e.name === name)
</script>

<svg
	class={$$props.class}
	{focusable}
	{width}
	{height}
	viewBox="0 0 {displayIcon.box} {displayIcon.box}"
	>{@html displayIcon.svg}
</svg>
