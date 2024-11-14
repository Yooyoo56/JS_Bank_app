document.addEventListener('DOMContentLoaded', function () {
  console.log('nouvelle transaction')

  // Gestion de l'événement de soumission
  document
    .querySelector('#transactionSubmit')
    .addEventListener('click', function (e) {
      e.preventDefault()
      const typeTransaction =
        document.querySelector("input[name='options']:checked").value ===
        'option-1'
          ? 'Dépôt'
          : 'Retrait'
      const montant = parseFloat(
        document.querySelector("input[type='number']").value,
      )
      const token = localStorage.getItem('token')

      if (!typeTransaction || !montant) {
        alert('Veuillez remplir tous les champs.')
        return
      }

      // Récupérer les comptes avant de faire la transaction
      fetch('http://localhost:5500/api/accounts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || 'Une erreur est survenue')
            })
          }
          return response.json()
        })
        .then((data) => {
          console.log(`data: ${data}`)
          // Vérifie si des comptes existent
          if (data && data.length > 0) {
            const compteId = data[0]._id // Utilise le premier compte de la liste, ou change cette logique selon tes besoins
            console.log('Compte ID:', compteId)

            // Effectuer la transaction seulement après avoir récupéré le compteId
            fetch('http://localhost:5500/api/transactions', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                compteId, // On utilise le compteId récupéré ici
                type: typeTransaction,
                montant,
              }),
            })
              .then((response) => response.json())
              .then(() => {
                alert('Transaction ajoutée avec succès!')
              })
              .catch((error) => {
                console.error(
                  "Erreur lors de l'ajout de la transaction:",
                  error,
                )
                alert("Erreur lors de l'ajout de la transaction.")
              })
          } else {
            console.error('Aucun compte trouvé pour cet utilisateur')
            alert('Aucun compte trouvé.')
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des comptes:', error)
          alert('Erreur lors de la récupération des comptes.')
        })
    })
})
