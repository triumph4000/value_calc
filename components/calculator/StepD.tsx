'use client'

import type { SectionDInputs } from '@/lib/types'

interface StepDProps {
  data: SectionDInputs
  onChange: (data: SectionDInputs) => void
}

function ToggleQuestion({ question, detail, value, onChange }: {
  question: string; detail: string; value: boolean; onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        value ? 'bg-gray-50 border-[#003B5C]' : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-[#003B5C]">{question}</p>
          <p className="text-base text-[#003B5C] mt-0.5">{detail}</p>
        </div>
        <div className="flex-shrink-0">
          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${value ? 'bg-[#003B5C]' : 'bg-gray-200'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </div>
      </div>
    </button>
  )
}

const MATURITY_CONFIG = [
  { label: 'Reactive',      color: 'text-red-500',   bar: 'bg-red-500',    pct: '5%'   },
  { label: 'Reactive',      color: 'text-red-500',   bar: 'bg-red-500',    pct: '25%'  },
  { label: 'Developing',    color: 'text-amber-500', bar: 'bg-amber-500',  pct: '50%'  },
  { label: 'Proactive',     color: 'text-[#003B5C]', bar: 'bg-[#003B5C]', pct: '75%'  },
  { label: 'Best-in-Class', color: 'text-[#17C662]', bar: 'bg-[#17C662]', pct: '100%' },
]

export default function StepD({ data, onChange }: StepDProps) {
  const set = (field: keyof SectionDInputs, value: boolean) => onChange({ ...data, [field]: value })
  const score = [data.tracksContractDates, data.runsQBRs, data.bundlesMultiProduct, data.hasDedicatedAM].filter(Boolean).length
  const maturity = MATURITY_CONFIG[score]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#003B5C] mb-2 tracking-tight">Renewal & Expansion Sophistication</h2>
        <p className="text-base text-[#003B5C]">These four practices are the strongest leading indicators of cross-sell performance.</p>
      </div>

      <div className="space-y-3">
        <ToggleQuestion question="Do you track contract expiration dates centrally?" detail="e.g. in your PSA, CRM, or an actively managed spreadsheet" value={data.tracksContractDates} onChange={(v) => set('tracksContractDates', v)} />
        <ToggleQuestion question="Do you proactively run QBRs?" detail="Quarterly Business Reviews on a regular, scheduled cadence" value={data.runsQBRs} onChange={(v) => set('runsQBRs', v)} />
        <ToggleQuestion question="Do you bundle multi-product deals?" detail="Actively packaging UCaaS + Security + Network into bundled proposals" value={data.bundlesMultiProduct} onChange={(v) => set('bundlesMultiProduct', v)} />
        <ToggleQuestion question="Do you have a dedicated account manager?" detail="Someone whose primary role is retention and expansion — not just support" value={data.hasDedicatedAM} onChange={(v) => set('hasDedicatedAM', v)} />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-base font-bold text-[#003B5C]">Operational Maturity Score</p>
          <span className={`text-base font-black ${maturity.color}`}>{maturity.label}</span>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div className={`h-full rounded-full transition-all duration-500 ${maturity.bar}`} style={{ width: maturity.pct }} />
        </div>
        <p className="text-base text-[#003B5C]">
          {score}/4 practices in place —{' '}
          {score < 4
            ? `${4 - score} improvement${4 - score > 1 ? 's' : ''} could meaningfully increase your cross-sell capture rate.`
            : 'Excellent. You have the operational foundation to capture whitespace aggressively.'}
        </p>
      </div>
    </div>
  )
}
