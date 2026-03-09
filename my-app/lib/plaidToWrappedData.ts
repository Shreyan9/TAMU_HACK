import { fetchTransactions } from './plaid'
import { generateWrappedData } from './generateWrappedData'

/**
 * Fetches transactions from Plaid and generates wrapped data.
 * Plaid: amount > 0 = money out (debit), amount < 0 = money in (credit)
 */
export async function getWrappedDataFromPlaid(userId: string) {
  const now = new Date()
  const endDate = now.toISOString().split('T')[0]
  const startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]

  const transactions = await fetchTransactions(userId, startDate, endDate)

  const deposits: { amount: number; description: string; purchase_date: string }[] = []
  const purchases: { amount: number; description: string; purchase_date: string }[] = []
  const withdrawals: { amount: number; description: string; purchase_date: string }[] = []

  for (const t of transactions) {
    if (t.pending) continue

    const amount = Math.abs(t.amount ?? 0)
    const description = t.merchant_name || t.name || 'Unknown'
    const purchase_date = t.date || ''

    // Plaid: positive amount = money out (debit), negative = money in (credit)
    if ((t.amount ?? 0) > 0) {
      const isWithdrawal =
        t.personal_finance_category?.primary === 'BANK_FEES' ||
        (Array.isArray(t.category) && t.category.some((c: string) => /atm|cash|withdrawal/i.test(c)))
      if (isWithdrawal) {
        withdrawals.push({ amount, description, purchase_date })
      } else {
        purchases.push({ amount, description, purchase_date })
      }
    } else {
      deposits.push({ amount, description, purchase_date })
    }
  }

  return generateWrappedData({ deposits, purchases, withdrawals })
}
