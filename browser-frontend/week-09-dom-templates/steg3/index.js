// Din koduppgift:
// Välj listan <ul id="playlist"> och spara den i variabeln playlist.

// Välj det första barn-elementet (<li id="song-1">Låt A</li>) via playlist och spara det i variabeln firstSong.

// Använd en modern DOM-metod på playlist för att flytta firstSong så att den hamnar längst bak i listan (efter "Låt C").

const playlist = document.querySelector('#playlist')

const firstSong = playlist.firstElementChild

playlist.append(firstSong)

console.log(firstSong)