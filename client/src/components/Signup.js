import React, { useState } from 'react'
import $ from 'jquery' // Import jQuery

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Sending data:', { name, email, password })

    // jQuery AJAX request
    $.ajax({
      url: 'http://localhost:5500/api/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ name, email, password }),
      success: (data) => {
        // Handle success
        localStorage.setItem('userName', name) // Store the username in localStorage
        alert('Signup successful 😘!') // Alert the user

        // Redirect to login page after a successful signup
        setTimeout(() => {
          window.location.href = '/login' // Redirect to the login page
        }, 200) // Delay the redirect by 2 seconds to let the alert close
      },
      error: (xhr, status, error) => {
        // Handle error
        const errorMessage = xhr.responseJSON?.message || 'Signup failed'
        setError(errorMessage)
        console.error('Error:', errorMessage)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default Signup
