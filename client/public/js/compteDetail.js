document.addEventListener('DOMContentLoaded', function () {
  console.log('nouvelle transaction')

  // Récupérer l'ID du compte depuis l'URL
  const urlParams = new URLSearchParams(window.location.search)
  const compteId = urlParams.get('compteId') // récupère l'ID du compte

  if (!compteId) {
    console.error("ID du compte non trouvé dans l'URL")
    return
  }

  const transactionsContainer = document.getElementById(
    'transactions-container',
  )
  const token = localStorage.getItem('token') // Assurez-vous que le token est dans le localStorage

  if (!token) {
    console.error('Token manquant')
    return
  }

  // Fonction pour récupérer les transactions depuis le backend
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
      // Ajouter un log pour afficher la réponse du serveur
      const transactions = await response.json()
      console.log('Réponse du serveur:', transactions)
      const transactionsList = transactions.transactions // Utilise un tableau vide si la clé 'transactions' n'existe pas

      // Vérifiez si la réponse est bien un tableau avant d'essayer d'utiliser forEach
      if (!Array.isArray(transactionsList)) {
        console.error('Les transactions ne sont pas un tableau')
        return
      }

      console.log('Transactions pour le compte:', transactions)
      // Vider le conteneur et afficher les transactions récupérées
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
              <p class="px-3">Date :</p>
              <p class="px-3">${transaction.date}</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Montant :</p>
              <p class="px-3">${transaction.montant} €</p>
            </div>
            <div class="flex justify-between">
              <p class="px-3">Solde :</p>
              <p class="px-3">${transaction.solde} €</p>
            </div>
          `
          transactionsContainer.appendChild(card)
        })
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error)
    }
  }

  // Appel initial pour afficher les transactions
  fetchTransactions()

  // Gestion des seuils (modal)
  const modal = document.getElementById('modal')
  const btnOpenModal = document.getElementById('seuil')
  const btnCloseModal = document.getElementById('close-modal')
  const btnSaveSeuil = document.getElementById('save-seuil')
  const seuilInput = document.getElementById('seuil')
  const displaySeuil = document.getElementById('display-seuil')

  // Ouvrir la modal
  btnOpenModal.onclick = function () {
    modal.classList.remove('hidden') // Afficher la modal
  }

  // Fermer la modal
  btnCloseModal.onclick = function () {
    modal.classList.add('hidden') // Cacher la modal
  }

  const updateSeuilDisplay = () => {
    const savedSeuil = localStorage.getItem('seuil')
    if (savedSeuil) {
      displaySeuil.innerText = `${savedSeuil} ` // Mettre à jour le texte avec le seuil
    } else {
      displaySeuil.innerText = '0' // Afficher un message si aucun seuil n'est défini
    }
  }

  updateSeuilDisplay()
  let seuil = localStorage.getItem('seuil')

  // Si le seuil n'existe pas, définissez-le à 0 et enregistrez-le dans le localStorage
  if (seuil === null) {
    seuil = 0
    localStorage.setItem('seuil', seuil)
  }

  // Enregistrer le seuil dans le localStorage
  btnSaveSeuil.onclick = function () {
    const seuilValue = seuilInput.value

    if (seuilValue && !isNaN(seuilValue)) {
      // Sauvegarder la valeur dans le localStorage
      localStorage.setItem('seuil', seuilValue)

      // Vous pouvez ajouter un message de confirmation ici, si nécessaire
      alert('Seuil enregistré : ' + seuilValue)

      // Fermer la modal
      modal.classList.add('hidden')

      updateSeuilDisplay() // Mettre à jour l'affichage du seuil
    } else {
      // Si la valeur n'est pas valide, afficher un message d'erreur
      alert('Veuillez entrer un seuil valide.')
    }
  }

  // Si un seuil est déjà défini dans le localStorage, le pré-remplir
  const savedSeuil = localStorage.getItem('seuil')
  if (savedSeuil) {
    seuilInput.value = savedSeuil
  }
})
