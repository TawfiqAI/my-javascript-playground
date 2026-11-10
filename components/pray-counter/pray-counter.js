import htmlText from "./pray-counter.html?raw"
import cssText from "./pray-counter.css?inline"

const template = document.createElement('template')
template.innerHTML = htmlText

const stylesheet = new CSSStyleSheet()
stylesheet.replaceSync(cssText)




export class PrayCounter extends HTMLElement {

    #prayText

    #counter

    #abortController

    #btnWrapper

    #incBtn

    #decBtn

    #resetBtn



    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))
        this.shadowRoot.adoptedStyleSheets = [stylesheet]
        this.#prayText = this.shadowRoot.querySelector('.pray-text')
        this.#counter = this.shadowRoot.querySelector('.counter')
        this.#btnWrapper = this.shadowRoot.querySelector('.btn-wrapper')
        this.#incBtn = this.shadowRoot.querySelector('.inc-btn')
        this.#decBtn = this.shadowRoot.querySelector('.dec-btn')
        this.#resetBtn = this.shadowRoot.querySelector('.reset-btn')

    }

    static observedAttributes = ['pray-text', 'counter', 'togle-btn', 'increas-btn', 'decreas-btn', 'reset-btn']

    connectedCallback() {
        console.log('prayCounter is connected')
        this.#abortController = new AbortController()
        const { signal } = this.#abortController

        this.#btnWrapper.addEventListener('click', (event) => {
            const button = event.target.closest('button')
            if (!button) {
                return
            }

            const value = Number(this.#counter.textContent)
            if (button === this.#btnWrapper.querySelector('.inc-btn')) {
                this.#counter.textContent = value + 1
                this.#counter.classList.toggle('grean-flash')
                setTimeout(() => {
                    this.#counter.classList.toggle('grean-flash')
                }, 200)

            } else if (button === this.#btnWrapper.querySelector('.dec-btn')) {
                this.#counter.textContent = Math.max(0, value - 1)
                this.#counter.classList.toggle('red-flash')
                setTimeout(() => {
                    this.#counter.classList.toggle('red-flash')
                }, 200)
            }
            else { this.#counter.textContent = '0' }

            this.#handleClick()
        }, { signal })



    }
    disconnectedCallback() {
        this.#abortController.abort()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }
        if (name === 'pray-text') {
            this.#prayText.textContent = newValue ?? 'pray text'
        }
        if (name === 'counter') {
            this.#counter.textContent = newValue ?? '0'
        }
        if (name === 'increas-btn') {
            if (newValue !== null && newValue !== 'false') {
                this.#incBtn.hidden = false
            } else {
                this.#incBtn.hidden = true
            }
        }
        if (name === 'decreas-btn') {
            if (newValue !== null && newValue !== 'false') {
                this.#decBtn.hidden = false
            } else {
                this.#decBtn.hidden = true
            }
        }
        if (name === 'reset-btn') {
            if (newValue !== null && newValue !== 'false') {
                this.#resetBtn.hidden = false
            } else {
                this.#resetBtn.hidden = true
            }
        }
    }

    #handleClick() {
        this.dispatchEvent(new CustomEvent('count-changed',
            {
                bubbles: true,
                composed: true,
                detail: { count: Number(this.#counter.textContent) }
            }
        ))
    }
}