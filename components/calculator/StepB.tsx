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
  const gapColor = gap > 20 ? 'text-red-400' : gap > 10 ? 'text-amber-400' : 'text-[#17C662]'

  return (
    <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-black text-white truncate tracking-tight">{label}</p>
          <p className="text-xs text-[#6B7280] truncate font-medium">{description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-2xl font-black text-[#17C662]">{value}%</span>
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
          background: `linear-gradient(to right, #17C662 0%, #17C662 ${value}%, #2A2A2A ${value}%, #2A2A2A 100%)`,
        }}
      />

      <div className="flex items-center justify-between text-xs">
        <span className="text-[#6B7280] font-medium">
          Benchmark:{' '}
          <span className="text-white/60 font-bold">{Math.round(benchmark * 100)}%</span>
        </span>
        {gap > 0 ? (
          <span className={`font-bold ${gapColor}`}>{gap.toFixed(0)}% gap</span>
        ) : (
          <span className="text-[#17C662] font-bold">At benchmark</span>
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
        <h2 className="text-xl font-black text-white mb-1 tracking-tight">Product Penetration</h2>
        <p className="text-[#6B7280] text-sm font-medium">
          What percentage of your customers currently buy each service from you?
        </p>
      </div>

      {/* Summary banner */}
      <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex-shrink-0">
          <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-0.5">
            Avg Penetration Gap
          </p>
          <p className="text-3xl font-black text-amber-400">{avgGapPct.toFixed(0)}%</p>
        </div>
        <p className="text-xs text-[#6B7280] font-medium flex-1">
          Average gap between your current penetration rates and industry benchmarks. Every
          percentage point represents revenue hiding in your existing customer base.
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
