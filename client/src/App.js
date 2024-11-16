import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import AddCompte from './components/AddCompte'
import Signup from './components/Signup'
import ComptesBancaires from './components/ComptesBancaires'
import Profile from './components/Profile'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Protected Routes */}
        <Route
          path="/accounts"
          element={
            token ? <ComptesBancaires /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add-account"
          element={token ? <AddCompte /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={
            token ? <Profile token={token} /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
