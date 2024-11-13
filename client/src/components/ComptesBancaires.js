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
    <div className="w-11/12 mx-auto flex flex-col justify-center">
      <h2 className="text-center font-bold mb-7 text-4xl">
        Mes Comptes Bancaires
      </h2>

      <div className="shadow flex justify-center align-center p-5 mb-12">
        <h3 className="font-semibold">Solde total : 3 000 €</h3>
      </div>

      <ul className="mx-3">
        {comptes.map((compte) => (
          <li key={compte._id} className="shadow p-5 rounded">
            <div className="flex justify-between">
              <p>Nom du compte :</p>
              <p>{compte.nomCompte}</p>
            </div>
            <div className="flex justify-between">
              <p>Solde :</p>
              <p>{compte.solde} €</p>
            </div>
            {/* <strong className="font-medium">Nom du compte :</strong>{' '}
            {compte.nomCompte} <strong className="font-medium">Solde :</strong>{' '}
            {compte.solde} € */}
            <a className="underline" href="/compteDetail.html">
              Voir plus
            </a>
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
