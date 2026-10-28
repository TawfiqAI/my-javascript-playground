// Din koduppgift:
// Skriv JavaScript-kod som gör följande:

// Välj elementet <div class="card-body"> och spara det i variabeln cardBody.

// Skapa ett nytt <p>-element i minnet och spara det i variabeln badge.

// Sätt textinnehållet på badge säkert till strängen "Nyhet 🎵".

// Infoga badge-elementet först inuti cardBody (så att det hamnar före Spela-knappen).


const cardBody = document.querySelector('.card-body')

const badge = document.createElement('p')

badge.textContent = "Nyhet 🎵"

cardBody.prepend(badge)



