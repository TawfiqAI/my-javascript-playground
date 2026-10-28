Steg 1: Välja element och navigera säkert
Här är din HTML-utgångspunkt:

```python
<main id="app">
  <section class="card active">
    <h2>Spelare 1</h2>
    <p class="score">Poäng: 10</p>
    <button class="btn-play">Spela</button>
  </section>

  <section class="card">
    <h2>Spelare 2</h2>
    <p class="score">Poäng: 5</p>
    <button class="btn-play">Spela</button>
  </section>
</main>
```

Din koduppgift:
Anta att vi har valt ut Spela-knappen för Spelare 1:

JavaScript
const playButton = document.querySelector('.card.active .btn-play')
Skriv JavaScript-koden som utför följande navigering i DOM-trädet (utan att anropa document.querySelector igen):

Utgå från variabeln playButton och hitta det omslutande kortet (<section class="card active">) på ett robust sätt. Spara det i variabeln card.

Utgå från card och hämta det första barn-elementet (<h2>Spelare 1</h2>). Spara det i variabeln heading.

Utgå från heading och gå direkt till nästa syskon-element (<p class="score">Poäng: 10</p>). Spara det i variabeln scoreParagraph.

Tänk på att använda moderna element-egenskaper och metoder så att koden inte fastnar på textnoder och radbrytningar.