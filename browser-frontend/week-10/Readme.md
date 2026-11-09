Här är en komplett, strukturerad och pedagogisk `README.md` som samlar alla viktiga metoder, livscykelanrop, DOM-operationer och API:er du behöver känna till och förstå för **vecka 10 (Webbkomponenter, Shadow DOM och komponentarkitektur)**.

Du kan spara texten direkt som din egen `README.md`-lathund.

---

# Lathund: Webbkomponenter, Shadow DOM & DOM-manipulering (Vecka 10)

Denna referensguide täcker de viktigaste metoderna, egenskaperna och livscykelstegen för att bygga och förstå moderna Web Components.

---

## Innehållsförteckning

1. [Custom Elements API](https://www.google.com/search?q=%231-custom-elements-api)
2. [Livscykelmetoder (Lifecycle Callbacks)](https://www.google.com/search?q=%232-livscykelmetoder-lifecycle-callbacks)
3. [Shadow DOM API](https://www.google.com/search?q=%233-shadow-dom-api)
4. [DOM-manipulering och Traversering](https://www.google.com/search?q=%234-dom-manipulering-och-traversering)
5. [Attribut och Egenskaper](https://www.google.com/search?q=%235-attribut-och-egenskaper)
6. [Stilmallar och Inkapsling](https://www.google.com/search?q=%236-stilmallar-och-inkapsling)
7. [Filstruktur och Vite-moduler](https://www.google.com/search?q=%237-filstruktur-och-vite-moduler)

---

## 1. Custom Elements API

Globala metoder på `window.customElements` som hanterar registrering och uppslagning av egna HTML-element[cite: 5].

| Metod / Egenskap | Vad den gör och varför den används |
| --- | --- |
| `customElements.define(tagName, Class)` | Registrerar en klass som ett custom element under angivet taggnamn[cite: 5]. Namnet **måste** innehålla bindestreck (t.ex. `'user-card'`)[cite: 5]. |
| `customElements.get(tagName)` | Returnerar konstruktorn/klassen om elementnamnet redan är registrerat, annars `undefined`. Används för att undvika dubbelregistrering[cite: 5]. |
| `customElements.whenDefined(tagName)` | Returnerar ett Promise som slutförs (resolvas) när ett element med detta namn registreras. |
| `:not(:defined)` *(CSS-selektor)* | Matchar element i DOM-trädet som ännu inte har blivit registrerade/uppgraderade[cite: 5]. Bra för att dölja halvfärdiga element medan skript laddas[cite: 5]. |

---

## 2. Livscykelmetoder (Lifecycle Callbacks)

Metoder i klassen som webbläsaren automatiskt anropar vid specifika tillfällen under elementets livslängd.

```javascript
class MyComponent extends HTMLElement {
  static observedAttributes = ['status'] // Vilka attribut vi vill lyssna på

  constructor() {
    super() // 1. Måste alltid anropas först!
  }

  connectedCallback() {
    // 2. Anropas när elementet sätts in i dokumentet
  }

  disconnectedCallback() {
    // 3. Anropas när elementet tas bort ur dokumentet
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 4. Anropas när ett observerat attribut ändras
  }

  adoptedCallback() {
    // 5. Anropas om elementet flyttas till ett nytt dokument (ytterst sällsynt)
  }
}

```

### Förklaring av varje metod:

* **`constructor()`**:
* **När:** Körs när instansen skapas (`document.createElement` eller när webbläsarens HTML-parser hittar taggen)[cite: 1, 4].
* **Gör:** Anropar `super()` för att initiera prototypkedjan och skapa elementet[cite: 4, 14]. Skapar Shadow DOM med `this.attachShadow({ mode: 'open' })` och förbereder referenser[cite: 5].
* **Förbud:** Får **inte** lägga till barn eller manipulera yttre attribut (`innerHTML`, `setAttribute` eller `append` direkt på värden)[cite: 1, 5]. Får inte läsa attribut eller barn då de oftast inte finns än.


* **`connectedCallback()`**:
* **När:** Körs varje gång elementet läggs in i dokumentträdet (DOM) via t.ex. `parent.append(element)`[cite: 1, 4].
* **Gör:** Startar timers (`setInterval`), nätverksanrop och händelselyssnare (`addEventListener`)[cite: 1, 4].


* **`disconnectedCallback()`**:
* **När:** Körs varje gång elementet tas bort ur DOM-trädet (t.ex. `element.remove()`)[cite: 1, 4].
* **Gör:** Städar upp minnesläckor: stoppar timers (`clearInterval`) och avbryter lyssnare (t.ex. via `AbortController.abort()`)[cite: 1, 4, 6].


* **`attributeChangedCallback(name, oldValue, newValue)`**:
* **När:** Anropas när ett attribut som är listat i `static observedAttributes` ändras, läggs till eller tas bort[cite: 1, 4, 5].
* **Ordning:** Körs **före** `connectedCallback()` för alla attribut som fanns i HTML-koden redan från början[cite: 1].
* **Detalj:** `newValue` är `null` om attributet togs bort via `removeAttribute()`[cite: 1].


* **`static observedAttributes`**:
* En statisk array med attributnamn (skrivna med enbart gemener, t.ex. `['user-name', 'active']`) som webbläsaren ska bevaka[cite: 1, 5].



---

## 3. Shadow DOM API

Ger komponenten ett isolerat underträd där varken HTML eller CSS kan krocka med resten av sidan[cite: 2, 5, 9].

| Metod / Egenskap | Vad den gör |
| --- | --- |
| `this.attachShadow({ mode: 'open' })` | Skapar och fäster en Shadow Root vid komponenten (värden / shadow host)[cite: 5]. |
| `this.shadowRoot` | Referensen till komponentens interna rot[cite: 5]. Finns tillgänglig när `mode: 'open'` används[cite: 5]. |
| `this.shadowRoot.querySelector(selector)` | Söker efter element **enbart** inuti komponentens eget underträd[cite: 2, 5]. |
| `this.shadowRoot.append(...nodes)` | Infogar noder direkt i komponentens dolda underträd[cite: 5]. |
| `<slot></slot>` | En platshållare i mallen där användarens inskickade barn placeras och renderas visuellt[cite: 2]. Noderna stannar kvar i det yttre dokumentets träd (Light DOM)[cite: 2]. |
| `<slot name="titel"></slot>` | En namngiven slot för att ta emot barn märkta med attributet `slot="titel"`[cite: 2]. |

---

## 4. DOM-manipulering och Traversering

Metoder som används för att bygga och ändra noder inuti Shadow DOM eller på sidan[cite: 7, 10].

### Skapa och kopiera

* **`document.createElement(tagName)`**: Skapar ett nytt element i minnet[cite: 7, 10].
* **`node.cloneNode(deep)`**: Skapar en kopia av en nod[cite: 4, 7, 10].
* `cloneNode(true)`: Djupkopierar noden och hela dess innehåll (används alltid för templates: `template.content.cloneNode(true)`)[cite: 5, 7, 10].
* `cloneNode(false)`: Kopierar enbart nodens yttre skal utan några barn[cite: 7, 10].



### Infoga och flytta noder (Moderna metoder)

* **`parent.append(...nodesOrStrings)`**: Infogar noder eller text sist bland elementets barn[cite: 4, 7, 10].
* **`parent.prepend(...nodesOrStrings)`**: Infogar först bland barnen[cite: 4, 7, 10].
* **`target.before(...nodesOrStrings)`**: Infogar som syskon precis före målelementet[cite: 4, 7, 10].
* **`target.after(...nodesOrStrings)`**: Infogar som syskon precis efter målelementet[cite: 4, 7, 10].
* *Regel:* Om noden redan finns i DOM:en flyttas den automatiskt till den nya platsen (en nod kan bara finnas på ett ställe samtidigt)[cite: 7, 10].

### Ta bort och ersätta

* **`node.remove()`**: Tar bort noden direkt ur trädet[cite: 4, 6, 7, 10].
* **`oldNode.replaceWith(...newNodes)`**: Byter ut noden mot nya noder eller text[cite: 4, 7, 10].
* **`element.replaceChildren(...newNodes)`**: Tömmer elementets samtliga barn och lägger vid behov in nya noder[cite: 7, 10].

### Söka i trädet

* **`root.querySelector(selector)`**: Returnerar det första matchande elementet, eller `null`[cite: 4, 7, 10].
* **`root.querySelectorAll(selector)`**: Returnerar en statisk NodeList med alla matchningar[cite: 4, 7, 10].
* **`element.closest(selector)`**: Söker uppåt bland förfäder efter närmaste element som matchar selektorn[cite: 7, 10].
* **`element.matches(selector)`**: Returnerar `true` om elementet självt matchar en viss CSS-selektor[cite: 4, 7, 10].

---

## 5. Attribut och Egenskaper

Metoder för att läsa och sätta data på element[cite: 4, 7, 10].

### Attributmetoder

* **`element.getAttribute(name)`**: Returnerar attributets råa textvärde i HTML-koden (eller `null` om det saknas)[cite: 1, 4, 7, 10].
* **`element.setAttribute(name, value)`**: Sätter eller uppdaterar ett attribut[cite: 4, 7, 10]. Värdet konverteras alltid till en sträng[cite: 1].
* **`element.hasAttribute(name)`**: Returnerar `true` om attributet finns, annars `false`[cite: 4, 7, 10].
* **`element.removeAttribute(name)`**: Tar bort attributet från taggen[cite: 4, 7, 10].

### Text och Innehåll

* **`element.textContent`**: Sätter eller hämtar rå text[cite: 4, 7, 10]. Tolkar inte HTML och är säker mot XSS (Cross-Site Scripting)[cite: 4, 7, 10]. Använd alltid detta för dynamisk data[cite: 1, 7].
* **`element.innerHTML`**: Tolkar textsträngen som HTML och bygger noder under huven[cite: 4, 7, 10]. Används enbart för fast, betrodd mallkod[cite: 7, 10].

### Klasser och Inline-stilar

* **`element.classList.add(name)` / `.remove(name)**`: Lägger till eller tar bort CSS-klasser[cite: 4, 7, 10].
* **`element.classList.toggle(name)`**: Lägger till klassen om den saknas, tar bort om den finns[cite: 7, 10].
* **`element.style.setProperty(name, value)`**: Sätter en CSS-egenskap eller CSS-variabel dynamiskt[cite: 7, 10].

---

## 6. Stilmallar och Inkapsling

Hur CSS styrs i och omkring en Shadow DOM[cite: 2, 5, 9].

* **`CSSStyleSheet` & `adoptedStyleSheets**`:
```javascript
const sheet = new CSSStyleSheet()
sheet.replaceSync(cssString)

// I konstruktorn:
this.shadowRoot.adoptedStyleSheets = [sheet]

```


Låter alla instanser dela på samma tolkade stilmallsobjekt i minnet för maximal prestanda i stället för att parsa om `<style>`-taggar[cite: 9].
* **`:host`**: Selektor inuti komponentens CSS för att styla själva värdelementet[cite: 2].
* `:host { display: block; }`: Krävs nästan alltid eftersom custom elements är `display: inline` som standard[cite: 2].
* `:host([hidden]) { display: none; }`: Krävs för att återställa standardbeteendet för attributet `hidden`[cite: 2].


* **Regel för stilföreträde**: Sidans yttre stilmall vinner **alltid** över komponentens interna `:host`-regel om båda stylar samma egenskap.
* **`::part(name)`**: Gör det möjligt för sidans yttre CSS att styla ett specifikt element inuti Shadow DOM som har attributet `part="name"`[cite: 2].
* **CSS Custom Properties (variabler)**: Variabler (t.ex. `--badge-color`) ärvs obehindrat tvärs igenom Shadow DOM-gränsen[cite: 2].

---

## 7. Filstruktur och Vite-moduler

Kursens standardstruktur under `src/js/components/<namn>/`:

```text
src/js/components/status-badge/
├── index.js          // Registrerar elementet via customElements.define()
├── README.md         // Dokumentation av API:et
├── status-badge.css  // Stilmall för Shadow DOM
├── status-badge.html // HTML-mall
└── status-badge.js   // Klassen (exporteras utan registrering)

```

### Vite-tillägg för importer

* **`import htmlText from './fil.html?raw'`**: Läser in hela HTML-filens innehåll som en ren textsträng vid kompileringen.
* **`import cssText from './fil.css?inline'`**: Läser in CSS-filens innehåll som en ren textsträng (utan att automatiskt lägga till den på huvudsidan).
* **`new URL('./bilder/avatar.png', import.meta.url)`**: Räknar ut en absolut URL till en resurs relativt modulen, vilket gör komponenten flyttbar mellan olika projekt.

---

Spara denna lathund som referens! Nu kan vi sätta igång med **Uppgift 1** som vi pratade om tidigare:

Skriv grundklassen för `StatusBadge` och fäst en öppen Shadow Root med HTML-strängen `<span class="badge">Online</span>` i dess konstruktor. Klistra in din JavaScript-kod när du är klar!