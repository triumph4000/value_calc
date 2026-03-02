'use client'

import type { SectionBInputs } from '@/lib/types'
import { PRODUCTS } from '@/lib/constants'

interface StepBProps {
  data: SectionBInputs
  onChange: (data: SectionBInputs) => void
}

function PenetrationSlider({
  label,
  description,
  value,
  benchmark,
  onChange,
}: {
  label: string
  description: string
  value: number
  benchmark: number
  onChange: (v: number) => void
}) {
  const gap = Math.max(0, benchmark - value)
  const gapColor = gap > 20 ? 'text-red-400' : gap > 10 ? 'text-amber-400' : 'text-emerald-400'

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{label}</p>
          <p className="text-xs text-slate-500 truncate">{description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-2xl font-bold text-blue-400">{value}%</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${value}%, #334155 ${value}%, #334155 100%)`,
        }}
      />

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">
          Industry benchmark:{' '}
          <span className="text-slate-300 font-medium">{Math.round(benchmark * 100)}%</span>
        </span>
        {gap > 0 ? (
          <span className={`font-medium ${gapColor}`}>
            {gap.toFixed(0)}% gap
          </span>
        ) : (
          <span className="text-emerald-400 font-medium">At or above benchmark</span>
        )}
      </div>
    </div>
  )
}

export default function StepB({ data, onChange }: StepBProps) {
  const set = (key: keyof SectionBInputs, value: number) =>
    onChange({ ...data, [key]: value })

  const totalGap = PRODUCTS.reduce((sum, p) => {
    const current = (data[p.key] ?? 0) / 100
    return sum + Math.max(0, p.benchmarkRate - current)
  }, 0)

  const avgGapPct = (totalGap / PRODUCTS.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Product Penetration</h2>
        <p className="text-slate-400 text-sm">
          What percentage of your customers currently buy each service from you?
          Move each slider to reflect your current book of business.
        </p>
      </div>

      {/* Summary banner */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">
            Average Penetration Gap
          </p>
          <p className="text-2xl font-bold text-amber-400">{avgGapPct.toFixed(0)}%</p>
        </div>
        <p className="text-xs text-slate-400 flex-1">
          This is the average difference between your current penetration rates and industry
          benchmarks across all product categories. The wider the gap, the more revenue hiding in
          your existing customer base.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
