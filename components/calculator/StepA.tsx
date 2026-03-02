'use client'

import type { SectionAInputs } from '@/lib/types'
import { formatCurrency } from '@/lib/calculations'

interface StepAProps {
  data: SectionAInputs
  onChange: (data: SectionAInputs) => void
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  hint,
  placeholder,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  prefix?: string
  hint?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-white/80 mb-1.5">{label}</label>
      {hint && <p className="text-xs text-[#6B7280] mb-2">{hint}</p>}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] font-bold">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder ?? '0'}
          className={`w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl py-3 text-white placeholder-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-[#17C662] focus:border-transparent transition-colors font-medium ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  )
}

function PercentInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-white/60 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          min={0}
          max={100}
          value={value || ''}
          onChange={(e) => {
            const v = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
            onChange(v)
          }}
          placeholder="0"
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl py-2.5 pl-3 pr-8 text-white placeholder-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-[#17C662] focus:border-transparent transition-colors text-sm font-medium"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm font-bold">%</span>
      </div>
    </div>
  )
}

export default function StepA({ data, onChange }: StepAProps) {
  const avgPerCustomer = data.totalCustomers > 0 ? data.totalMRR / data.totalCustomers : 0

  const set = (field: keyof SectionAInputs, value: number) =>
    onChange({ ...data, [field]: value })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-white mb-1 tracking-tight">Core Revenue Profile</h2>
        <p className="text-[#6B7280] text-sm font-medium">
          Tell us about your current MRR and revenue breakdown.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <NumberInput
          label="Total Active Customers"
          value={data.totalCustomers}
          onChange={(v) => set('totalCustomers', v)}
          placeholder="e.g. 150"
          hint="Customers you bill at least monthly"
        />
        <NumberInput
          label="Total Monthly Recurring Revenue (MRR)"
          value={data.totalMRR}
          onChange={(v) => set('totalMRR', v)}
          prefix="$"
          placeholder="e.g. 125000"
          hint="Total MRR across all products"
        />
      </div>

      {/* Auto-calculated ARPU */}
      <div className="bg-[#17C662]/5 border border-[#17C662]/20 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#17C662] uppercase tracking-wider mb-0.5">
            Auto-Calculated
          </p>
          <p className="text-sm text-white/70 font-medium">Average Monthly Revenue Per Customer</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-white">{formatCurrency(avgPerCustomer)}</p>
          <p className="text-xs text-[#6B7280] font-medium">per customer / mo</p>
        </div>
      </div>

      {/* Revenue breakdown */}
      <div>
        <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
          Approximate % of Revenue by Category
        </h3>
        <p className="text-xs text-[#6B7280] mb-4">
          Estimates are fine — these help us understand your current product mix. They don&apos;t
          need to sum to 100%.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <PercentInput
            label="UCaaS"
            value={data.revenueFromUCaaS}
            onChange={(v) => set('revenueFromUCaaS', v)}
          />
          <PercentInput
            label="Network (DIA / MPLS / SD-WAN / POTS)"
            value={data.revenueFromNetwork}
            onChange={(v) => set('revenueFromNetwork', v)}
          />
          <PercentInput
            label="CCaaS / CX"
            value={data.revenueFromCCaaS}
            onChange={(v) => set('revenueFromCCaaS', v)}
          />
          <PercentInput
            label="Cloud / Colocation"
            value={data.revenueFromCloud}
            onChange={(v) => set('revenueFromCloud', v)}
          />
          <PercentInput
            label="Security"
            value={data.revenueFromSecurity}
            onChange={(v) => set('revenueFromSecurity', v)}
          />
        </div>
      </div>
    </div>
  )
}
