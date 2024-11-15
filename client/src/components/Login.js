import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate, Link } from 'react-router-dom'
import './signupLogin.css'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5500/api/login', {
        email,
        password,
      })
      const token = response.data.token
      setToken(token)
      localStorage.setItem('token', token)
      navigate('/home') // login success, redirect to homepage
    } catch (error) {
      setMessage(error.response?.data.message || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="brand-title">Login</div>

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

          {/* Display Message (if any) */}
          {/* Error Message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Link to Signup Page */}
          <br></br>
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
