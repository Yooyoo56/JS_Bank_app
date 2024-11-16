import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import $ from 'jquery'
import '../styles/signupLogin.css'

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
    <div className="auth-page">
      <div className="container">
        <div className="brand-title">Sign up</div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="example@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Min 8 characters long"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Sign Up</button>
          </div>

          {/* Error Message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* Link to Login Page */}
          <br></br>
          <p className="login-link">
            Already have an account?{' '}
            <Link to="/login" className="linkTitle">
              {' '}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
