import { fetchTransactions } from './plaid'
import { generateWrappedData } from './generateWrappedData'

// Supported time ranges for Wrapped
export type WrappedRange = 'ytd' | '1y' | '6m' | '1m'

function getDateRangeForWrapped(range: WrappedRange): {
  startDate: string
  endDate: string
  label: string
} {
  const now = new Date()
  const endDate = now.toISOString().split('T')[0]

  let start = new Date(now)
  let label: string

  switch (range) {
    case '1y': {
      start = new Date(now)
      start.setFullYear(now.getFullYear() - 1)
      label = 'Last 12 months'
      break
    }
    case '6m': {
      start = new Date(now)
      start.setMonth(now.getMonth() - 6)
      label = 'Last 6 months'
      break
    }
    case '1m': {
      start = new Date(now)
      start.setMonth(now.getMonth() - 1)
      label = 'Last 30 days'
      break
    }
    case 'ytd':
    default: {
      start = new Date(now.getFullYear(), 0, 1)
      label = 'Year to date'
      break
    }
  }

  const startDate = start.toISOString().split('T')[0]
  return { startDate, endDate, label }
}

/**
 * Fetches transactions from Plaid and generates wrapped data.
 * Plaid: amount > 0 = money out (debit), amount < 0 = money in (credit)
 */
export async function getWrappedDataFromPlaid(userId: string, range: WrappedRange = 'ytd') {
  const { startDate, endDate, label } = getDateRangeForWrapped(range)

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

  const core = await generateWrappedData({ deposits, purchases, withdrawals })
  return {
    ...core,
    periodLabel: label,
    periodRange: { startDate, endDate },
  }
}
