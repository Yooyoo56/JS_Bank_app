// api.js
export const fetchSeuil = async (compteId, token) => {
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
    return data && data.seuil !== undefined ? data.seuil : 0
  } catch (error) {
    console.error('Erreur lors de la récupération du seuil:', error)
    return 0
  }
}

export const fetchCurrentBalance = async (compteId, token) => {
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
    return latestTransaction ? latestTransaction.soldeAprèsTransaction : 0
  } catch (error) {
    console.error('Erreur lors de la récupération du solde actuel :', error)
    return 0
  }
}
