document.addEventListener('DOMContentLoaded', async function () {
  console.log('compte detail')

  const transactionsContainer = document.getElementById(
    'transactions-container',
  )
  const token = localStorage.getItem('token')
  const urlParams = new URLSearchParams(window.location.search)
  const compteId = urlParams.get('compteId')

  if (!compteId) {
    console.error("Aucun compteId trouvé dans l'URL")
  }

  if (!token) {
    console.error('Token manquant')
    alert('Vous devez être connecté pour accéder à cette page.')
    return
  }

  const displaySeuil = document.getElementById('display-seuil')

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
        displaySeuil.innerText = `Seuil : ${data.seuil} €`
        return data.seuil
      } else {
        displaySeuil.innerText = 'Seuil : 0 €'
        return 0
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du seuil:', error)
      alert('Impossible de récupérer le seuil.')
      return 0
    }
  }

  // Fonction pour récupérer les transactions et solde
  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/transactions/${compteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
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

      const latestTransaction = transactionsList[transactionsList.length - 1]
      const currentBalance = latestTransaction
        ? latestTransaction.soldeAprèsTransaction
        : 0

      transactionsContainer.innerHTML = ''
      if (transactionsList.length === 0) {
        const noTransactionMessage = document.createElement('p')
        noTransactionMessage.className = 'text-center text-gray-500 mt-4'
        noTransactionMessage.textContent = 'Aucune transaction pour ce compte'
        transactionsContainer.appendChild(noTransactionMessage)
      } else {
        transactionsList.forEach((transaction) => {
          const card = document.createElement('div')
          card.className = 'shadow p-5 rounded mb-4'
          card.innerHTML = `
            <div class="flex justify-between">
              <p class="px-3">Type :</p>
              <p class="px-3">${transaction.type}</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Montant :</p>
              <p class="px-3">${transaction.montant} €</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Date :</p>
              <p class="px-3">${new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Solde après transaction :</p>
              <p class="px-3">${transaction.soldeAprèsTransaction} €</p>
            </div>
          `
          transactionsContainer.appendChild(card)
        })
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error)
      alert('Impossible de récupérer les transactions.')
    }
  }

  // Initialiser les données
  await fetchTransactions()
  await fetchSeuil()
})
