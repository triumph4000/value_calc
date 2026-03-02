'use client'

import type { SectionCInputs } from '@/lib/types'

interface StepCProps {
  data: SectionCInputs
  onChange: (data: SectionCInputs) => void
}

function DollarInput({ label, value, onChange, placeholder, hint }: {
  label: string; value: number; onChange: (v: number) => void; placeholder?: string; hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#32373c] mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1.5 font-medium">{hint}</p>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
        <input
          type="number"
          min={0}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder ?? '0'}
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-8 pr-4 text-[#32373c] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32373c] focus:border-transparent transition-colors font-medium"
        />
      </div>
    </div>
  )
}

function NumberInput({ label, value, onChange, suffix, min, max, hint }: {
  label: string; value: number; onChange: (v: number) => void
  suffix?: string; min?: number; max?: number; hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#32373c] mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1.5 font-medium">{hint}</p>}
      <div className="relative">
        <input
          type="number"
          min={min ?? 0}
          max={max}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder="0"
          className={`w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 text-[#32373c] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32373c] focus:border-transparent transition-colors font-medium ${suffix ? 'pr-12' : 'pr-4'}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">{suffix}</span>}
      </div>
    </div>
  )
}

export default function StepC({ data, onChange }: StepCProps) {
  const set = (field: keyof SectionCInputs, value: number) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-[#32373c] mb-1 tracking-tight">Customer Economics</h2>
        <p className="text-gray-500 text-sm font-medium">Leave any field blank and we&apos;ll use industry averages to estimate the opportunity.</p>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Average Monthly Spend Per Customer</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <DollarInput label="UCaaS" value={data.avgUCaaSSpend} onChange={(v) => set('avgUCaaSSpend', v)} placeholder="450" hint="Default: $450/mo" />
          <DollarInput label="Network / Connectivity" value={data.avgNetworkSpend} onChange={(v) => set('avgNetworkSpend', v)} placeholder="800" hint="Default: $800/mo" />
          <DollarInput label="Cybersecurity / Managed Security" value={data.avgSecuritySpend} onChange={(v) => set('avgSecuritySpend', v)} placeholder="600" hint="Default: $600/mo" />
          <DollarInput label="CCaaS / CX" value={data.avgCCaaSSpend} onChange={(v) => set('avgCCaaSSpend', v)} placeholder="900" hint="Default: $900/mo" />
          <DollarInput label="Cloud / Colocation" value={data.avgCloudSpend} onChange={(v) => set('avgCloudSpend', v)} placeholder="1200" hint="Default: $1,200/mo" />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contract Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <NumberInput label="Average Contract Term" value={data.avgContractTermMonths} onChange={(v) => set('avgContractTermMonths', v)} suffix="months" min={1} hint="Default: 36 months" />
          <NumberInput label="Customers Under Contract" value={data.percentUnderContract} onChange={(v) => set('percentUnderContract', Math.min(100, Math.max(0, v)))} suffix="%" min={0} max={100} hint="vs Month-to-Month" />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-500 font-medium">
          <span className="text-[#17C662] font-bold">Pro tip:</span> MSPs with 70%+ of customers under contract command significantly higher exit valuations.
        </p>
      </div>
    </div>
  )
}
