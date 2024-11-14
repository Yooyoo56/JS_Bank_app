import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  return (
    <nav>
      <ul className="flex justify-around items-center m-5">
        <li className="mx-2">
          <Link to="/home">Home</Link>
        </li>
        {token && (
          <>
            <li className="mx-2">
              <Link to="/comptes-bancaires">Comptes Bancaires</Link>
            </li>
            <li className="mx-2">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="mx-2">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
        {!token && (
          <>
            <li className="mx-2">
              <Link to="/login">Login</Link>
            </li>
            <li className="mx-2">
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
