'use client'

import type { SectionAInputs } from '@/lib/types'
import { formatCurrency } from '@/lib/calculations'

interface StepAProps {
  data: SectionAInputs
  onChange: (data: SectionAInputs) => void
}

function NumberInput({
  label, value, onChange, prefix, hint, placeholder,
}: {
  label: string; value: number; onChange: (v: number) => void
  prefix?: string; hint?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#32373c] mb-1.5">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{prefix}</span>
        )}
        <input
          type="number"
          min={0}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder ?? '0'}
          className={`w-full bg-white border border-gray-200 rounded-xl py-3 text-[#32373c] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32373c] focus:border-transparent transition-colors font-medium ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  )
}

function PercentInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          min={0}
          max={100}
          value={value || ''}
          onChange={(e) => onChange(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
          placeholder="0"
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-3 pr-8 text-[#32373c] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32373c] focus:border-transparent transition-colors text-sm font-medium"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">%</span>
      </div>
    </div>
  )
}

export default function StepA({ data, onChange }: StepAProps) {
  const avgPerCustomer = data.totalCustomers > 0 ? data.totalMRR / data.totalCustomers : 0
  const set = (field: keyof SectionAInputs, value: number) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-[#32373c] mb-1 tracking-tight">Core Revenue Profile</h2>
        <p className="text-gray-500 text-sm font-medium">Tell us about your current MRR and revenue breakdown.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <NumberInput label="Total Active Customers" value={data.totalCustomers} onChange={(v) => set('totalCustomers', v)} placeholder="e.g. 150" hint="Customers you bill at least monthly" />
        <NumberInput label="Total Monthly Recurring Revenue (MRR)" value={data.totalMRR} onChange={(v) => set('totalMRR', v)} prefix="$" placeholder="e.g. 125000" hint="Total MRR across all products" />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#17C662] uppercase tracking-wider mb-0.5">Auto-Calculated</p>
          <p className="text-sm text-gray-500 font-medium">Average Monthly Revenue Per Customer</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-[#32373c]">{formatCurrency(avgPerCustomer)}</p>
          <p className="text-xs text-gray-400 font-medium">per customer / mo</p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Approximate % of Revenue by Category
        </h3>
        <p className="text-xs text-gray-400 mb-4">Estimates are fine — doesn&apos;t need to sum to 100%.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <PercentInput label="UCaaS" value={data.revenueFromUCaaS} onChange={(v) => set('revenueFromUCaaS', v)} />
          <PercentInput label="Network (DIA / MPLS / SD-WAN)" value={data.revenueFromNetwork} onChange={(v) => set('revenueFromNetwork', v)} />
          <PercentInput label="CCaaS / CX" value={data.revenueFromCCaaS} onChange={(v) => set('revenueFromCCaaS', v)} />
          <PercentInput label="Cloud / Colocation" value={data.revenueFromCloud} onChange={(v) => set('revenueFromCloud', v)} />
          <PercentInput label="Security" value={data.revenueFromSecurity} onChange={(v) => set('revenueFromSecurity', v)} />
        </div>
      </div>
    </div>
  )
}
