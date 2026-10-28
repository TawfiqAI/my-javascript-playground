// Din koduppgift:
// Välj <article>-elementet och spara det i variabeln songCard.

// Välj knappen <button class="btn-like"> och spara den i variabeln likeButton.

// Använd classList på songCard för att lägga till klassen "active".

// Läs av värdet på data-song-id från songCard via dess dataset-egenskap och spara värdet i variabeln songId.

// Uppdatera data-is-favorite på songCard via dataset så att dess värde blir strängen "true".

// Använd setAttribute på likeButton för att sätta attributet disabled till värdet "disabled" (eller "").

const songCard = document.querySelector('.song-card')

const likeButton = songCard.querySelector('.btn-like')

songCard.classList.add('active')

const songId = songCard.dataset.songId

songCard.dataset.isFavorite = true

likeButton.setAttribute('disabled', 'disabled')

