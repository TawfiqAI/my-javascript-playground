Övning 4 (Steg 4: Ta bort, ersätta och tömma)
Här är din HTML-utgångspunkt:

Här är din HTML-utgångspunkt:

HTML:
```python
<div id="container">
  <p id="alert">Ett fel har uppstått!</p>
  <ul id="items">
    <li>Objekt 1</li>
    <li>Objekt 2</li>
  </ul>
</div>
```
Din koduppgift:
Välj varningselementet <p id="alert"> och spara det i variabeln alertBox.

Ta bort alertBox helt från DOM-trädet med en modern DOM-metod (utan att blanda in föräldranoden).

Välj listan <ul id="items"> och spara den i variabeln itemList.

Skapa ett nytt <li>-element i minnet med textinnehållet "Ersatt objekt". Spara det i variabeln newItem.

Töm och ersätt allt befintligt innehåll inuti itemList så att den enbart innehåller det nya newItem-elementet (använd en modern metod som gör detta i ett enda anrop).