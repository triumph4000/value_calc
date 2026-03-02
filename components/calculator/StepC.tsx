'use client'

import type { SectionCInputs } from '@/lib/types'

interface StepCProps {
  data: SectionCInputs
  onChange: (data: SectionCInputs) => void
}

function DollarInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  placeholder?: string
  hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-500 mb-1.5">{hint}</p>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
          $
        </span>
        <input
          type="number"
          min={0}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder ?? '0'}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-8 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>
    </div>
  )
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
  min,
  max,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  suffix?: string
  min?: number
  max?: number
  hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-500 mb-1.5">{hint}</p>}
      <div className="relative">
        <input
          type="number"
          min={min ?? 0}
          max={max}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder="0"
          className={`w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${suffix ? 'pr-12' : 'pr-4'}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export default function StepC({ data, onChange }: StepCProps) {
  const set = (field: keyof SectionCInputs, value: number) =>
    onChange({ ...data, [field]: value })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Customer Economics</h2>
        <p className="text-slate-400 text-sm">
          Help us model realistic upside. Leave any field blank and we&apos;ll use industry
          averages to estimate the opportunity.
        </p>
      </div>

      {/* Average spend per category */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Average Monthly Spend Per Customer
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <DollarInput
            label="UCaaS"
            value={data.avgUCaaSSpend}
            onChange={(v) => set('avgUCaaSSpend', v)}
            placeholder="450"
            hint="Default: $450/mo if left blank"
          />
          <DollarInput
            label="Network / Connectivity (SD-WAN, DIA, MPLS)"
            value={data.avgNetworkSpend}
            onChange={(v) => set('avgNetworkSpend', v)}
            placeholder="800"
            hint="Default: $800/mo if left blank"
          />
          <DollarInput
            label="Cybersecurity / Managed Security"
            value={data.avgSecuritySpend}
            onChange={(v) => set('avgSecuritySpend', v)}
            placeholder="600"
            hint="Default: $600/mo if left blank"
          />
          <DollarInput
            label="CCaaS / CX"
            value={data.avgCCaaSSpend}
            onChange={(v) => set('avgCCaaSSpend', v)}
            placeholder="900"
            hint="Default: $900/mo if left blank"
          />
          <DollarInput
            label="Cloud / Colocation"
            value={data.avgCloudSpend}
            onChange={(v) => set('avgCloudSpend', v)}
            placeholder="1200"
            hint="Default: $1,200/mo if left blank"
          />
        </div>
      </div>

      {/* Contract metrics */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Contract Profile
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <NumberInput
            label="Average Contract Term"
            value={data.avgContractTermMonths}
            onChange={(v) => set('avgContractTermMonths', v)}
            suffix="months"
            min={1}
            hint="Used to calculate total contract value. Default: 36 months"
          />
          <NumberInput
            label="Customers Under Contract vs Month-to-Month"
            value={data.percentUnderContract}
            onChange={(v) => set('percentUnderContract', Math.min(100, Math.max(0, v)))}
            suffix="%"
            min={0}
            max={100}
            hint="What % of your customers are under a term contract?"
          />
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
        <p className="text-xs text-slate-400">
          <span className="text-blue-400 font-medium">Pro tip:</span> Higher contract penetration
          and longer terms significantly increase your exit valuation multiple. MSPs with 70%+ of
          customers under contract command premium valuations.
        </p>
      </div>
    </div>
  )
}
