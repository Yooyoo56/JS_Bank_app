import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ComptesBancaires = () => {
  const [comptes, setComptes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        // Récupérer le token du localStorage
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        // Assurez-vous d'utiliser le bon port (celui du backend)
        const response = await axios.get(
          'http://localhost:5500/api/accounts/',
          config,
        )
        setComptes(response.data)
      } catch (error) {
        setError('Erreur lors de la récupération des comptes')
        console.error('Erreur:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchComptes()
  }, [])

  if (loading) return <p>Chargement...</p>

  if (error) return <p>{error}</p>

  return (
    <div>
      <h2 className="text-center">Mes Comptes Bancaires</h2>
      <ul>
        {comptes.map((compte) => (
          <li key={compte._id}>
            <strong>Nom du compte :</strong> {compte.nomCompte} -{' '}
            <strong>Solde :</strong> {compte.solde} €
          </li>
        ))}
      </ul>

      <div className="absolute bottom-12 right-12">
        <Link className="p-3 bg-sky-600 text-white rounded" to="/add-account">
          Créer un compte
        </Link>
      </div>
    </div>
  )
}

export default ComptesBancaires
