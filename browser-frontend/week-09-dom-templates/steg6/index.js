// Din koduppgift:
// Välj mallen <template id="song-template"> och spara den i variabeln template.

// Välj listan <ul id="playlist"> och spara den i variabeln playlist.

// Loopa igenom arrayen songs (t.ex. med forEach eller for...of).

// För varje låt i loopen:

// Klona mallens innehåll korrekt via template.content.cloneNode(true) och spara kopian i variabeln clone.

// Sök ut elementet med klassen .title inuti clone och sätt dess textinnehåll säkert till låtens title.

// Sök ut elementet med klassen .duration inuti clone och sätt dess textinnehåll säkert till låtens duration.

// Infoga clone sist i playlist.

const songs = [
    { title: 'Song A', duration: '3:20' },
    { title: 'Song B', duration: '4:05' }
]

const template = document.querySelector('#song-template')

const playlist = document.querySelector('#playlist')

for (const song of songs) {

    const clone = template.content.cloneNode(true)
    clone.querySelector('.title').textContent = song.title
    clone.querySelector('.duration').textContent = song.duration

    playlist.append(clone)
}


console.log(template)
console.log(playlist)
