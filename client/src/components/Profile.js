import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './profile.css'

const Profile = ({ token }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setName(response.data.name)
        setEmail(response.data.email)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setMessage(error.response?.data?.message || 'Failed to fetch profile')
      }
    }
    if (token) fetchProfile()
  }, [token])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Assuming userId is included in the token
      const response = await axios.put(
        `http://localhost:5500/api/profile/update`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )

      setMessage(response.data.message || 'Profile updated successfully')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile')
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 id="profileName">Update Profile</h2>
        {/* <h4>Welcome, {name}!</h4> */}
        {message && <p>{message}</p>}
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
