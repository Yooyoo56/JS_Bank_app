document.addEventListener('DOMContentLoaded', function () {
  console.log('nouvelle transaction')

  // Récupérer l'ID du compte depuis l'URL
  const urlParams = new URLSearchParams(window.location.search)
  const compteId = urlParams.get('compteId') // récupère l'ID du compte

  // Vérifier si compteId est présent
  if (!compteId) {
    console.error("ID du compte non trouvé dans l'URL")
    alert("ID du compte non trouvé dans l'URL")
    return
  }

  // Gestion de l'événement de soumission du formulaire de transaction
  document
    .querySelector('#transactionSubmit')
    .addEventListener('click', function (e) {
      e.preventDefault()

      // Récupérer le type de transaction (Dépôt ou Retrait)
      const typeTransaction =
        document.querySelector("input[name='options']:checked").value ===
        'option-1'
          ? 'Dépôt'
          : 'Retrait'
      const montant = parseFloat(
        document.querySelector("input[type='number']").value,
      )
      const token = localStorage.getItem('token')

      // Validation de l'entrée
      if (!typeTransaction || isNaN(montant)) {
        alert('Veuillez remplir tous les champs.')
        return
      }

      // Effectuer la requête pour ajouter la transaction
      fetch('http://localhost:5500/api/transactions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          compteId, // Utilise l'ID du compte extrait de l'URL
          type: typeTransaction,
          montant,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || 'Une erreur est survenue')
            })
          }
          return response.json()
        })
        .then(() => {
          alert('Transaction ajoutée avec succès!')
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la transaction:", error)
          alert("Erreur lors de l'ajout de la transaction.")
        })
    })
})
