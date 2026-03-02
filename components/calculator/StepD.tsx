'use client'

import type { SectionDInputs } from '@/lib/types'

interface StepDProps {
  data: SectionDInputs
  onChange: (data: SectionDInputs) => void
}

function ToggleQuestion({
  question,
  detail,
  value,
  onChange,
}: {
  question: string
  detail: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        value
          ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/30'
          : 'bg-slate-800 border-slate-700 hover:border-slate-500'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${value ? 'text-white' : 'text-slate-300'}`}>
            {question}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{detail}</p>
        </div>
        <div className="flex-shrink-0">
          {/* Toggle pill */}
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              value ? 'bg-blue-500' : 'bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </div>
        </div>
      </div>
    </button>
  )
}

const MATURITY_SCORES = [
  {
    score: 0,
    label: 'Reactive',
    color: 'text-red-400',
    bar: 'bg-red-500',
    width: 'w-[5%]',
  },
  {
    score: 1,
    label: 'Reactive',
    color: 'text-red-400',
    bar: 'bg-red-500',
    width: 'w-1/4',
  },
  {
    score: 2,
    label: 'Developing',
    color: 'text-amber-400',
    bar: 'bg-amber-500',
    width: 'w-2/4',
  },
  {
    score: 3,
    label: 'Proactive',
    color: 'text-blue-400',
    bar: 'bg-blue-500',
    width: 'w-3/4',
  },
  {
    score: 4,
    label: 'Best-in-Class',
    color: 'text-emerald-400',
    bar: 'bg-emerald-500',
    width: 'w-full',
  },
]

export default function StepD({ data, onChange }: StepDProps) {
  const set = (field: keyof SectionDInputs, value: boolean) =>
    onChange({ ...data, [field]: value })

  const score = [
    data.tracksContractDates,
    data.runsQBRs,
    data.bundlesMultiProduct,
    data.hasDedicatedAM,
  ].filter(Boolean).length

  const maturity = MATURITY_SCORES[score]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Renewal & Expansion Sophistication</h2>
        <p className="text-slate-400 text-sm">
          These four practices are the strongest leading indicators of cross-sell performance.
          Select all that apply to your MSP today.
        </p>
      </div>

      <div className="space-y-3">
        <ToggleQuestion
          question="Do you track contract expiration dates centrally?"
          detail="e.g. in your PSA, CRM, or a shared spreadsheet that's actively managed"
          value={data.tracksContractDates}
          onChange={(v) => set('tracksContractDates', v)}
        />
        <ToggleQuestion
          question="Do you proactively run QBRs?"
          detail="Quarterly Business Reviews scheduled and conducted with clients on a regular cadence"
          value={data.runsQBRs}
          onChange={(v) => set('runsQBRs', v)}
        />
        <ToggleQuestion
          question="Do you bundle multi-product deals?"
          detail="Actively packaging UCaaS + Security + Network together into bundled proposals"
          value={data.bundlesMultiProduct}
          onChange={(v) => set('bundlesMultiProduct', v)}
        />
        <ToggleQuestion
          question="Do you have a dedicated account manager?"
          detail="Someone whose primary responsibility is retention and expansion — not just support"
          value={data.hasDedicatedAM}
          onChange={(v) => set('hasDedicatedAM', v)}
        />
      </div>

      {/* Maturity score */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-slate-300">Operational Maturity Score</p>
          <span className={`text-sm font-bold ${maturity.color}`}>{maturity.label}</span>
        </div>
        <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-500 ${maturity.bar} ${maturity.width}`}
          />
        </div>
        <p className="text-xs text-slate-400">
          {score}/4 practices in place &mdash;{' '}
          {score < 4
            ? `${4 - score} improvement${4 - score > 1 ? 's' : ''} could meaningfully increase your cross-sell capture rate.`
            : 'Excellent. You have the operational foundation to capture whitespace aggressively.'}
        </p>
      </div>
    </div>
  )
}
