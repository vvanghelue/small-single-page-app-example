const createDomElement = function (html, onCreated) {
  const element = new DOMParser().parseFromString(html, "text/html").body.firstChild

  if (onCreated) {
    onCreated(element)
  }

  return element
}

/* data */
const users = [
  { id: 1, name: 'Jean', phone: '+33644444444' },
  { id: 2, name: 'Steeve', phone: '+33555555555' },
  { id: 3, name: 'John', phone: '+33333333333' },
  { id: 4, name: 'Mark', phone: '+33777777777' },
]

/* Components */
const homeComponent = () => {
  const element = createDomElement(`
    <div class="home-page">
      <h1>Welcome to Foo App 🏄‍♂️</h1>
      <p>
        You can access the user list here : <a href="#/users">user list</a>
      </p>
      <p>
         You can access contact page <b style="cursor: pointer; color: blue;" onclick="goToPage('/contact')">programatically</b> or via <a href="#/contact">href routing</a>
      </p>
    </div>
  `)
  return element
}

const userListComponent = () => {
  
  const element = createDomElement(`
    <div class="home-page">
      <h1>User List</h1>
      <ul>
         ${users.map(u => `<li><a href="#/users/${u.id}">${u.name}</a></li>`).join('')}
      </ul>
    </div>
  `)
  return element
}

const userDetailsComponent = (userId) => {
  
  const user = users.find(u => u.id == userId) 
  
  const element = createDomElement(`
    <div class="home-page">
      <a href="#/users">< Go back</a>
      <h1>About ${user.name}</h1>
      <p>
        Phone number : ${user.phone}
      </p>
    </div>
  `)
  return element
}

const contactComponent = (userId) => {
  const element = createDomElement(`
    <div class="home-page">
      <h1>Contact</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      </p>
    </div>
  `)
  return element
}

(() => {

	let currentRoute

	const routes = [
		{
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

		for (route of routes) {
			for (registeredPath of route.paths) {	
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
						<a href="#/">home</a>
						<a href="#/users">users</a>
						<a href="#/contact">contact</a>
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
})()