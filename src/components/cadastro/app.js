import { aplicarPreferencias } from "./auth.js"

const prefs = JSON.parse(localStorage.getItem("preferencias"))

if (prefs) {
  aplicarPreferencias(prefs)
}