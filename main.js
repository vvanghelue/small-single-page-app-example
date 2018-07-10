import createDomElement from './lib/create-dom-element.js'
import homeComponent from './pages/home/home.js'
import userListComponent from './pages/users/list/users-list.js'
import userDetailsComponent from './pages/users/details/user-details.js'
import contactComponent from './pages/contact/contact.js'

/* data */
window.users = [{
        id: 1,
        name: 'Jean',
        phone: '+33644444444'
    },
    {
        id: 2,
        name: 'Steeve',
        phone: '+33555555555'
    },
    {
        id: 3,
        name: 'John',
        phone: '+33333333333'
    },
    {
        id: 4,
        name: 'Mark',
        phone: '+33777777777'
    }
]

let currentRoute

const routes = [{
        paths: [/\/$/],
        component: homeComponent
    },
    {
        paths: [/\/users$/],
        component: userListComponent
    },
    {
        paths: [/\/users\/(.+)$/],
        component: userDetailsComponent
    },
    {
        paths: [/\/contact$/],
        component: contactComponent
    }
]

const goToPage = window.goToPage = (path) => {

    if (path.endsWith('/')) path = path.slice(0, -1)

    if (path == '') path = '/'

    for (const route of routes) {
        for (const registeredPath of route.paths) {
            const matches = path.match(registeredPath)
            if (matches) {
                const params = matches.slice(1, matches.length)
                // console.log(`Route matched : ${route.title}`)
                renderPage(route, params)
                return
            }
        }
    }

    throw new Error(`given path "${path}" did not match any route`)
}

const renderPage = (route, params) => {
    const rootElement = createDomElement(`
		<div>
			<div class="app-header">
				<div class="app-header-name">Foo App</div>
				<div class="app-header-menu">
					<a href="#/">Home</a>
					<a href="#/users">Users</a>
					<a href="#/contact">Contact</a>
				</div>
			</div>
			<div class="app-content">

			</div>
			<div class="app-footer">
      
			</div>
		</div>
	`)

    const componentElement = route.component.apply({}, params)
    rootElement.querySelector('.app-content').appendChild(componentElement)

    document.querySelector('.app-root').innerHTML = ''
    document.querySelector('.app-root').appendChild(rootElement)
}

window.addEventListener('hashchange', (e) => {
    goToPage(
        location.hash.replace(/#/, '')
    )
})

document.addEventListener('DOMContentLoaded', (e) => {
    goToPage(
        location.hash.replace(/#/, '')
    )
})