// generateWrappedData.js
// Combines all tier insights and outputs data in format that wrapped can use
const axios = require('axios')

const API_KEY = process.env.API_KEY || 'b42fef91ed39c99f853df5b749a6e6f5'
const BASE_URL = 'http://api.nessieisreal.com'

// Merchant categories mapping (from tier files)
const MERCHANTS = {
  'food and drink': [
    'Starbucks',
    'Blue Bottle Coffee',
    'Local Cafe',
    'Dunkin Donuts',
    'Whole Foods',
    "Trader Joe's",
    'Kroger',
    'Safeway',
    'Chipotle',
    'Thai Palace',
    'Pizza Hut',
    'Sushi Bar',
    "McDonald's",
    'Subway',
    'Panera Bread',
    'Panda Express',
    'Taco Bell',
    'In-N-Out Burger',
    'Local Restaurant',
    'Food Delivery',
  ],
  'gas and transportation': [
    'Shell',
    'Chevron',
    'BP',
    'Exxon',
    'Sunoco',
    'Speedway',
    'Circle K',
    'Uber',
    'Lyft',
    'Parking Garage',
    'Public Transit',
    'Bus Pass',
    'Taxi',
  ],
  shopping: [
    'Amazon',
    'Target',
    'Best Buy',
    'Walmart',
    'Costco',
    'H&M',
    'Nike',
    'Gap',
    'Forever 21',
    'ASOS',
    'Uniqlo',
    'CVS Pharmacy',
    'Walgreens',
    'Dollar Store',
    'HomeGoods',
    'IKEA',
    'Bed Bath & Beyond',
  ],
  entertainment: [
    'Netflix',
    'Spotify',
    'Hulu',
    'Disney+',
    'AMC Theaters',
    'Cinemark',
    'Regal Cinemas',
    'GameStop',
    'Steam',
    'PlayStation Store',
    'Apple Music',
    'YouTube Premium',
    'Peacock',
    'HBO Max',
    'Museum',
    'Concert Venue',
  ],
  utilities: [
    'Electric Company',
    'Water Utility',
    'Internet Provider',
    'Gas Company',
    'Waste Management',
    'Verizon',
    'AT&T',
    'T-Mobile',
  ],
  'health and fitness': [
    'Planet Fitness',
    'Gold Gym',
    'LA Fitness',
    'Equinox',
    'Yoga Studio',
    'CrossFit Box',
    'Peloton',
    'Apple Fitness+',
    'Pharmacy',
    'Doctor Office',
    'Dentist',
    'Eye Doctor',
    'Massage Spa',
    'Hair Salon',
  ],
}

const SUBSCRIPTIONS = [
  'Netflix',
  'Spotify',
  'Disney+',
  'Hulu',
  'Apple Music',
  'YouTube Premium',
  'Peacock',
  'HBO Max',
]

// Create reverse mapping
const merchantToCategory = {}
for (const [category, merchants] of Object.entries(MERCHANTS)) {
  for (const merchant of merchants) {
    merchantToCategory[merchant.toLowerCase()] = category
  }
}

async function apiCall(method, endpoint) {
  try {
    const url = `${BASE_URL}${endpoint}?key=${API_KEY}`
    const response = await axios({ method, url })
    return response.data
  } catch (error) {
    throw error
  }
}

function getMerchantCategory(merchantName) {
  if (!merchantName) return 'other'
  const lowerName = merchantName.toLowerCase()
  return merchantToCategory[lowerName] || 'other'
}

function isSubscription(merchantName) {
  return SUBSCRIPTIONS.some((sub) =>
    merchantName.toLowerCase().includes(sub.toLowerCase()),
  )
}

// Format category name for display (e.g., "food and drink" -> "Food & Drink")
function formatCategoryName(category) {
  return category
    .split(' ')
    .filter(word => word !== 'and')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ')
}


async function generateWrappedData(accountId) {
  try {
    // Fetch all data in parallel
    const [
      depositsResponse,
      purchasesResponse,
      withdrawalsResponse,
      billsResponse,
      transfersResponse,
    ] = await Promise.all([
      apiCall('GET', `/accounts/${accountId}/deposits`),
      apiCall('GET', `/accounts/${accountId}/purchases`),
      apiCall('GET', `/accounts/${accountId}/withdrawals`),
      apiCall('GET', `/accounts/${accountId}/bills`),
      apiCall('GET', `/accounts/${accountId}/transfers`),
    ])

    const deposits = Array.isArray(depositsResponse) ? depositsResponse : []
    const purchases = Array.isArray(purchasesResponse) ? purchasesResponse : []
    const withdrawals = Array.isArray(withdrawalsResponse)
      ? withdrawalsResponse
      : []
    const bills = Array.isArray(billsResponse) ? billsResponse : []
    const transfers = Array.isArray(transfersResponse) ? transfersResponse : []

    // ============================================
    // CARD 2: TOTAL EARNED
    // ============================================
    const totalEarned = deposits.reduce((sum, deposit) => {
      return sum + (deposit.amount || 0)
    }, 0)
    const depositCount = deposits.length

    // ============================================
    // CARD 4: DISCRETIONARY SPENDING
    // ============================================
    const totalPurchases = purchases.reduce((sum, purchase) => {
      return sum + (purchase.amount || 0)
    }, 0)
    const totalWithdrawals = withdrawals.reduce((sum, withdrawal) => {
      return sum + (withdrawal.amount || 0)
    }, 0)
    const totalSpent = totalPurchases + totalWithdrawals
    const purchaseCount = purchases.length

    // ============================================
    // CARD 6: TOP CATEGORY
    // ============================================
    const spendingByCategory = {}
    for (const purchase of purchases) {
      const amount = purchase.amount || 0
      const merchantName = purchase.description
        ? purchase.description.replace('Purchase at ', '')
        : 'Unknown'
      const category = getMerchantCategory(merchantName)

      if (!spendingByCategory[category]) {
        spendingByCategory[category] = 0
      }
      spendingByCategory[category] += amount
    }

    const topCategory = Object.entries(spendingByCategory).sort(
      (a, b) => b[1] - a[1],
    )[0]

    const topCategoryName = topCategory ? formatCategoryName(topCategory[0]) : 'Unknown'
    const topCategoryAmount = topCategory ? topCategory[1] : 0

    // ============================================
    // CARD 7: PIE CHART - ALL CATEGORIES
    // ============================================
    // Get top 6 categories for pie chart
    const sortedCategories = Object.entries(spendingByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)

    const categoryColors = [
      '#ff9f43', // Food & Drink
      '#4ecdc4', // Gas & Transport
      '#ff6b9d', // Shopping
      '#a78bfa', // Entertainment
      '#ffd93d', // Bills & Utilities
      '#94a3b8', // Other
    ]

    const pieChartCategories = sortedCategories.map(([category, amount], index) => {
      const percent = totalPurchases > 0 ? (amount / totalPurchases) * 100 : 0
      return {
        name: formatCategoryName(category),
        color: categoryColors[index] || categoryColors[5],
        percent: Math.round(percent),
        amount: parseFloat(amount.toFixed(2)),
      }
    })

    // ============================================
    // CARD 8: BIGGEST PURCHASE
    // ============================================
    let biggestPurchase = null
    let biggestAmount = 0

    for (const purchase of purchases) {
      if ((purchase.amount || 0) > biggestAmount) {
        biggestAmount = purchase.amount
        biggestPurchase = purchase
      }
    }

    const biggestMerchant = biggestPurchase
      ? biggestPurchase.description.replace('Purchase at ', '')
      : 'Unknown'
    const biggestPurchaseDate = biggestPurchase
      ? new Date(biggestPurchase.purchase_date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Unknown'

    // ============================================
    // CARD 9: TOTAL TRANSACTIONS
    // ============================================
    const totalTransactions = deposits.length + purchases.length + withdrawals.length
    const transactionsPerDay = (totalTransactions / 365).toFixed(1)

    // ============================================
    // CARD 11: MOST VISITED PLACE
    // ============================================
    const merchantStats = {}
    for (const purchase of purchases) {
      const merchantName = purchase.description
        ? purchase.description.replace('Purchase at ', '')
        : 'Unknown'

      if (!merchantStats[merchantName]) {
        merchantStats[merchantName] = {
          visits: 0,
          totalSpent: 0,
        }
      }

      merchantStats[merchantName].visits += 1
      merchantStats[merchantName].totalSpent += purchase.amount || 0
    }

    const topMerchant = Object.entries(merchantStats).sort(
      (a, b) => b[1].visits - a[1].visits,
    )[0]

    const topMerchantName = topMerchant ? topMerchant[0] : 'Unknown'
    const topMerchantVisits = topMerchant ? topMerchant[1].visits : 0
    const topMerchantAvg =
      topMerchant && topMerchant[1].visits > 0
        ? topMerchant[1].totalSpent / topMerchant[1].visits
        : 0

    // ============================================
    // CARD 12: CASH VS CARDS
    // ============================================
    const cardPercentage =
      totalSpent > 0 ? ((totalPurchases / totalSpent) * 100).toFixed(1) : 0
    const cashPercentage =
      totalSpent > 0 ? ((totalWithdrawals / totalSpent) * 100).toFixed(1) : 0

    // ============================================
    // CARD 13: WEEKEND VS WEEKDAY (Daily Breakdown)
    // ============================================
    let weekendSpending = 0
    let weekdaySpending = 0

    const daySpending = [0, 0, 0, 0, 0, 0, 0] // Sun-Sat
    for (const purchase of purchases) {
      const date = new Date(purchase.purchase_date)
      const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday
      const amount = purchase.amount || 0

      daySpending[dayOfWeek] += amount

      if (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 5) {
        // Friday, Saturday, Sunday
        weekendSpending += amount
      } else {
        weekdaySpending += amount
      }
    }

    const weekendPercentage =
      totalPurchases > 0
        ? ((weekendSpending / totalPurchases) * 100).toFixed(1)
        : 0
    const weekdayPercentage =
      totalPurchases > 0
        ? ((weekdaySpending / totalPurchases) * 100).toFixed(1)
        : 0

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const busiestDayIndex = daySpending.indexOf(Math.max(...daySpending))
    const busiestDay = dayNames[busiestDayIndex]

    // Calculate daily percentages
    const dailyBreakdown = dayNames.map((dayName, index) => {
      const dayTotal = daySpending[index]
      const dayPercentage = totalPurchases > 0 ? (dayTotal / totalPurchases) * 100 : 0
      return {
        day: dayName,
        percentage: parseFloat(dayPercentage.toFixed(1)),
        amount: parseFloat(dayTotal.toFixed(2)),
      }
    })

    // ============================================
    // CARD 14: MONTHLY SPENDING
    // ============================================
    const monthlySpending = Array(12).fill(0)
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    for (const purchase of purchases) {
      const date = new Date(purchase.purchase_date)
      const month = date.getMonth()
      monthlySpending[month] += purchase.amount || 0
    }

    const monthlyData = monthlySpending.map((amount, index) => ({
      month: monthNames[index],
      amount: Math.round(amount),
    }))

    // ============================================
    // CARD 15: SUBSCRIPTIONS
    // ============================================
    let totalSubscriptionSpending = 0
    const subscriptionList = []

    for (const purchase of purchases) {
      const merchantName = purchase.description
        ? purchase.description.replace('Purchase at ', '')
        : 'Unknown'

      if (isSubscription(merchantName)) {
        totalSubscriptionSpending += purchase.amount || 0

        // Add to list if not already there
        if (!subscriptionList.includes(merchantName)) {
          subscriptionList.push(merchantName)
        }
      }
    }

    const monthlySubscriptionSpending = totalSubscriptionSpending / 12
    const annualSubscriptionSpending = totalSubscriptionSpending

    // ============================================
    // CARD 16: SAVINGS OPPORTUNITY
    // ============================================
    // Use top category for savings opportunity
    const savingsOpportunityCategory = topCategoryName
    const savingsOpportunityAmount = topCategoryAmount

    // ============================================
    // BUILD OUTPUT OBJECT
    // ============================================
    const wrappedData = {
      // Card 2: Total Earned
      totalEarned: {
        amount: parseFloat(totalEarned.toFixed(2)),
        depositCount: depositCount,
      },

      // Card 4: Discretionary Spending
      discretionarySpending: {
        total: parseFloat(totalSpent.toFixed(2)),
        purchaseCount: purchaseCount,
      },

      // Card 6: Top Category
      topCategory: {
        name: topCategoryName,
        amount: parseFloat(topCategoryAmount.toFixed(2)),
      },

      // Card 7: Pie Chart
      categoryBreakdown: pieChartCategories,

      // Card 8: Biggest Purchase
      biggestPurchase: {
        amount: parseFloat(biggestAmount.toFixed(2)),
        merchant: biggestMerchant,
        date: biggestPurchaseDate,
      },

      // Card 9: Total Transactions
      totalTransactions: {
        total: totalTransactions,
        perDay: parseFloat(transactionsPerDay),
      },

      // Card 11: Most Visited Place
      mostVisitedPlace: {
        name: topMerchantName,
        visits: topMerchantVisits,
        avgPerVisit: parseFloat(topMerchantAvg.toFixed(2)),
      },

      // Card 12: Cash vs Cards
      cashVsCards: {
        cardPercentage: parseFloat(cardPercentage),
        cashPercentage: parseFloat(cashPercentage),
        cardTotal: parseFloat(totalPurchases.toFixed(2)),
        cashTotal: parseFloat(totalWithdrawals.toFixed(2)),
      },

      // Card 13: Weekend vs Weekday (Daily Breakdown)
      weekendVsWeekday: {
        weekdayPercentage: parseFloat(weekdayPercentage),
        weekendPercentage: parseFloat(weekendPercentage),
        busiestDay: busiestDay,
        dailyBreakdown: dailyBreakdown,
      },

      // Card 14: Monthly Spending
      monthlySpending: monthlyData,

      // Card 15: Subscriptions
      subscriptions: {
        services: subscriptionList,
        monthlyTotal: parseFloat(monthlySubscriptionSpending.toFixed(2)),
        annualTotal: parseFloat(annualSubscriptionSpending.toFixed(2)),
      },

      // Card 16: Savings Opportunity
      savingsOpportunity: {
        category: savingsOpportunityCategory,
        currentSpending: parseFloat(savingsOpportunityAmount.toFixed(2)),
      },
    }

    return wrappedData
  } catch (error) {
    console.error('❌ Error generating wrapped data:', error.message)
    throw error
  }
}

module.exports = { generateWrappedData }
