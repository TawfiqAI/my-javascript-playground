Övning 3 (Steg 3: Flytta noder i DOM-trädet)
När du sätter in en nod som redan existerar i DOM-trädet, flyttas noden automatiskt från sin gamla plats till den nya[cite: 3, 5]. Den kopieras alltså inte, eftersom en specifik nod bara kan ha en förälder åt gången[cite: 3, 5].

Här är din HTML-utgångspunkt:

HTML:
```python
<main id="app">
  <ul id="playlist">
    <li id="song-1">Låt A</li>
    <li id="song-2">Låt B</li>
    <li id="song-3">Låt C</li>
  </ul>
</main>
```
Din koduppgift:
Välj listan <ul id="playlist"> och spara den i variabeln playlist.

Välj det första barn-elementet Låt A via playlist och spara det i variabeln firstSong.

Använd en modern DOM-metod på playlist för att flytta firstSong så att den hamnar längst bak i listan (efter "Låt C"). 