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
    alert('You must be logged in to access this page.')
    return
  }

  let seuil = 0 // Variable pour stocker le seuil en mémoire

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
        seuil = data.seuil // Mettre à jour le seuil en mémoire
        displaySeuil.innerText = `Threshold : ${seuil} €`
      } else {
        seuil = 0 // Valeur par défaut en cas d'absence de seuil
        displaySeuil.innerText = 'Threshold : 0 €'
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du seuil:', error)
      alert('Impossible de récupérer le seuil.')
    }
  }

  const fetchTransactions = async (filterDays = null) => {
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

      // Appliquer le filtre par date si filterDays est défini
      let filteredTransactions = transactionsList
      if (filterDays !== null) {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - filterDays)
        console.log('cutoffDate: ', cutoffDate)
        filteredTransactions = transactionsList.filter((transaction) => {
          const transactionDate = new Date(transaction.date)
          return transactionDate >= cutoffDate
        })
        console.log('filteredTransactions: ', filteredTransactions)
      }

      // Affichage des transactions
      transactionsContainer.innerHTML = ''
      if (filteredTransactions.length === 0) {
        const noTransactionMessage = document.createElement('p')
        noTransactionMessage.className = 'text-center text-gray-500 mt-4'
        noTransactionMessage.textContent =
          'Aucune transaction pour la période sélectionnée'
        transactionsContainer.appendChild(noTransactionMessage)
      } else {
        filteredTransactions.forEach((transaction) => {
          const card = document.createElement('div')
          card.className = 'shadow p-5 rounded mb-4'
          card.innerHTML = `
            <div class="flex justify-between">
              <p class="px-3">Type :</p>
              <p class="px-3">${transaction.type}</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Amount :</p>
              <p class="px-3">${transaction.montant} €</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Date :</p>
              <p class="px-3">${new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Balance after transaction :</p>
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

  document.getElementById('filter-7days').addEventListener('click', () => {
    fetchTransactions(7) // Transactions des 7 derniers jours
  })

  document.getElementById('filter-30days').addEventListener('click', () => {
    fetchTransactions(30) // Transactions des 30 derniers jours
  })

  document.getElementById('filter-90days').addEventListener('click', () => {
    fetchTransactions(90) // Transactions des 90 derniers jours
  })

  // Fonction pour mettre à jour le seuil sur le serveur
  const updateSeuilOnServer = async (newSeuil) => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/accounts/${compteId}/seuil`,
        {
          method: 'PUT', // Utilisation de PUT pour mettre à jour le seuil
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seuil: newSeuil }), // Envoi de la nouvelle valeur de seuil
        },
      )

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du seuil')
      }

      const data = await response.json()
      // console.log(data)
      if (data && data.compte.seuil !== undefined) {
        seuil = data.compte.seuil // Mise à jour du seuil en mémoire
        alert('Threshold updated successfully')
        updateSeuilDisplay() // Mettre à jour l'affichage du seuil
        console.log('seuil success')
      } else {
        alert('Threshold update failed.')
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du seuil:', error)
      alert('Cannot update threshold.')
    }
  }

  // Gestion des seuils (modal)
  const modal = document.getElementById('modal')
  const btnOpenModal = document.getElementById('seuil-btn')
  const btnCloseModal = document.getElementById('close-modal')
  const btnSaveSeuil = document.getElementById('save-seuil')
  const seuilInput = document.getElementById('seuil-input')
  const displaySeuil = document.getElementById('display-seuil')

  // Ouvrir la modal
  btnOpenModal.onclick = function () {
    modal.classList.remove('hidden') // Afficher la modal
  }

  // Fermer la modal
  btnCloseModal.onclick = function () {
    modal.classList.add('hidden') // Cacher la modal
  }

  // Mettre à jour l'affichage du seuil
  const updateSeuilDisplay = () => {
    displaySeuil.innerText = `Threshold : ${seuil} €` // Mettre à jour l'affichage avec la valeur en mémoire
  }

  // Enregistrer le seuil dans la mémoire et sur le serveur
  btnSaveSeuil.onclick = function () {
    const seuilValue = seuilInput.value
    // console.log('seuilValue: ', seuilValue)

    if (seuilValue && !isNaN(seuilValue)) {
      seuil = seuilValue // Sauvegarder la valeur en mémoire
      // alert('Seuil enregistré : ' + seuil)

      // Appeler la fonction pour mettre à jour le seuil sur le serveur
      updateSeuilOnServer(seuil)
      updateSeuilDisplay()

      // Fermer la modal
      modal.classList.add('hidden')
    } else {
      alert('Please enter a valid threshold.')
    }
  }

  // Si un seuil est déjà défini dans la modal, le pré-remplir
  if (seuil) {
    seuilInput.value = seuil
  }

  // Initialiser les données
  await fetchTransactions()
  await fetchSeuil()
  updateSeuilDisplay()
})

async function downloadTransactions() {
  try {
    //console.log("TOKEN "+ localStorage.getItem("token") );
    const response = await fetch(
      `http://localhost:5500/api/transactions/download/${compteId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to download transactions')
    }
    console.log('response :' + response)

    const blob = await response.blob() // Convert response to a Blob
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'all_transactions.csv' // Set the file name
    document.body.appendChild(a)
    a.click()
    a.remove()
  } catch (error) {
    console.error('Error downloading transactions:', error)
    alert('Error downloading transactions. Please try again.')
  }
}

const downloadButton = document.getElementById('download-csv')
downloadButton.addEventListener('click', downloadTransactions)
