const button = document.querySelector('button')
const controller = new AbortController()
const { signal } = controller

button.addEventListener('click', click, { once: true })


function click() {
    console.log('Clicked!')
    // controller.abort()
}

