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
        console.log(response.data)

        // Exemple : récupérer le userId du premier compte
        const userId = response.data[0]?.userId
        console.log('userId ', userId)

        localStorage.setItem('userId', userId)
        setComptes(response.data)

        // Calculer le totalSolde après la récupération des comptes
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

  // // Fonction pour appliquer une transaction sur un compte
  // const appliquerTransaction = (compteId, typeTransaction, montant) => {
  //   setComptes((prevComptes) => {
  //     const comptesMisesAJour = prevComptes.map((compte) => {
  //       if (compte._id === compteId) {
  //         let nouveauSolde = compte.solde
  //         if (typeTransaction === 'Dépôt') {
  //           nouveauSolde += montant // Ajouter le montant pour un dépôt
  //         } else if (typeTransaction === 'Retrait') {
  //           nouveauSolde -= montant // Soustraire le montant pour un retrait
  //         }
  //         return { ...compte, solde: nouveauSolde }
  //       }
  //       return compte
  //     })
  //     // Calculer le totalSolde après la mise à jour du solde
  //     setTotalSolde(calculerTotalSolde(comptesMisesAJour))
  //     return comptesMisesAJour
  //   })
  // }

  // // Fonction pour récupérer les transactions d'un compte
  // const fetchTransactionsForCompte = async (compteId) => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //     const response = await axios.get(
  //       `http://localhost:5500/api/transactions/${compteId}`,
  //       config,
  //     )

  //     // Appliquer les transactions sur les comptes (mettre à jour les soldes)
  //     response.data.forEach((transaction) => {
  //       appliquerTransaction(compteId, transaction.type, transaction.montant)
  //     })
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des transactions:', error)
  //   }
  // }

  if (loading) return <p>Chargement...</p>

  if (error) return <p>{error}</p>

  return (
    <div className="w-11/12 mx-auto flex flex-col justify-center">
      <h2 className="text-center font-bold mb-7 text-4xl">
        Mes Comptes Bancaires
      </h2>

      <div className="shadow flex justify-center items-center p-5 mb-12">
        <h3 className="font-semibold">
          Solde total : {totalSolde.toFixed(2)} €
        </h3>
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

            <a
              href={`compteDetail.html?compteId=${compte._id}`}
              className="underline"
            >
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
