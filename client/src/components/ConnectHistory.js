import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/connectHistory.css'

const ConnectiHistory = () => {
  const [history, setHistory] = useState([])
  const [userName, setUserName] = useState('') // Store user's name
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistoryAndUserName = async () => {
      try {
        const token = localStorage.getItem('token') // Get token from localStorage

        // Fetch user's profile information to get their name
        const userResponse = await axios.get(
          'http://localhost:5500/api/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        // Set the user's name
        setUserName(userResponse.data.name)

        // Fetch connection history
        const historyResponse = await axios.get(
          'http://localhost:5500/api/history',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
          },
        )

        setHistory(historyResponse.data) // Store connection history
      } catch (err) {
        setError('Error fetching connection history or user information.')
      } finally {
        setLoading(false)
      }
    }

    fetchHistoryAndUserName()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="connection-history">
      <h2>{userName}'s Connection History</h2> {/* Display user name here */}
      {history.length === 0 ? (
        <p>No connection history found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: entry.isSuspicious ? '#ffcccc' : '#ffffff',
                  }}
                >
                  <td>{new Date(entry.date).toLocaleString()}</td>
                  <td>{entry.ip}</td>
                  <td>{entry.location}</td>
                  <td>
                    {entry.isSuspicious ? (
                      <span style={{ color: 'red' }}>Suspicious</span>
                    ) : (
                      <span style={{ color: 'green' }}>Normal</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ConnectiHistory
