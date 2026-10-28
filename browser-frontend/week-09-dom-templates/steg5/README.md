Övning 5 (Steg 5: Klasser, attribut och dataset)
Här är din HTML-utgångspunkt:

HTML:
```python
<article class="song-card" data-song-id="101" data-is-favorite="false">
  <h2 class="title">Song Title</h2>
  <button class="btn-like">Gilla</button>
</article>
```
Din koduppgift:
Välj <article>-elementet och spara det i variabeln songCard.

Välj knappen <button class="btn-like"> och spara den i variabeln likeButton.

Använd classList på songCard för att lägga till klassen "active".

Läs av värdet på data-song-id från songCard via dess dataset-egenskap och spara värdet i variabeln songId.

Uppdatera data-is-favorite på songCard via dataset så att dess värde blir strängen "true".

Använd setAttribute på likeButton för att sätta attributet disabled till värdet "disabled" (eller "").