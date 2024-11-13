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
})
