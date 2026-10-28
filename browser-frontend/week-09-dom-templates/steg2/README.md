Övning 2 (Steg 2: Skapa och infoga noder)
Här är din HTML-utgångspunkt:

HTML:
```python
<article class="card">
  <header class="card-header">
    <h2>Låt 1</h2>
  </header>
  <div class="card-body">
    <button class="play-btn">Spela</button>
  </div>
</article>
```
Din koduppgift:
Skriv JavaScript-kod som gör följande:

Välj elementet <div class="card-body"> och spara det i variabeln cardBody.

Skapa ett nytt <p>-element i minnet och spara det i variabeln badge.

Sätt textinnehållet på badge säkert till strängen .
```bash
"Nyhet 🎵"
```
Infoga badge-elementet först inuti cardBody (så att det hamnar före Spela-knappen).