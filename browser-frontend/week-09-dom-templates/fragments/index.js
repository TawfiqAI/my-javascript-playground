//<-------------------- Steg 1 ------------------------->//
// skapa en fragment och test hur den fungerar

// const colors = ['Röd', 'Grön', 'Blå']

// const fragment = document.createDocumentFragment()

// for (const color of colors) {

//     const li = document.createElement('li')
//     li.textContent = color
//     fragment.append(li)
// }

// const colorList = document.querySelector('#color-list')
// colorList.prepend(fragment)

//<-------------------- Steg 2 ------------------------->//
// fragment och template

// const template = document.querySelector('#badge-template')
// const badge = document.querySelector('#badge-container')
// const clone = template.content.cloneNode(true)

// badge.append(clone)

//<-------------------- Steg 3 ------------------------->//

// const template = document.querySelector('#user-card-template')
// const userList = document.querySelector('#user-list')

// const clone = template.content.cloneNode(true)

// clone.querySelector('.name').textContent = 'Ada Lovelace'
// clone.querySelector('.profile-link').href = 'https://example.com/ada'


// userList.append(clone)

//<-------------------- Steg 4 ------------------------->//
// const students = [
//     { name: 'Grace Hopper', grade: 'VG' },
//     { name: 'Alan Turing', grade: 'VG' },
//     { name: 'Margaret Hamilton', grade: 'G' }
// ]

// const template = document.querySelector('#student-template')
// const studentsList = document.querySelector('#students-list')


// for (const { name, grade } of students) {

//     const clone = template.content.cloneNode(true)
//     clone.querySelector('.student-name').textContent = name
//     clone.querySelector('.student-grade').textContent = grade

//     studentsList.append(clone)
// }

//<-------------------- Steg 5 ------------------------->//



const firstBadge = document.querySelector('.user-badge')

if (firstBadge.classList.contains('is-active')) {
    firstBadge.classList.remove('is-active')
}

const secondBadge = firstBadge.nextElementSibling

secondBadge.classList.add('is-active')



secondBadge.querySelector('.user-name').textContent = secondBadge.dataset.role.toUpperCase()




