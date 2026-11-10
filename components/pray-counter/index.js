import { PrayCounter } from "./pray-counter.js";

if (!customElements.get('pray-counter')) {
    customElements.define('pray-counter', PrayCounter)
}