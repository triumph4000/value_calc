import type { SectionBInputs, SectionCInputs } from './types'

export interface ProductConfig {
  key: keyof SectionBInputs
  label: string
  shortLabel: string
  benchmarkRate: number // 0 to 1
  defaultSpend: number // monthly $ per customer
  spendOverrideKey: keyof SectionCInputs | null
  description: string
}

export const PRODUCTS: ProductConfig[] = [
  {
    key: 'penetrationUCaaS',
    label: 'UCaaS',
    shortLabel: 'UCaaS',
    benchmarkRate: 0.55,
    defaultSpend: 450,
    spendOverrideKey: 'avgUCaaSSpend',
    description: 'Unified Communications as a Service',
  },
  {
    key: 'penetrationSDWAN',
    label: 'SD-WAN',
    shortLabel: 'SD-WAN',
    benchmarkRate: 0.45,
    defaultSpend: 800,
    spendOverrideKey: 'avgNetworkSpend',
    description: 'Software-Defined Wide Area Network',
  },
  {
    key: 'penetrationCybersecurity',
    label: 'Cybersecurity',
    shortLabel: 'CyberSec',
    benchmarkRate: 0.60,
    defaultSpend: 600,
    spendOverrideKey: 'avgSecuritySpend',
    description: 'Managed cybersecurity services',
  },
  {
    key: 'penetrationManagedFirewall',
    label: 'Managed Firewall',
    shortLabel: 'Firewall',
    benchmarkRate: 0.50,
    defaultSpend: 350,
    spendOverrideKey: null,
    description: 'Managed firewall and perimeter security',
  },
  {
    key: 'penetrationSASE',
    label: 'SASE',
    shortLabel: 'SASE',
    benchmarkRate: 0.35,
    defaultSpend: 700,
    spendOverrideKey: null,
    description: 'Secure Access Service Edge',
  },
  {
    key: 'penetrationCCaaS',
    label: 'CCaaS / CX',
    shortLabel: 'CCaaS',
    benchmarkRate: 0.30,
    defaultSpend: 900,
    spendOverrideKey: 'avgCCaaSSpend',
    description: 'Contact Center as a Service / Customer Experience',
  },
  {
    key: 'penetrationBackupDR',
    label: 'Backup / DR',
    shortLabel: 'Backup',
    benchmarkRate: 0.65,
    defaultSpend: 300,
    spendOverrideKey: null,
    description: 'Backup and Disaster Recovery',
  },
  {
    key: 'penetrationCloud',
    label: 'Cloud (IaaS / Colo)',
    shortLabel: 'Cloud',
    benchmarkRate: 0.40,
    defaultSpend: 1200,
    spendOverrideKey: 'avgCloudSpend',
    description: 'Cloud infrastructure and colocation',
  },
  {
    key: 'penetrationAI',
    label: 'AI / Automation',
    shortLabel: 'AI/Auto',
    benchmarkRate: 0.20,
    defaultSpend: 500,
    spendOverrideKey: null,
    description: 'AI tools and workflow automation',
  },
  {
    key: 'penetrationBPO',
    label: 'BPO / CX Enhancements',
    shortLabel: 'BPO',
    benchmarkRate: 0.15,
    defaultSpend: 1500,
    spendOverrideKey: null,
    description: 'Business Process Outsourcing and CX enhancements',
  },
]

export const DEFAULT_SECTION_A = {
  totalCustomers: 0,
  totalMRR: 0,
  revenueFromUCaaS: 0,
  revenueFromNetwork: 0,
  revenueFromCCaaS: 0,
  revenueFromCloud: 0,
  revenueFromSecurity: 0,
}

export const DEFAULT_SECTION_B: SectionBInputs = {
  penetrationUCaaS: 20,
  penetrationSDWAN: 15,
  penetrationCybersecurity: 20,
  penetrationManagedFirewall: 15,
  penetrationSASE: 5,
  penetrationCCaaS: 10,
  penetrationBackupDR: 30,
  penetrationCloud: 15,
  penetrationAI: 5,
  penetrationBPO: 3,
}

export const DEFAULT_SECTION_C = {
  avgUCaaSSpend: 450,
  avgNetworkSpend: 800,
  avgSecuritySpend: 600,
  avgCCaaSSpend: 900,
  avgCloudSpend: 1200,
  avgContractTermMonths: 36,
  percentUnderContract: 60,
}

export const DEFAULT_SECTION_D = {
  tracksContractDates: false,
  runsQBRs: false,
  bundlesMultiProduct: false,
  hasDedicatedAM: false,
}

export const MATURITY_LABELS = ['Reactive', 'Reactive', 'Developing', 'Proactive', 'Best-in-Class']
export const MATURITY_DESCRIPTIONS = [
  'Your MSP is operating reactively. Significant revenue is escaping through the cracks.',
  'You are beginning to build processes, but cross-sell is still largely opportunistic.',
  'You have some structure in place. Focused effort on whitespace could yield significant gains.',
  'Strong fundamentals. A dedicated cross-sell motion would accelerate growth considerably.',
  'Operationally excellent. Bridgepointe can help you capture the remaining whitespace at scale.',
]
