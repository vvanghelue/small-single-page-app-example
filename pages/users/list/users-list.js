import createDomElement from './../../../lib/create-dom-element.js'

const userListComponent = () => {

    const element = createDomElement(`
    <div class="home-page">
      <h1>User List</h1>
      <ul>
         ${window.users.map(u => `<li><a href="#/users/${u.id}">${u.name}</a></li>`).join('')}
      </ul>
    </div>
  `)
    return element
}

export default userListComponent