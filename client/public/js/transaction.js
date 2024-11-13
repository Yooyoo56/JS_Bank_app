console.log('Transactions')
// Vérifie si un solde est déjà stocké dans localStorage, sinon initialise à 1000
let solde = parseFloat(localStorage.getItem('solde')) || 1000
localStorage.setItem('solde', solde) // Enregistre le solde initial dans localStorag
document
  .querySelector('#transactionSubmit')
  .addEventListener('click', function () {
    // Récupération des valeurs du formulaire
    const typeTransaction =
      document.querySelector("input[name='options']:checked").value ===
      'option-1'
        ? 'Dépôt'
        : 'Retrait'
    const date = document.getElementById('name').value
    const montant = document.querySelector("input[type='number']").value

    if (!typeTransaction || !date || !montant) {
      alert('Veuillez remplir tous les champs.')
      return
    }

    // Récupération du solde actuel depuis localStorage
    let solde = parseFloat(localStorage.getItem('solde')) || 1000

    // Mise à jour du solde en fonction du type de transaction
    if (typeTransaction === 'Dépôt') {
      solde += parseFloat(montant)
    } else if (typeTransaction === 'Retrait') {
      solde -= parseFloat(montant)
    }

    // Création d'un objet pour la transaction
    const transaction = {
      type: typeTransaction,
      date: date,
      montant: montant,
      solde: solde, // Utilise le solde mis à jour
    }

    // Récupération des transactions existantes depuis localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || []

    // Ajout de la nouvelle transaction
    transactions.push(transaction)

    // Mise à jour de localStorage avec le nouveau tableau de transactions
    localStorage.setItem('transactions', JSON.stringify(transactions))

    // Message de confirmation
    alert('Transaction enregistrée avec succès !')
  })
