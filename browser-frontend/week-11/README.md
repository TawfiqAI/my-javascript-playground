# README — Vecka 11: Händelser, Händelseloopen & Webbkomponenter

Den här guiden sammanfattar hela teorin, arkitekturmodellerna och en fullständig lathund över alla centrala API:er, metoder och händelser för kursvecka 11.

---

## 1. Huvudtråden & Händelseloopen (*Under huven*)

JavaScript i webbläsaren körs på en **enda tråd** (huvudtråden). Samma tråd hanterar din kod, HTML-tolkning, stilberäkning, layout och utritning av pixlar.

```text
       [ Call Stack ]                      [ Microtask Queue (VIP) ]
 ┌─────────────────────────┐               ┌────────────────────────┐
 │ square()                │               │ Promise .then()        │
 │ sumOfSquares()          │               │ queueMicrotask()       │
 │ main / script           │               └───────────┬────────────┘
 └─────────────────────────┘                           │
              ▲                                        │ (Töms ALLTID först!)
              │                                        ▼
              └────────────── [ Event Loop ] ◄─────────┴─ [ Task Queue (Macrotask) ]
                                                            ┌──────────────────────┐
                                                            │ click, keydown       │
                                                            │ setTimeout callbacks │
                                                            │ postMessage (worker) │
                                                            └──────────────────────┘

```

### Mekanismens fyra komponenter

* **Call Stack (Anropsstacken):** En LIFO-struktur (*Last In, First Out*). Funktionsanrop lägger en ram (*stack frame*) på toppen; när funktionen returnerar poppas den bort.
* **Task Queue (Macrotasks):** Kön för vanliga händelser (klick, tangenttryckningar), utgångna timers (`setTimeout`, `setInterval`) och worker-meddelanden.
* **Microtask Queue (VIP-kön):** Kö med högre prioritet för färdiga Promises (`.then()`, `await`). Töms helt till noll varje gång Call Stacken blir tom innan nästa vanliga task eller utritning tillåts.
* **Event Loop:** Övervakar oavbrutet Call Stacken. När stacken är helt tom töms först hela Microtask-kön. Därefter ritas sidan om vid behov, och till sist plockas den äldsta tasken ur Task Queue.

### Varför sidan fryser

* **Run to Completion:** En funktion på stacken körs alltid klart utan att avbrytas.
* **Blockering:** Körs synkron kod som tar lång tid (t.ex. en tung loop) töms aldrig stacken. Event loopen kan inte hämta nya klick eller uppdatera gränssnittet. Lösningen för tungt arbete är en **Web Worker**.

---

## 2. Händelser i DOM:en (*Event Flow & Delegering*)

När en händelse inträffar rör den sig genom DOM-trädet i tre faser:

```text
 1. CAPTURE-FASEN (Nedåt)     window ──► document ──► <ul> ──► <li>
                                                                 │
 2. MÅLFASEN (Target)                                      [ <button> ]
                                                                 │
 3. BUBBLE-FASEN (Uppåt)      window ◄── document ◄── <ul> ◄── <li>

```

### `event.target` kontra `event.currentTarget`

* **`event.target`:** Elementet där händelsen faktiskt inträffade (det innersta elementet muspekaren träffade).
* **`event.currentTarget`:** Elementet vars lyssnare som körs just nu (där `addEventListener` är fäst).

### Delegering (*Event Delegation*)

Istället för att fästa 100 lyssnare på enskilda barn fästs en enda lyssnare på föräldern. För att träffa rätt element oavsett inre ikoner eller text används `event.target.closest('selector')`.

---

## 3. Händelser i Webbkomponenter (*Kursens mönster*)

Komponentarkitekturen bygger på regeln: **Data ner via attribut/metoder — Händelser upp via events**.

```text
 [ Light DOM: app.js ]
   komponent.addEventListener('status-change', (e) => { ... })
          ▲
          │  CustomEvent ({ bubbles: true, composed: true, detail: { ... } })
   ═══════╪═══════════════════════════════════════  ◄── Shadow DOM-gräns
 [ Shadow DOM: komponentens inre ]
   this.dispatchEvent(...)

```

* **Symmetrisk livscykel:** Skapa `new AbortController()` och koppla lyssnare i `connectedCallback()`. Avbryt och städa med `controller.abort()` i `disconnectedCallback()` för att undvika minnesläckor och zombie-kod.


* **Shadow DOM-gränsen:** En händelse inifrån Shadow DOM når inte det yttre dokumentet om den inte skickas med `composed: true`.

---

## 4. Fullständig Lathund: Metoder, Funktioner & Egenskaper

### A. Händelseregistrering & Livscykel (`EventTarget`)

* **`target.addEventListener(type, listener, options)`**
* Registrerar en lyssnarfunktion för en specifik händelsetyp.
* `options`-objekt:
* `{ capture: true }`: Körs under capture-fasen (på vägen ned).
* `{ once: true }`: Tas bort automatiskt efter första anropet.
* `{ signal: abortSignal }`: Kopplar lyssnaren till en `AbortSignal`.




* **`target.removeEventListener(type, listener)`**
* Tar bort en lyssnare. Kräver exakt samma funktionsreferens i minnet som lades till.


* **`target.dispatchEvent(event)`**
* Utlöser en händelse programmatiskt på elementet.



### B. Minneshantering & Avregistrering

* **`new AbortController()`**
* Instansierar en kontrollant för att avbryta asynkrona processer och ta bort lyssnare.




* **`controller.signal`**
* `AbortSignal`-instansen som skickas med som option `{ signal }` till `addEventListener`.




* **`controller.abort()`**
* Signalerar avbrott och kopplar bort samtliga lyssnare fästa vid signalen i ett enda anrop.





### C. Händelseobjektet (`Event` & `CustomEvent`)

* **`event.type`**
* Namnet på händelsen (t.ex. `'click'`, `'submit'`).


* **`event.target`**
* Elementet där händelsen ursprungligen inträffade.


* **`event.currentTarget`**
* Elementet som lyssnaren sitter på just nu (samma som `this` i en vanlig funktion).


* **`event.preventDefault()`**
* Avbryter webbläsarens förvalda standardhandling (formulärladdning, navigering av länkar) utan att stoppa spridningen i trädet.




* **`event.stopPropagation()`**
* Hindrar händelsen från att vandra vidare till nästa nod i trädet (stoppar capture/bubbling).




* **`new CustomEvent(type, { bubbles, composed, detail })`**
* Skapar en anpassad händelse:
* `bubbles: true`: Tillåter händelsen att bubbla uppåt bland föräldrar.


* `composed: true`: Tillåter händelsen att korsa gränsen ut ur Shadow DOM till Light DOM.


* `detail: { ... }`: Det anpassade dataobjektet som mottagaren läser via `event.detail`.







### D. DOM-traversering & Delegering

* **`element.closest(selector)`**
* Söker från elementet självt och uppåt bland förfäder efter närmaste element som matchar CSS-selektorn (ger `null` om ingen matchar).





### E. Timers & Trådhantering

* **`setTimeout(callback, delayMs)`**
* Lägger callback-funktionen i Task Queue efter minst angivet antal millisekunder. Returnerar ett timer-ID.


* **`clearTimeout(id)`**
* Avbryter en schemalagd `setTimeout`.


* **`setInterval(callback, intervalMs)`**
* Schemalägger upprepad exekvering i Task Queue med ett tidsintervall. Returnerar ett intervall-ID.


* **`clearInterval(id)`**
* Stoppar ett pågående intervall permanent.




* **`new Worker(url, options)`**
* Startar en Web Worker i en egen bakgrundstråd parallellt med huvudtråden.


* **`worker.postMessage(data)`**
* Skickar data mellan huvudtråden och en Web Worker.


* **`worker.addEventListener('message', callback)`**
* Tar emot meddelanden som skickats via `postMessage`.



---

## 5. Kursens Standardmönster (Komponentkod)

```javascript
export class ActionBox extends HTMLElement {
  #button
  #controller

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <button id="btn"><slot>Klicka</slot></button>
    `
    this.#button = this.shadowRoot.querySelector('#btn')
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller

    // Pilfunktion bevarar this till komponenten
    this.#button.addEventListener('click', () => this.#handleClick(), { signal })
  }

  disconnectedCallback() {
    // Rensar bort lyssnaren och motverkar minnesläckor
    this.#controller.abort()
  }

  #handleClick() {
    this.dispatchEvent(new CustomEvent('action-triggered', {
      bubbles: true,
      composed: true,
      detail: { timestamp: Date.now() }
    }))
  }
}

customElements.define('action-box', ActionBox)

```