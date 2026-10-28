// 1. querySelector finds the first Play button inside the active card
const playButton = document.querySelector('.card.active .btn-play')

// 2. closest('.card') traverses up the ancestor tree starting from the button
// and stops as soon as it finds the nearest enclosing <section class="card">.
// This is extremely robust even if the button's internal position inside the card changes later!
const card = playButton.closest('.card')

// 3. firstElementChild selects the first child inside the card that is an actual HTML element (<h2>Player 1</h2>).
// By using the element variant (firstElementChild instead of firstChild),
// the browser safely skips over any invisible whitespace and line breaks (text nodes).
const heading = card.firstElementChild

// 4. nextElementSibling moves directly to the next sibling that is an HTML element (<p class="score">Score: 10</p>).
// Here again, we avoid the whitespace pitfall by using nextElementSibling instead of nextSibling.
const scoreParagraph = heading.nextElementSibling



