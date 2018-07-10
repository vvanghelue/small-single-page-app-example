import createDomElement from './../../lib/create-dom-element.js'

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

export default homeComponent