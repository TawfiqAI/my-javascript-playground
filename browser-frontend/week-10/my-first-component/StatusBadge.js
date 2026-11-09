import htmlText from './status-badge.html?raw'
import cssText from './status-badge.css?inline'

const stylesheet = new CSSStyleSheet()
stylesheet.replaceSync(cssText)

const template = document.createElement('template')
template.innerHTML = htmlText

export class StatusBadge extends HTMLElement {
    #badgeElement

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.adoptedStyleSheets = [stylesheet]
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#badgeElement = this.shadowRoot.querySelector('.badge')
    }

    static observedAttributes = ['status']

    connectedCallback() {
        console.log('StatusBadge ansluten till DOM')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }

        if (name === 'status') {
            this.#badgeElement.textContent = newValue ?? 'Online'
        }
    }
}