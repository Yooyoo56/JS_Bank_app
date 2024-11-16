import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/signupLogin.css'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('') // Reset error before submitting

    console.log('Sending login data:', { email, password })

    try {
      // Make a POST request to login
      const response = await axios.post(
        'http://localhost:5500/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      // Check if login is successful
      if (response.status === 200) {
        console.log('Login successful:', response.data.message)

        // Save token to localStorage and navigate to homepage
        const token = response.data.token
        setToken(token)
        localStorage.setItem('token', token)
        navigate('/home')
      }
    } catch (error) {
      // Handle errors and display appropriate message
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMessage)
      console.error('Login error:', errorMessage)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="brand-title">Login</div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="inputs">
            {/* Email Input */}
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Login Button */}
            <button type="submit">Login</button>
          </div>

          {/* Error Message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Link to Signup Page */}
          <br />
          <p className="login-link">
            No account yet?{' '}
            <Link to="/signup" className="linkTitle">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
