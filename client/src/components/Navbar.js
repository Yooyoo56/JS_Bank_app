import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navBar.css'

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {token && (
          <>
            <li>
              <Link to="/accounts">Accounts</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
            <li>
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
