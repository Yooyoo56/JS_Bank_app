import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.css'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter here

ReactDOM.render(
  <BrowserRouter>
    {' '}
    {/* Wrap the whole App in BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)
