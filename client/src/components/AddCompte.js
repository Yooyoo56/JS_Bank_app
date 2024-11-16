import React, { useState } from 'react'

const AddCompte = () => {
  const [accountName, setAccountName] = useState('')
  const [accountType, setAccountType] = useState('Courant')

  const handleSubmit = async (e) => {
    e.preventDefault() // Empêche le rechargement de la page lors de la soumission

    const accountData = {
      name: localStorage.getItem('userName')!=null ?localStorage.getItem('userName') :"null",
      nomCompte: accountName, // Exemple de nom de compte
      typeCompte: accountType,
    }

    // Vérifier si le token est présent dans le localStorage
    const token = localStorage.getItem('token')
    console.log('Token:', token) // Vérification du token

    if (!token) {
      alert("Le token d'authentification est manquant.")
      return
    }

    try {
      console.log("newAccount"+JSON.stringify(accountData));
      const response = await fetch(
        'http://localhost:5500/api/accounts/add-account',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(accountData),
        },
      )
      console.log(response);
      if (!response.ok) {
        throw new Error('Erreur lors de la création du compte bancaire')
      }

      const data = await response.json() // Parser la réponse JSON
      // Afficher une alerte avec la réponse du backend
      alert(data.message)
      // // Affiche le message d'alerte
      // alert('le compte a bien été créé 😘!')

      // Réinitialise le formulaire
      setAccountName('')
      setAccountType('')
    } catch (error) {
      console.error("Erreur lors de l'envoi des données : ", error)
      alert("Erreur lors de l'envoi des données")
    }
  }

  return (
    <div>
      <h1 className="text-center font-bold mb-7 text-4xl">Créer un compte</h1>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center mb-6 mx-2">
          <div className="w-1/3">
            <label
              className="block text-gray-500 font-bold text-right mb-1 pr-4"
              htmlFor="name"
            >
              Nom du compte
            </label>
          </div>
          <div className="w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500"
              id="name"
              type="text"
              placeholder="Nom du compte"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label
              className="block text-gray-500 font-bold text-right mb-1 pr-4"
              htmlFor="email"
            >
              Type de compte
            </label>
          </div>
          <div className="flex w-2/3">
            <div className="flex items-center mb-4 mx-2">
              <input
                id="epargne"
                type="radio"
                name="options"
                value="Épargne"
                checked={accountType === 'Épargne'}
                onChange={(e) => setAccountType(e.target.value)}
                className="form-radio h-5 w-5 text-sky-600"
              />
              <label
                htmlFor="epargne"
                className="ml-2 block text-sm leading-5 text-gray-900"
              >
                Épargne
              </label>
            </div>
            <div className="flex items-center mb-4 mx-2">
              <input
                id="courant"
                type="radio"
                name="options"
                value="Courant"
                checked={accountType === 'Courant'}
                onChange={(e) => setAccountType(e.target.value)}
                className="form-radio h-5 w-5 text-sky-600"
              />
              <label
                htmlFor="courant"
                className="ml-2 block text-sm leading-5 text-gray-900"
              >
                Courant
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="shadow bg-sky-600 text-white hover:bg-sky-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded"
            type="submit"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCompte
