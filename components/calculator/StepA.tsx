'use client'

import type { SectionAInputs } from '@/lib/types'
import { formatCurrency } from '@/lib/calculations'

interface StepAProps {
  data: SectionAInputs
  onChange: (data: SectionAInputs) => void
}

function NumberInput({ label, value, onChange, prefix, hint, placeholder }: {
  label: string; value: number; onChange: (v: number) => void
  prefix?: string; hint?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-base font-bold text-[#003B5C] mb-1.5">{label}</label>
      {hint && <p className="text-base text-[#003B5C] mb-2">{hint}</p>}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#003B5C] font-bold">{prefix}</span>
        )}
        <input
          type="number"
          min={0}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder ?? '0'}
          className={`w-full bg-white border border-gray-200 rounded-xl py-3 text-[#003B5C] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#003B5C] focus:border-transparent transition-colors font-medium text-base ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  )
}

function PercentInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-base font-bold text-[#003B5C] mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          min={0}
          max={100}
          value={value || ''}
          onChange={(e) => onChange(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
          placeholder="0"
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-[#003B5C] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#003B5C] focus:border-transparent transition-colors font-medium text-base"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003B5C] font-bold text-base">%</span>
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
        <h2 className="text-2xl font-black text-[#003B5C] mb-2 tracking-tight">Core Revenue Profile</h2>
        <p className="text-base text-[#003B5C]">Tell us about your current MRR and revenue breakdown.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <NumberInput label="Total Active Customers" value={data.totalCustomers} onChange={(v) => set('totalCustomers', v)} placeholder="e.g. 150" hint="Customers you bill at least monthly" />
        <NumberInput label="Total Monthly Recurring Revenue (MRR)" value={data.totalMRR} onChange={(v) => set('totalMRR', v)} prefix="$" placeholder="e.g. 125000" hint="Total MRR across all products" />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-[#17C662] mb-0.5">Auto-Calculated</p>
          <p className="text-base text-[#003B5C]">Average Monthly Revenue Per Customer</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-[#003B5C]">{formatCurrency(avgPerCustomer)}</p>
          <p className="text-base text-[#003B5C]">per customer / mo</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#003B5C] mb-2">Approximate % of Revenue by Category</h3>
        <p className="text-base text-[#003B5C] mb-4">Estimates are fine — doesn&apos;t need to sum to 100%.</p>
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
