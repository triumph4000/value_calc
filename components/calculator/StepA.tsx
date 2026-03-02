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
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {hint && <p className="text-xs text-slate-500 mb-2">{hint}</p>}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder ?? '0'}
          className={`w-full bg-slate-800 border border-slate-600 rounded-lg py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
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
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
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
          className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 pl-3 pr-8 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
      </div>
    </div>
  )
}

export default function StepA({ data, onChange }: StepAProps) {
  const avgPerCustomer =
    data.totalCustomers > 0 ? data.totalMRR / data.totalCustomers : 0

  const set = (field: keyof SectionAInputs, value: number) =>
    onChange({ ...data, [field]: value })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Core Revenue Profile</h2>
        <p className="text-slate-400 text-sm">
          Tell us about your current MRR and revenue breakdown.
        </p>
      </div>

      {/* Primary metrics */}
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

      {/* Auto-calculated */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-blue-400 font-medium uppercase tracking-wider mb-0.5">
            Auto-Calculated
          </p>
          <p className="text-sm text-slate-300">Average Monthly Revenue Per Customer</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{formatCurrency(avgPerCustomer)}</p>
          <p className="text-xs text-slate-400">per customer / mo</p>
        </div>
      </div>

      {/* Revenue breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Approximate % of Revenue by Category
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Estimates are fine — these help us understand your current product mix. They don&apos;t need to sum to 100%.
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
