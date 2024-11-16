import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ComptesBancaires = () => {
  const [comptes, setComptes] = useState([]) // Liste des comptes
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [totalSolde, setTotalSolde] = useState(0) // Total des soldes

  // Fonction pour calculer le total des soldes
  const calculerTotalSolde = (comptes) => {
    return comptes.reduce((acc, compte) => acc + parseFloat(compte.solde), 0)
  }

  // Récupérer les comptes au chargement
  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(
          'http://localhost:5500/api/accounts/',
          config,
        )
        setComptes(response.data)
        setTotalSolde(calculerTotalSolde(response.data))
      } catch (error) {
        setError('Erreur lors de la récupération des comptes')
        console.error('Erreur:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchComptes()
  }, [])

  // Fonction pour supprimer un compte bancaire
  const supprimerCompte = async (compteId) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this account? This action is irreversible and will result in the loss of the associated transaction history.',
    )

    if (!confirmation) return

    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.delete(
        `http://localhost:5500/api/accounts/delete/${compteId}`,
        config,
      )

      if (response.status === 200) {
        const { soldeTotal } = response.data
        // Mettre à jour la liste des comptes et le solde total
        const comptesRestants = comptes.filter(
          (compte) => compte._id !== compteId,
        )
        setComptes(comptesRestants)
        setTotalSolde(soldeTotal)
        alert('Bank account successfully deleted.')
      } else {
        alert(`Erreur : ${response.data.message}`)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du compte :', error)
      alert('An error occurred. Please try again.')
    }
  }

  if (loading) return <p>Loading...</p>

  if (error) return <p>{error}</p>

  return (
    <div className="w-11/12 mx-auto flex flex-col justify-center">
      <h2 className="text-center font-bold mb-7 text-4xl">My accounts</h2>

      <div className="shadow flex justify-center items-center p-5 mb-12">
        <h3 className="font-semibold">
          Total balance: {totalSolde.toFixed(2)} €
        </h3>
      </div>

      <ul className="mx-3">
        {comptes.map((compte) => (
          <li key={compte._id} className="shadow p-5 rounded">
            <div>
              <p>{compte.nomCompte}</p>
            </div>
            <div className="flex justify-between">
              <p>Balance:</p>
              <p>{compte.solde} €</p>
            </div>

            <div className="flex items-center justify-between">
              <a
                href={`compteDetail.html?compteId=${compte._id}`}
                className="underline text-black pl-0"
              >
                More
              </a>

              <button
                className="text-red-600"
                onClick={() => supprimerCompte(compte._id)}
              >
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-12 right-12">
        <Link className="p-3 bg-sky-600 text-white rounded" to="/add-account">
          Create an account
        </Link>
      </div>
    </div>
  )
}

export default ComptesBancaires
