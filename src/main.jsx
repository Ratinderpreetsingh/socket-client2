import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Store>

    <App />
  </Store>
  </>,
)
