import React, { useState } from 'react'
import $ from 'jquery'
const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Sending data:', { name, email, password })

    $.ajax({
      url: 'http://localhost:5500/api/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ name, email, password }),
      success: () => {
        localStorage.setItem('userName', name)
        alert('Signup successful 😘!')
        setTimeout(() => {
          window.location.href = '/login'
        }, 200)
      },
      error: (xhr) => {
        const errorMessage = xhr.responseJSON?.message || 'Signup failed'
        setError(errorMessage) // Display the actual error message
        console.error('Error:', errorMessage)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Account</h2>
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
