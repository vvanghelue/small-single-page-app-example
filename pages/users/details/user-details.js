import createDomElement from './../../../lib/create-dom-element.js'

const userDetailsComponent = (userId) => {

    const user = window.users.find(u => u.id == userId)

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

export default userDetailsComponent