// generateWrappedData.js
// Generates wrapped-style insights from normalized transaction data (Plaid, etc.)

/** @typedef {{ amount: number; description: string; purchase_date: string }} NormalizedTransaction */

/**
 * @param {{
 *   deposits: NormalizedTransaction[];
 *   purchases: NormalizedTransaction[];
 *   withdrawals: NormalizedTransaction[];
 * }} transactionData
 * @returns {Promise<object>}
 */
async function generateWrappedData(transactionData) {
  const { deposits = [], purchases = [], withdrawals = [] } = transactionData

  try {
    const totalEarned = deposits.reduce((sum, d) => sum + (d.amount || 0), 0)
    const depositCount = deposits.length

    const totalPurchases = purchases.reduce((sum, p) => sum + (p.amount || 0), 0)
    const totalWithdrawals = withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0)
    const totalSpent = totalPurchases + totalWithdrawals
    const purchaseCount = purchases.length

    // CARD 6: TOP CATEGORY
    const spendingByCategory = {}
    for (const purchase of purchases) {
      const amount = purchase.amount || 0
      const merchantName = cleanMerchantName(purchase.description)
      const category = getMerchantCategory(merchantName)

      if (!spendingByCategory[category]) spendingByCategory[category] = 0
      spendingByCategory[category] += amount
    }

    const topCategory = Object.entries(spendingByCategory).sort((a, b) => b[1] - a[1])[0]
    const topCategoryName = topCategory ? formatCategoryName(topCategory[0]) : 'Unknown'
    const topCategoryAmount = topCategory ? topCategory[1] : 0

    // CARD 7: PIE CHART
    const sortedCategories = Object.entries(spendingByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)

    const categoryColors = ['#ff9f43', '#4ecdc4', '#ff6b9d', '#a78bfa', '#ffd93d', '#94a3b8']
    const pieChartCategories = sortedCategories.map(([category, amount], i) => ({
      name: formatCategoryName(category),
      color: categoryColors[i] || categoryColors[5],
      percent: totalPurchases > 0 ? Math.round((amount / totalPurchases) * 100) : 0,
      amount: parseFloat(amount.toFixed(2)),
    }))

    // CARD 8: BIGGEST PURCHASE
    let biggestPurchase = null
    let biggestAmount = 0
    for (const purchase of purchases) {
      if ((purchase.amount || 0) > biggestAmount) {
        biggestAmount = purchase.amount
        biggestPurchase = purchase
      }
    }
    const biggestMerchant = biggestPurchase ? cleanMerchantName(biggestPurchase.description) : 'Unknown'
    const biggestPurchaseDate = biggestPurchase
      ? new Date(biggestPurchase.purchase_date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Unknown'

    // CARD 9: TOTAL TRANSACTIONS
    const totalTransactions = deposits.length + purchases.length + withdrawals.length
    const transactionsPerDay = (totalTransactions / 365).toFixed(1)

    // CARD 11: MOST VISITED PLACE
    const merchantStats = {}
    for (const purchase of purchases) {
      const name = cleanMerchantName(purchase.description)
      if (!merchantStats[name]) merchantStats[name] = { visits: 0, totalSpent: 0 }
      merchantStats[name].visits += 1
      merchantStats[name].totalSpent += purchase.amount || 0
    }
    const topMerchant = Object.entries(merchantStats).sort((a, b) => b[1].visits - a[1].visits)[0]
    const topMerchantName = topMerchant ? topMerchant[0] : 'Unknown'
    const topMerchantVisits = topMerchant ? topMerchant[1].visits : 0
    const topMerchantAvg =
      topMerchant && topMerchant[1].visits > 0
        ? topMerchant[1].totalSpent / topMerchant[1].visits
        : 0

    // CARD 12: CASH VS CARDS
    const cardPercentage = totalSpent > 0 ? ((totalPurchases / totalSpent) * 100).toFixed(1) : 0
    const cashPercentage = totalSpent > 0 ? ((totalWithdrawals / totalSpent) * 100).toFixed(1) : 0

    // CARD 13: WEEKEND VS WEEKDAY
    let weekendSpending = 0
    let weekdaySpending = 0
    const daySpending = [0, 0, 0, 0, 0, 0, 0]
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    for (const purchase of purchases) {
      const date = new Date(purchase.purchase_date)
      const dayOfWeek = date.getDay()
      const amount = purchase.amount || 0
      daySpending[dayOfWeek] += amount
      if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
        weekendSpending += amount
      } else {
        weekdaySpending += amount
      }
    }

    const weekendPercentage =
      totalPurchases > 0 ? ((weekendSpending / totalPurchases) * 100).toFixed(1) : 0
    const weekdayPercentage =
      totalPurchases > 0 ? ((weekdaySpending / totalPurchases) * 100).toFixed(1) : 0
    const busiestDay = dayNames[daySpending.indexOf(Math.max(...daySpending))]
    const dailyBreakdown = dayNames.map((dayName, i) => ({
      day: dayName,
      percentage: parseFloat(
        (totalPurchases > 0 ? (daySpending[i] / totalPurchases) * 100 : 0).toFixed(1)
      ),
      amount: parseFloat(daySpending[i].toFixed(2)),
    }))

    // CARD 14: MONTHLY SPENDING
    const monthlySpending = Array(12).fill(0)
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ]
    for (const purchase of purchases) {
      const month = new Date(purchase.purchase_date).getMonth()
      monthlySpending[month] += purchase.amount || 0
    }
    const monthlyData = monthlySpending.map((amount, i) => ({
      month: monthNames[i],
      amount: Math.round(amount),
    }))

    // CARD 15: SUBSCRIPTIONS
    let totalSubscriptionSpending = 0
    const subscriptionList = []
    for (const purchase of purchases) {
      const name = cleanMerchantName(purchase.description)
      if (isSubscription(name)) {
        totalSubscriptionSpending += purchase.amount || 0
        if (!subscriptionList.includes(name)) subscriptionList.push(name)
      }
    }
    const monthlySubscriptionSpending = totalSubscriptionSpending / 12

    return {
      totalEarned: { amount: parseFloat(totalEarned.toFixed(2)), depositCount },
      discretionarySpending: { total: parseFloat(totalSpent.toFixed(2)), purchaseCount },
      topCategory: { name: topCategoryName, amount: parseFloat(topCategoryAmount.toFixed(2)) },
      categoryBreakdown: pieChartCategories,
      biggestPurchase: {
        amount: parseFloat(biggestAmount.toFixed(2)),
        merchant: biggestMerchant,
        date: biggestPurchaseDate,
      },
      totalTransactions: { total: totalTransactions, perDay: parseFloat(transactionsPerDay) },
      mostVisitedPlace: {
        name: topMerchantName,
        visits: topMerchantVisits,
        avgPerVisit: parseFloat(topMerchantAvg.toFixed(2)),
      },
      cashVsCards: {
        cardPercentage: parseFloat(cardPercentage),
        cashPercentage: parseFloat(cashPercentage),
        cardTotal: parseFloat(totalPurchases.toFixed(2)),
        cashTotal: parseFloat(totalWithdrawals.toFixed(2)),
      },
      weekendVsWeekday: {
        weekdayPercentage: parseFloat(weekdayPercentage),
        weekendPercentage: parseFloat(weekendPercentage),
        busiestDay,
        dailyBreakdown,
      },
      monthlySpending: monthlyData,
      subscriptions: {
        services: subscriptionList,
        monthlyTotal: parseFloat(monthlySubscriptionSpending.toFixed(2)),
        annualTotal: parseFloat(totalSubscriptionSpending.toFixed(2)),
      },
      savingsOpportunity: {
        category: topCategoryName,
        currentSpending: parseFloat(topCategoryAmount.toFixed(2)),
      },
    }
  } catch (error) {
    console.error('❌ Error generating wrapped data:', error.message)
    throw error
  }
}

function cleanMerchantName(desc) {
  if (!desc) return 'Unknown'
  return desc.replace(/^Purchase at /i, '').trim() || 'Unknown'
}

const MERCHANTS = {
  'food and drink': [
    'Starbucks', 'Blue Bottle', 'Cafe', 'Dunkin', 'Whole Foods', "Trader Joe's", 'Kroger',
    'Safeway', 'Chipotle', 'Thai', 'Pizza', 'Sushi', "McDonald's", 'Subway', 'Panera', 'Panda',
    'Taco Bell', 'In-N-Out', 'Restaurant', 'Food Delivery', 'Uber Eats', 'DoorDash', 'Grubhub',
  ],
  'gas and transportation': [
    'Shell', 'Chevron', 'BP', 'Exxon', 'Sunoco', 'Speedway', 'Circle K', 'Uber', 'Lyft',
    'Parking', 'Transit', 'Bus', 'Taxi', 'Gas',
  ],
  shopping: [
    'Amazon', 'Target', 'Best Buy', 'Walmart', 'Costco', 'H&M', 'Nike', 'Gap', 'ASOS', 'Uniqlo',
    'CVS', 'Walgreens', 'Dollar', 'HomeGoods', 'IKEA', 'Bed Bath',
  ],
  entertainment: [
    'Netflix', 'Spotify', 'Hulu', 'Disney+', 'AMC', 'Cinemark', 'Regal', 'GameStop', 'Steam',
    'PlayStation', 'Apple Music', 'YouTube Premium', 'Peacock', 'HBO Max', 'Museum', 'Concert',
  ],
  utilities: [
    'Electric', 'Water', 'Internet', 'Gas Company', 'Waste', 'Verizon', 'AT&T', 'T-Mobile',
  ],
  'health and fitness': [
    'Planet Fitness', 'Gold Gym', 'LA Fitness', 'Equinox', 'Yoga', 'CrossFit', 'Peloton',
    'Pharmacy', 'Doctor', 'Dentist', 'Eye Doctor', 'Massage', 'Hair Salon',
  ],
}

const merchantToCategory = {}
for (const [cat, list] of Object.entries(MERCHANTS)) {
  for (const m of list) {
    merchantToCategory[m.toLowerCase()] = cat
  }
}

// Plaid personal_finance_category.primary → our category
const plaidCategoryMap = {
  FOOD_AND_DRINK: 'food and drink',
  RESTAURANTS: 'food and drink',
  GAS: 'gas and transportation',
  TRANSPORTATION: 'gas and transportation',
  TRAVEL: 'gas and transportation',
  SHOPPING: 'shopping',
  ENTERTAINMENT: 'entertainment',
  RENT_AND_UTILITIES: 'utilities',
  UTILITIES: 'utilities',
  HEALTHCARE: 'health and fitness',
  FITNESS: 'health and fitness',
}

function getMerchantCategory(merchantName) {
  if (!merchantName) return 'other'
  const lower = merchantName.toLowerCase()
  for (const [merchant, category] of Object.entries(merchantToCategory)) {
    if (lower.includes(merchant)) return category
  }
  return 'other'
}

function isSubscription(name) {
  const subs = ['Netflix', 'Spotify', 'Disney+', 'Hulu', 'Apple Music', 'YouTube Premium', 'Peacock', 'HBO Max']
  return subs.some((s) => name.toLowerCase().includes(s.toLowerCase()))
}

function formatCategoryName(category) {
  return category
    .split(' ')
    .filter((w) => w !== 'and')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' & ')
}

module.exports = { generateWrappedData }
