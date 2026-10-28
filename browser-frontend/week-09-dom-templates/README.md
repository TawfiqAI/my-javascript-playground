Filen innehåller en **omfattande lathund för DOM-manipulation** baserad på kursmaterialet, kursböckerna (*JavaScript: The Definitive Guide* och *Eloquent JavaScript*) samt dina anteckningar, snyggt uppdelad i 8 kategorier.

---

# Vecka 9: DOM-trädet, DOM-manipulation & HTML Templates 🎵

Detta projekt/mapp ingår i min **JavaScript Playground** för kursen **1DV025 (Webbprogrammering på klientsidan)** vid Linnéuniversitetet.

Syftet med denna vecka är att ta klivet från Node.js-miljön till webbläsaren och lära sig att interagera med, manipulera och ändra i DOM-trädet (Document Object Model) säkert och effektivt med modern JavaScript – hela vägen upp till HTML Templates (`<template>`).

---

## 📚 Teoretiska Huvudpelare (Kursmaterial & Böcker)

Under veckan fördjupar vi oss i tre huvudsakliga områden baserat på kursartiklarna samt kapitel 15.3 och 15.6.2 i kursboken (*JavaScript: The Definitive Guide* av David Flanagan) och kapitel 14 i *Eloquent JavaScript*:

1. **DOM-trädet & Säker Navigering**
* Skillnaden mellan `Node` och `Element` (arvshierarkin `EventTarget` → `Node` → `Element` → `HTMLElement`).
* Förståelsen för "mellanrumsfällan" (*whitespace*) där radbrytningar och indentering skapar textnoder i trädet.
* Att navigera säkert med element-specifika egenskaper som `children`, `firstElementChild`, `nextElementSibling` samt sökning med `querySelector` och `closest()`.


2. **Säker Mutation i DOM:en**
* Skapa element i minnet med `document.createElement()`.
* Infoga och flytta noder med moderna metoder (`append()`, `prepend()`, `before()`, `after()`).
* Förståelse för regeln **"att flytta är att sätta in"** – en nod kan bara existera på ett ställe i trädet åt gången.
* Säker texthantering via `textContent` för att förhindra XSS-sårbarheter (istället för oskyddad `innerHTML`).
* Rensa, ta bort och ersätta element med `remove()`, `replaceWith()` och `replaceChildren()`.
* Manipulera CSS-klasser säkert via `classList` (`add`, `remove`, `toggle`).


3. **HTML Templates (`<template>`) & Separation of Concerns**
* Varför långa kedjor av `document.createElement()` blir svårlästa och varför HTML ska skrivas som HTML.
* `<template>`-elementets egenskaper: Innehållet är *inert* (rendras inte, exekveras inte och syns inte i vanliga DOM-sökningar).
* Kloningsmönstret via `template.content.cloneNode(true)` för att skapa djupkopior av mallar.
* Att populera inerta mallar med dynamisk data från arrayer innan de sätts in i dokumentet.



---

## 📖 Complete Lathund: Metoder för DOM-manipulation

### 1. Skapa noder och element

Anropas via `document`-objektet för att skapa nya noder i minnet innan de sätts in i dokumentet:

* `document.createElement(tagName)` – Skapar ett nytt HTML-element (t.ex. `'p'`, `'div'`, `'li'`).
* `document.createTextNode(text)` – Skapar en ren textnod som innehåller den angivna strängen.
* `document.createDocumentFragment()` – Skapar en lättviktsbehållare i minnet för att bygga ihop flera noder utanför DOM-trädet och infoga dem i ett enda svep.

### 2. Sätta in och placera noder

Moderna metoder (tar noder och strängar direkt; strängar blir automatiskt textnoder):

* `parent.append(...nodesOrStrings)` – Sätter in noder eller strängar **sist** bland elementets barn.
* `parent.prepend(...nodesOrStrings)` – Sätter in noder eller strängar **först** bland elementets barn.
* `target.before(...nodesOrStrings)` – Sätter in noder eller strängar som syskon **precis före** målelementet.
* `target.after(...nodesOrStrings)` – Sätter in noder eller strängar som syskon **precis efter** målelementet.

*Obs:* Om noden som sätts in redan finns i dokumentet sker en automatisk **förflyttning** (en nod kan bara existera på ett ställe i trädet samtidigt).

### 3. Ta bort, ersätta och tömma

Moderna metoder:

* `node.remove()` – Tar bort noden direkt från dess förälder i DOM-trädet.
* `oldNode.replaceWith(...newNodes)` – Ersätter `oldNode` med en eller flera nya noder eller strängar.
* `element.replaceChildren(...newNodes)` – Tömmer elementets samtliga barnnoder om den anropas utan argument, eller ersätter allt innehåll med de nya noderna.

### 4. Kopiera noder

* `node.cloneNode(deep)` – Skapar en kopia av noden.
* `cloneNode(true)` – Djupkopierar noden och **hela dess underträd** (alla barn och textnoder).
* `cloneNode(false)` – Kopierar enbart noden själv utan några barn.



### 5. Manipulera innehåll och text (Egenskaper)

* `element.textContent` – Hämtar eller sätter det råa textinnehållet. Säker mot XSS, tolkar inte HTML-taggar.
* `element.innerHTML` – Hämtar eller sätter HTML-markup som tolkas av webbläsarens HTML-parser. Används enbart med egna betrodda strängar, aldrig med data från användare.

### 6. Manipulera attribut och dataset

Metoder för attribut:

* `element.getAttribute(name)` – Hämtar attributets råa värde i HTML-koden (eller `null`).
* `element.setAttribute(name, value)` – Sätter eller skriver över ett attributs värde.
* `element.hasAttribute(name)` – Returnerar `true` om attributet finns, annars `false`.
* `element.removeAttribute(name)` – Tar bort attributet helt från elementet.

Egenskaper och dataset:

* **Direkta egenskaper:** `element.id`, `link.href`, `image.src`, `input.value` speglar motsvarande attribut med sina tolkade/aktuella värden.
* `element.dataset` – Ett objekt för att läsa/skriva anpassade `data-*`-attribut (t.ex. `data-user-id="5"` blir `element.dataset.userId`).

### 7. Manipulera CSS-klasser och stilar

Egenskapen `classList` (rekommenderat för klasser):

* `element.classList.add(...classNames)` – Lägger till en eller flera klasser.
* `element.classList.remove(...classNames)` – Tar bort en eller flera klasser.
* `element.classList.toggle(className, force)` – Lägger till klassen om den saknas, tar bort den om den finns.
* `element.classList.contains(className)` – Returnerar `true` om elementet har klassen.
* `element.classList.replace(oldClass, newClass)` – Byter ut en klass mot en annan.

Direkt inline-stil:

* `element.style.<property>` – Sätter en inline-CSS-egenskap via camelCase (t.ex. `element.style.backgroundColor = 'red'`).
* `element.style.setProperty(name, value)` – Sätter en CSS-egenskap eller CSS-variabel (t.ex. `element.style.setProperty('--main-bg', '#fff')`).
* `element.hidden = true / false` – Döljer eller visar elementet via webbläsarens inbyggda `hidden`-attribut.

### 8. Hitta och söka (Selectors API)

* `document.querySelector(selector)` / `element.querySelector(selector)` – Returnerar det första matchande elementet, eller `null`.
* `document.querySelectorAll(selector)` / `element.querySelectorAll(selector)` – Returnerar en statisk `NodeList` med samtliga matchande element.
* `element.closest(selector)` – Söker uppåt i trädet efter den närmaste förfadern (eller elementet självt) som matchar selektorn.
* `element.matches(selector)` – Returnerar `true` om elementet matchar selektorn.

---

## 🎯 Praktiska Övningssteg i Koden

Mappens övningar och kodsteg bygger på en stegvis progression utformad inför övningsuppgiften **Tiny Tunes**:

* [x] **Steg 1:** Välja element och navigera säkert (`querySelector`, `closest`, `firstElementChild`, `nextElementSibling`).
* [x] **Steg 2:** Skapa och infoga text och element säkert (`createElement`, `textContent`, `append`, `prepend`).
* [x] **Steg 3:** Flytta befintliga noder och hantera noders unika placering i trädet.
* [x] **Steg 4:** Ta bort, ersätta och tömma element (`remove`, `replaceWith`, `replaceChildren`).
* [x] **Steg 5:** Hantera klasser och attribut (`classList`, `dataset`, `setAttribute`/`getAttribute`).
* [x] **Steg 6:** HTML Templates – Arbeta med `<template>`, klona med `.content.cloneNode(true)` och rendera datalistor.

---

## 🛠️ Verktyg & Körning

För att köra och testa koden i denna mapp används [Vite](https://vitejs.dev/):

```bash
# Starta den lokala utvecklingsservern från roten eller frontend-mappen
npm run dev

```
