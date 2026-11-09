import { StatusBadge } from './StatusBadge.js'

if (!customElements.get('status-badge')) {
    customElements.define('status-badge', StatusBadge)
}