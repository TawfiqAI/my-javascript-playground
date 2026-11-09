import htmlText from "./user-card.html?raw";
import cssText from "./user-card.css?inline";

const template = document.createElement('template')
template.innerHTML = htmlText

const stylesheet = new CSSStyleSheet()
stylesheet.replaceSync(cssText)


export class UserCard extends HTMLElement {

    #imageElement

    #nameElement

    #roleElement

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))
        this.shadowRoot.adoptedStyleSheets = [stylesheet]
        this.#imageElement = this.shadowRoot.querySelector('img')
        this.#nameElement = this.shadowRoot.querySelector('.user-name')
        this.#roleElement = this.shadowRoot.querySelector('.user-role')

    }

    static observedAttributes = ['user-role', 'user-name', 'user-img']

    connectedCallback() {
        console.log('UserCard ansluten till DOM')
    }
    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }
        if (name === 'user-role') {
            this.#roleElement.textContent = newValue ?? 'no role'
        }
        if (name === 'user-name') {
            this.#nameElement.textContent = newValue ?? 'Unknown user'
        }
        if (name === 'user-img') {
            this.#imageElement.src = newValue ?? ''
        }
    }

}