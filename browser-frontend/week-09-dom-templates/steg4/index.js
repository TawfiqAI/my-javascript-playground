// Din koduppgift:
// Välj varningselementet <p id="alert"> och spara det i variabeln alertBox.

// Ta bort alertBox helt från DOM-trädet med en modern DOM-metod (utan att blanda in föräldranoden).

// Välj listan <ul id="items"> och spara den i variabeln itemList.

// Skapa ett nytt <li>-element i minnet med textinnehållet "Ersatt objekt". Spara det i variabeln newItem.

// Töm och ersätt allt befintligt innehåll inuti itemList så att den enbart innehåller det nya newItem-elementet (använd en modern metod som gör detta i ett enda anrop).

const alertBox = document.querySelector('#alert')

alertBox.remove()

const itemList = document.querySelector('#items')

const newItem = document.createElement('li')

newItem.textContent = "Ersatt objekt"

itemList.replaceChildren(newItem)

console.log(firstSong)