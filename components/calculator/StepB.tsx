'use client'

import type { SectionBInputs } from '@/lib/types'
import { PRODUCTS } from '@/lib/constants'

interface StepBProps {
  data: SectionBInputs
  onChange: (data: SectionBInputs) => void
}

function PenetrationSlider({ label, description, value, benchmark, onChange }: {
  label: string; description: string; value: number; benchmark: number; onChange: (v: number) => void
}) {
  const gap = Math.max(0, benchmark - value)
  const gapColor = gap > 20 ? 'text-red-500' : gap > 10 ? 'text-amber-500' : 'text-[#17C662]'

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-base font-black text-[#003B5C]">{label}</p>
          <p className="text-base text-[#003B5C]">{description}</p>
        </div>
        <span className="text-2xl font-black text-[#003B5C] flex-shrink-0">{value}%</span>
      </div>

      <input
        type="range"
        min={0} max={100} step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, #003B5C 0%, #003B5C ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
        }}
      />

      <div className="flex items-center justify-between">
        <span className="text-base text-[#003B5C]">
          Benchmark: <span className="font-bold">{Math.round(benchmark * 100)}%</span>
        </span>
        {gap > 0
          ? <span className={`text-base font-bold ${gapColor}`}>{gap.toFixed(0)}% gap</span>
          : <span className="text-base font-bold text-[#17C662]">At benchmark</span>
        }
      </div>
    </div>
  )
}

export default function StepB({ data, onChange }: StepBProps) {
  const set = (key: keyof SectionBInputs, value: number) => onChange({ ...data, [key]: value })

  const totalGap = PRODUCTS.reduce((sum, p) => sum + Math.max(0, p.benchmarkRate - (data[p.key] ?? 0) / 100), 0)
  const avgGapPct = (totalGap / PRODUCTS.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#003B5C] mb-2 tracking-tight">Product Penetration</h2>
        <p className="text-base text-[#003B5C]">What percentage of your customers currently buy each service from you?</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex-shrink-0">
          <p className="text-base font-bold text-[#003B5C] mb-0.5">Average Penetration Gap</p>
          <p className="text-3xl font-black text-amber-500">{avgGapPct.toFixed(0)}%</p>
        </div>
        <p className="text-base text-[#003B5C] flex-1">
          Average gap between your current penetration and industry benchmarks. Every percentage point represents revenue hiding in your existing base.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRODUCTS.map((product) => (
          <PenetrationSlider
            key={product.key}
            label={product.label}
            description={product.description}
            value={data[product.key] ?? 0}
            benchmark={product.benchmarkRate}
            onChange={(v) => set(product.key, v)}
          />
        ))}
      </div>
    </div>
  )
}
