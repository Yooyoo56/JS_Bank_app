document.addEventListener('DOMContentLoaded', function () {
  console.log('nouvelle transaction')

  const token = localStorage.getItem('token') // Assurez-vous que le token est dans le localStorage
  // Récupérer l'ID du compte depuis l'URL
  const urlParams = new URLSearchParams(window.location.search)
  const compteId = urlParams.get('compteId') // récupère l'ID du compte

  // Vérifier si compteId est présent
  if (!compteId) {
    console.error("ID du compte non trouvé dans l'URL")
    alert("ID du compte non trouvé dans l'URL")
    return
  }

  // Fonction pour récupérer le seuil
  const fetchSeuil = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/accounts/${compteId}/seuil`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du seuil')
      }
      const data = await response.json()
      if (data && data.seuil !== undefined) {
        // // Vérifier si l'élément DOM existe avant de le modifier
        // const displaySeuil = document.getElementById('display-seuil')
        // displaySeuil.innerText = `Seuil : ${data.seuil} €`
        return data.seuil
      }
      // else {
      //   displaySeuil.innerText = 'Seuil : 0 €'
      //   return 0
      // }
    } catch (error) {
      console.error('Erreur lors de la récupération du seuil:', error)
      alert('Impossible de récupérer le seuil.')
      return 0
    }
  }

  // Fonction pour récupérer le solde actuel
  const fetchCurrentBalance = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/transactions/${compteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des transactions')
      }
      const transactions = await response.json()
      const transactionsList = Array.isArray(transactions)
        ? transactions
        : transactions.transactions || []

      console.log('transactions in fetchcurrentbalance')
      console.log(transactionsList.map((data) => console.log(data)))

      // Récupérer la dernière transaction pour obtenir le solde à jour
      const latestTransaction = transactionsList[0]
      console.table(latestTransaction)
      const currentBalance = latestTransaction
        ? latestTransaction.soldeAprèsTransaction
        : 0

      console.log('Solde actuel dans currentBalance:', currentBalance) // Log du solde actuel
      return currentBalance
    } catch (error) {
      console.error('Erreur lors de la récupération du solde actuel:', error)
      return 0
    }
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
              throw new Error(errorData.message)
            })
          }
          return response.json()
        })
        .then(async () => {
          alert('Transaction ajoutée avec succès!')

          // Récupérer à nouveau le solde et le seuil
          const currentBalance = await fetchCurrentBalance()
          const seuil = await fetchSeuil()

          console.log('Comparaison du solde avec le seuil:')
          console.log('Solde actuel:', currentBalance)
          console.log('Seuil:', seuil)

          if (currentBalance < seuil) {
            alert(`Attention ! Le solde est en dessous du seuil de ${seuil} €`)
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la transaction:", error)
          alert(error)
        })
    })
})
