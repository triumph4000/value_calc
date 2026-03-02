export interface SectionAInputs {
  totalCustomers: number
  totalMRR: number
  revenueFromUCaaS: number
  revenueFromNetwork: number
  revenueFromCCaaS: number
  revenueFromCloud: number
  revenueFromSecurity: number
}

export interface SectionBInputs {
  penetrationUCaaS: number
  penetrationSDWAN: number
  penetrationCybersecurity: number
  penetrationManagedFirewall: number
  penetrationSASE: number
  penetrationCCaaS: number
  penetrationBackupDR: number
  penetrationCloud: number
  penetrationAI: number
  penetrationBPO: number
}

export interface SectionCInputs {
  avgUCaaSSpend: number
  avgNetworkSpend: number
  avgSecuritySpend: number
  avgCCaaSSpend: number
  avgCloudSpend: number
  avgContractTermMonths: number
  percentUnderContract: number
}

export interface SectionDInputs {
  tracksContractDates: boolean
  runsQBRs: boolean
  bundlesMultiProduct: boolean
  hasDedicatedAM: boolean
}

export interface CalculatorInputs {
  sectionA: SectionAInputs
  sectionB: SectionBInputs
  sectionC: SectionCInputs
  sectionD: SectionDInputs
}

export interface ProductWhitespace {
  productKey: string
  productLabel: string
  currentPenetration: number
  benchmarkRate: number
  whitespaceCustomers: number
  hiddenMRR: number
  avgSpend: number
}

export interface CalculatorResults {
  totalHiddenMRR: number
  threeYearValue: number
  annualCommission: number
  exitValuationLift: number
  currentMonetizationRate: number
  whitespaceByProduct: ProductWhitespace[]
  topThreeWhitespace: ProductWhitespace[]
  operationalMaturityScore: number
  operationalMaturityLabel: string
}

export interface LeadSubmission {
  email: string
  firstName?: string
  company?: string
  submittedAt: string
  inputs: CalculatorInputs
  results: CalculatorResults
}
