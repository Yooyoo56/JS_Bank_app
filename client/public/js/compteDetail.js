document.addEventListener('DOMContentLoaded', function () {
  // Récupérer les transactions depuis localStorage
  const transactions = JSON.parse(localStorage.getItem('transactions')) || []

  // // Vérifier si le tableau contient plus d'un élément (pour éviter des erreurs si le tableau est vide ou n'a qu'un seul élément)
  // if (transactions.length > 1) {
  //   // Supprimer le deuxième élément (index 1)
  //   transactions.splice(1, 1) // Supprime 1 élément à partir de l'index 1
  // }

  // // Enregistrer les transactions mises à jour dans localStorage
  // localStorage.setItem('transactions', JSON.stringify(transactions))

  // // Vérifier que l'élément a été supprimé
  // console.log(transactions) // Affiche le tableau après suppression

  // Sélectionner l'élément où les transactions vont être affichées
  const transactionsContainer = document.getElementById(
    'transactions-container',
  )

  // Effacer le contenu existant (s'il y en a)
  transactionsContainer.innerHTML = ''

  // Vérifier si le tableau de transactions est vide
  if (transactions.length === 0) {
    // Créer un élément de message pour indiquer qu'il n'y a pas de transactions
    const noTransactionMessage = document.createElement('p')
    noTransactionMessage.className = 'text-center text-gray-500 mt-4'
    noTransactionMessage.textContent = 'Aucune transaction pour le moment'

    // Ajouter le message au conteneur
    transactionsContainer.appendChild(noTransactionMessage)
  } else {
    // Si des transactions existent, les afficher
    transactions.forEach((transaction) => {
      // Créer l'élément de carte
      const card = document.createElement('div')
      card.className = 'shadow p-5 rounded mb-4'

      // Ajouter le contenu HTML pour chaque transaction
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

      // Ajouter la carte au conteneur
      transactionsContainer.appendChild(card)
    })
  }
  // Récupérer les éléments du DOM
  const modal = document.getElementById('modal')
  const btnOpenModal = document.getElementById('seuil')
  const btnCloseModal = document.getElementById('close-modal')
  const btnSaveSeuil = document.getElementById('save-seuil')
  const seuilInput = document.getElementById('seuil')
  const displaySeuil = document.getElementById('display-seuil') // Élément où le seuil sera affiché

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
