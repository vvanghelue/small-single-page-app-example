const createDomElement = function(html, onCreated) {
    const element = new DOMParser().parseFromString(html, "text/html").body.firstChild

    if (onCreated) {
        onCreated(element)
    }

    return element
}

export default createDomElement