import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById("root"))

// this is a nit, but the space between render and the opening parenthesis looks weird.
// in general, it's good to have formatting tools like prettier installed that handle
// formatting automatically so you don't have to think about it
root.render (
  <App />
)