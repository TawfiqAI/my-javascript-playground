Övning 6 (Steg 6: Mallar och arrayer)
Här är din HTML-utgångspunkt:
HTML:
```python
<template id="song-template">
  <li class="song-item">
    <span class="title"></span>
    <span class="duration"></span>
  </li>
</template>

<ul id="playlist"></ul>
```
Samt denna array med data:

```python
const songs = [
  { title: 'Song A', duration: '3:20' },
  { title: 'Song B', duration: '4:05' }
]
```
Din koduppgift:

```python
Välj mallen <template id="song-template"> och spara den i variabeln template.

Välj listan <ul id="playlist"> och spara den i variabeln playlist.

Loopa igenom arrayen songs (t.ex. med forEach eller for...of).

För varje låt i loopen:

Klona mallens innehåll korrekt via template.content.cloneNode(true) och spara kopian i variabeln clone.

Sök ut elementet med klassen .title inuti clone och sätt dess textinnehåll säkert till låtens title.

Sök ut elementet med klassen .duration inuti clone och sätt dess textinnehåll säkert till låtens duration.

Infoga clone sist i playlist.
```