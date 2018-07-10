import createDomElement from './../../lib/create-dom-element.js'

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

export default contactComponent
