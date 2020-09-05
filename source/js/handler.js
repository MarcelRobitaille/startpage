import Router from './Router.js'
import State from './State.js'

const $search = document.getElementById('search__input')
const $dropdown = document.getElementById('dropdown')

let state = new State()


/*
*
* render
* Mutates dropdown html
* Wraps each result in a li
* Add focus class to currently focused element
*
*/

const render = () => {
	$dropdown.innerHTML = state.results
		.map(result => `
			<li class='dropdown__li ${result.url === state.focused ? 'focus' : ''}'>
				${result.render()}
			</li>`)
		.join('')
}


/*
 * updateSearchRestuls
 * Replace search results with results for current query
 */

const updateSearchResults = () => {

	// Get router instance
	const router = new Router($search.value)

	// Save results to state
	state.setResults(router.results())

	render()
}

// Call once on load in case user types whole query before js loads
updateSearchResults()


/*
*
* Handle typing in field
*
*/

$search.addEventListener('keyup', event => {

	if ([ 'ArrowDown', 'ArrowUp', 'Control', 'Enter' ]
		.indexOf(event.key) !== -1) return

	updateSearchResults()
})


/*
*
* Handle arrow keys
*
*/

$search.addEventListener('keydown', (event) => {
	const directions = event.ctrlKey
		? { n: 1, p: -1 }
		: { ArrowUp: -1, ArrowDown: 1 }

	const direction = directions[event.key]

	// If key not an arrow key
	if (!direction) return

	// Prevents going to the beginning/end of line
	event.preventDefault()

	// Update focused
	state.moveFocus(direction)

	render()
})


$search.addEventListener('keydown', (event) => {
	if(event.key !== 'Enter') return

	if(state.focused){
		window.location.href = state.focused
	}
})
