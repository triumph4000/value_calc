'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { CalculatorInputs, CalculatorResults } from '@/lib/types'
import {
  formatCurrency,
  formatLargeCurrency,
  formatPercent,
  getMaturityDescription,
} from '@/lib/calculations'
import LeadCapture from './LeadCapture'

interface ResultsProps {
  inputs: CalculatorInputs
  results: CalculatorResults
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: 'green' | 'amber' | 'purple'
}) {
  const colors = {
    green: 'text-[#17C662]',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
  }
  const borders = {
    green: 'border-[#17C662]/25 bg-[#17C662]/5',
    amber: 'border-amber-500/25 bg-amber-500/5',
    purple: 'border-purple-500/25 bg-purple-500/5',
  }

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${accent ? borders[accent] : 'bg-[#0D0D0D] border-[#2A2A2A]'}`}>
      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-black tracking-tight ${accent ? colors[accent] : 'text-white'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-[#6B7280] mt-1.5 font-medium">{sub}</p>}
    </div>
  )
}

function MonetizationMeter({ rate }: { rate: number }) {
  const clamped = Math.min(100, Math.max(0, rate))
  const barColor = clamped < 40 ? 'bg-red-500' : clamped < 65 ? 'bg-amber-500' : 'bg-[#17C662]'

  return (
    <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 sm:p-6">
      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
        Current Monetization Rate
      </p>
      <div className="flex items-end gap-3 mb-3">
        <span className="text-4xl font-black text-white">{formatPercent(clamped, 1)}</span>
        <span className="text-[#6B7280] text-sm mb-1 font-medium">of your wallet captured</span>
      </div>
      <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#6B7280] font-medium">
        <span>0%</span>
        <span>Industry potential: 100%</span>
      </div>
      <p className="text-xs text-[#6B7280] mt-3 font-medium">
        Top-performing MSPs capture{' '}
        <span className="text-white font-bold">60–75%</span> wallet share. Most sit below{' '}
        <span className="text-red-400 font-bold">40%</span>.
      </p>
    </div>
  )
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string }>
  label?: string
}) => {
  if (!active || !payload?.length) return null
  const current = payload.find((p) => p.dataKey === 'current')?.value ?? 0
  const benchmark = payload.find((p) => p.dataKey === 'benchmark')?.value ?? 0
  const gap = Math.max(0, benchmark - current)
  return (
    <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-3 shadow-xl">
      <p className="text-sm font-black text-white mb-2">{label}</p>
      <p className="text-xs text-[#17C662] font-bold">Your rate: {current}%</p>
      <p className="text-xs text-[#6B7280] font-medium">Benchmark: {benchmark}%</p>
      {gap > 0 && <p className="text-xs text-amber-400 font-bold mt-1">Gap: {gap}%</p>}
    </div>
  )
}

const MATURITY_COLORS = [
  'text-red-400', 'text-red-400', 'text-amber-400', 'text-[#17C662]', 'text-[#17C662]',
]
const MATURITY_BARS = [
  'bg-red-500', 'bg-red-500', 'bg-amber-500', 'bg-[#17C662]', 'bg-[#17C662]',
]
const MATURITY_PCTS = ['5%', '25%', '50%', '75%', '100%']

export default function Results({ inputs, results }: ResultsProps) {
  const [leadCaptured, setLeadCaptured] = useState(false)
  const score = results.operationalMaturityScore

  const chartData = results.whitespaceByProduct.map((p) => ({
    name: p.productLabel.split(' ')[0].replace('/', ''),
    current: Math.round(p.currentPenetration),
    benchmark: Math.round(p.benchmarkRate),
  }))

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-bold text-[#17C662] uppercase tracking-widest mb-2">
          Analysis Complete
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
          Your Hidden Revenue Report
        </h2>
        <p className="text-[#6B7280] max-w-xl mx-auto text-sm font-medium">
          Based on your inputs and industry benchmarks, here is how much recurring revenue is
          sitting uncaptured in your existing customer base.
        </p>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Hidden MRR"
          value={`${formatLargeCurrency(results.totalHiddenMRR)}/mo`}
          sub="Estimated MRR you're not capturing today"
          accent="green"
        />
        <StatCard
          label="3-Year Contract Value"
          value={formatLargeCurrency(results.threeYearValue)}
          sub={`Based on ${inputs.sectionC.avgContractTermMonths || 36}-month avg term`}
          accent="amber"
        />
        <StatCard
          label="Est. Annual Commission"
          value={formatLargeCurrency(results.annualCommission)}
          sub="At 15% commission model assumption"
          accent="purple"
        />
      </div>

      {/* Monetization meter */}
      <MonetizationMeter rate={results.currentMonetizationRate} />

      {/* Penetration chart */}
      <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 sm:p-6">
        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-1">
          Your Penetration vs Industry Benchmark
        </p>
        <p className="text-xs text-[#6B7280] mb-5 font-medium">
          The gap between bars is your whitespace — customers who could buy but aren&apos;t.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#6B7280', paddingTop: '16px', fontWeight: 600 }}
              formatter={(v: string) =>
                v === 'current' ? 'Your Penetration' : 'Industry Benchmark'
              }
            />
            <Bar dataKey="current" name="current" fill="#17C662" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="benchmark" name="benchmark" fill="#32373C" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 whitespace */}
      <div>
        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
          Top 3 Whitespace Opportunities
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {results.topThreeWhitespace.map((item, i) => (
            <div
              key={item.productKey}
              className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#17C662]" />
              <span className="text-xs font-black text-[#17C662] mb-2 block tracking-wider">
                #{i + 1} OPPORTUNITY
              </span>
              <h4 className="text-lg font-black text-white mb-3 tracking-tight">{item.productLabel}</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280] font-medium">Whitespace customers</span>
                  <span className="text-white font-bold">{item.whitespaceCustomers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280] font-medium">Avg spend / mo</span>
                  <span className="text-white font-bold">{formatCurrency(item.avgSpend)}</span>
                </div>
                <div className="flex justify-between text-sm pt-1.5 border-t border-[#2A2A2A]">
                  <span className="text-white/70 font-bold">Hidden MRR</span>
                  <span className="text-[#17C662] font-black">{formatCurrency(item.hiddenMRR)}/mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gated section: Exit Valuation + Maturity */}
      {!leadCaptured ? (
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 blur-sm pointer-events-none select-none">
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2">Exit Valuation Lift</p>
              <p className="text-4xl font-black text-purple-400">$X.XXM</p>
              <p className="text-xs text-[#6B7280] mt-1.5 font-medium">At 5x EBITDA on captured whitespace</p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2">Operational Maturity</p>
              <p className="text-4xl font-black text-[#17C662]">X/4</p>
              <p className="text-xs text-[#6B7280] mt-1.5 font-medium">Best-in-Class practices in place</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 bg-[#161616] border border-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm text-white font-bold">Unlock with email below</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          <div className="bg-purple-500/5 border border-purple-500/25 rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2">
              Exit Valuation Lift
            </p>
            <p className="text-4xl font-black text-purple-400">
              {formatLargeCurrency(results.exitValuationLift)}
            </p>
            <p className="text-xs text-[#6B7280] mt-1.5 font-medium">
              Estimated additional enterprise value if you captured this whitespace — at 5x EBITDA
              on a 40% margin assumption.
            </p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2">
              Operational Maturity
            </p>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-4xl font-black ${MATURITY_COLORS[score]}`}>{score}/4</span>
              <span className={`text-sm font-black mb-1 ${MATURITY_COLORS[score]}`}>
                {results.operationalMaturityLabel}
              </span>
            </div>
            <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full ${MATURITY_BARS[score]}`}
                style={{ width: MATURITY_PCTS[score] }}
              />
            </div>
            <p className="text-xs text-[#6B7280] font-medium">{getMaturityDescription(score)}</p>
          </div>
        </div>
      )}

      {/* Lead capture */}
      <LeadCapture inputs={inputs} results={results} onCaptured={() => setLeadCaptured(true)} />
    </div>
  )
}
