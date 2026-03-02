import type { CalculatorInputs, CalculatorResults, ProductWhitespace } from './types'
import { PRODUCTS, MATURITY_LABELS, MATURITY_DESCRIPTIONS } from './constants'

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const { sectionA, sectionB, sectionC, sectionD } = inputs
  const totalCustomers = sectionA.totalCustomers || 0
  const currentMRR = sectionA.totalMRR || 0

  const whitespaceByProduct: ProductWhitespace[] = PRODUCTS.map((product) => {
    const currentPenetration = (sectionB[product.key] ?? 0) / 100
    const benchmarkRate = product.benchmarkRate
    const gap = Math.max(0, benchmarkRate - currentPenetration)
    const whitespaceCustomers = totalCustomers * gap

    const avgSpend =
      product.spendOverrideKey && sectionC[product.spendOverrideKey]
        ? (sectionC[product.spendOverrideKey] as number)
        : product.defaultSpend

    const hiddenMRR = whitespaceCustomers * avgSpend

    return {
      productKey: product.key,
      productLabel: product.label,
      currentPenetration: currentPenetration * 100,
      benchmarkRate: benchmarkRate * 100,
      whitespaceCustomers: Math.round(whitespaceCustomers),
      hiddenMRR,
      avgSpend,
    }
  })

  const totalHiddenMRR = whitespaceByProduct.reduce((sum, p) => sum + p.hiddenMRR, 0)

  const contractMonths = sectionC.avgContractTermMonths || 36
  const threeYearValue = totalHiddenMRR * contractMonths

  const annualCommission = totalHiddenMRR * 12 * 0.15

  // EBITDA at 40% margin × 12 months × 5x multiple
  const ebitdaContribution = totalHiddenMRR * 0.4
  const exitValuationLift = ebitdaContribution * 12 * 5

  // Monetization rate: current MRR as % of (current + hidden)
  const totalPotentialMRR = currentMRR + totalHiddenMRR
  const currentMonetizationRate =
    totalPotentialMRR > 0 ? (currentMRR / totalPotentialMRR) * 100 : 0

  const topThreeWhitespace = [...whitespaceByProduct]
    .sort((a, b) => b.hiddenMRR - a.hiddenMRR)
    .slice(0, 3)

  const maturityScore = [
    sectionD.tracksContractDates,
    sectionD.runsQBRs,
    sectionD.bundlesMultiProduct,
    sectionD.hasDedicatedAM,
  ].filter(Boolean).length

  return {
    totalHiddenMRR,
    threeYearValue,
    annualCommission,
    exitValuationLift,
    currentMonetizationRate,
    whitespaceByProduct,
    topThreeWhitespace,
    operationalMaturityScore: maturityScore,
    operationalMaturityLabel: MATURITY_LABELS[maturityScore],
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatLargeCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return formatCurrency(value)
}

export function formatPercent(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`
}

export function getMaturityDescription(score: number): string {
  return MATURITY_DESCRIPTIONS[score] ?? MATURITY_DESCRIPTIONS[0]
}
