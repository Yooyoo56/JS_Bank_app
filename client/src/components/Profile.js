// USING LOCALSTORAGE!!!
// import React, { useEffect, useState } from 'react'

// function Profile({ userId }) {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//   })
//   const [message, setMessage] = useState('')

//   // Fetch the profile when the component mounts
//   useEffect(() => {
//     console.log('localStorage ===> ' + localStorage.getItem('email'))
//     const userId = localStorage.getItem('userId')
//     const token = localStorage.getItem('token') // Get token from localStorage
//     console.log('token ===>' + token)

//     const fetchProfile = async () => {
//       if (!token) {
//         console.error('No token found')
//         return
//       }

//       try {
//         const response = await fetch(`http://localhost:5500/api/profile/`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (!response.ok) {
//           // If the response status is not OK (not 2xx)
//           const errorData = await response.text() // Get the raw response text (could be HTML)
//           console.error('Error fetching profile:', errorData)
//           return
//         }

//         const data = await response.json() // Parse as JSON only if the response is successful
//         console.log('Fetched Profile Data:', data)

//         if (data.name && data.email) {
//           setProfile(data)
//           localStorage.setItem('userName', data.name)
//           localStorage.setItem('email', data.email)
//         } else {
//           console.error('Profile data missing name or email')
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error)
//       }
//     }

//     fetchProfile()
//   }, [userId]) // Add `userId` to the dependency array

//   // // Update profile function
//   // const handleUpdate = async (e) => {
//   //   e.preventDefault()
//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:5500/api/profile/${userId}/update`,
//   //       {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify(profile),
//   //       },
//   //     )
//   //     console.log('body===> ' + JSON.stringify(profile))
//   //     const result = await response.json()

//   //     // Debugging logs
//   //     console.log('Update Response:', result)

//   //     if (result.success) {
//   //       setMessage('Profile updated successfully!')
//   //       // Save the updated profile to localStorage
//   //       localStorage.setItem('userName', profile.name)
//   //       localStorage.setItem('email', profile.email)
//   //     } else {
//   //       setMessage('Failed to update profile')
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating profile:', error)
//   //     setMessage('Error updating profile')
//   //   }
//   // }

//   // Retrieve name and email from localStorage
//   const storedUserName = localStorage.getItem('userName')
//   const storedEmail = localStorage.getItem('email')

//   // Debugging logs
//   console.log('LocalStorage UserName:', storedUserName)
//   console.log('LocalStorage Email:', storedEmail)

//   return (
//     <div>
//       <h2>User Profile</h2>

//       {/* Display current profile from localStorage */}
//       <h3>Current Profile:</h3>
//       <p>Username: {storedUserName}</p>
//       <p>Email: {storedEmail}</p>
//     </div>
//   )
// }

// export default Profile

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
      const response = await axios.put(
        'http://localhost:5500/api/profile',
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

  // //   // Debugging logs
  // console.log('LocalStorage UserName:', storedUserName)
  // console.log('LocalStorage Email:', storedEmail)

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Update Profile</h2>
        {name && <h2>Welcome, {name}!</h2>}
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
