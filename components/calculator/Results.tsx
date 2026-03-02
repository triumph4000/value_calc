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
import { formatCurrency, formatLargeCurrency, formatPercent, getMaturityDescription } from '@/lib/calculations'
import LeadCapture from './LeadCapture'

interface ResultsProps {
  inputs: CalculatorInputs
  results: CalculatorResults
}

function StatCard({
  label,
  value,
  sub,
  highlight,
  color,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
  color?: 'blue' | 'emerald' | 'amber' | 'purple'
}) {
  const colors = {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
  }
  const borders = {
    blue: 'border-blue-500/40',
    emerald: 'border-emerald-500/40',
    amber: 'border-amber-500/40',
    purple: 'border-purple-500/40',
  }
  const bgs = {
    blue: 'bg-blue-500/5',
    emerald: 'bg-emerald-500/5',
    amber: 'bg-amber-500/5',
    purple: 'bg-purple-500/5',
  }
  const c = color ?? 'blue'
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${highlight ? `${bgs[c]} ${borders[c]}` : 'bg-slate-800 border-slate-700'}`}
    >
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-bold ${highlight ? colors[c] : 'text-white'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-slate-500 mt-1.5">{sub}</p>}
    </div>
  )
}

function MonetizationMeter({ rate }: { rate: number }) {
  const clampedRate = Math.min(100, Math.max(0, rate))
  const color =
    clampedRate < 40 ? 'bg-red-500' : clampedRate < 65 ? 'bg-amber-500' : 'bg-emerald-500'

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Current Monetization Rate
      </p>
      <div className="flex items-end gap-3 mb-3">
        <span className="text-4xl font-bold text-white">{formatPercent(clampedRate, 1)}</span>
        <span className="text-slate-400 text-sm mb-1">of your wallet captured</span>
      </div>
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${clampedRate}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>0%</span>
        <span className="text-slate-400">Industry potential: 100%</span>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        The industry average for top-performing MSPs is{' '}
        <span className="text-slate-300 font-medium">60–75%</span> wallet share. Most MSPs sit
        below{' '}
        <span className="text-red-400 font-medium">40%</span>.
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
  payload?: Array<{ value: number; name: string; dataKey: string }>
  label?: string
}) => {
  if (!active || !payload?.length) return null
  const current = payload.find((p) => p.dataKey === 'current')?.value ?? 0
  const benchmark = payload.find((p) => p.dataKey === 'benchmark')?.value ?? 0
  const gap = Math.max(0, benchmark - current)
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 shadow-xl">
      <p className="text-sm font-semibold text-white mb-2">{label}</p>
      <p className="text-xs text-blue-400">
        Your rate: <span className="font-bold">{current}%</span>
      </p>
      <p className="text-xs text-slate-400">
        Benchmark: <span className="font-bold">{benchmark}%</span>
      </p>
      {gap > 0 && (
        <p className="text-xs text-amber-400 mt-1">
          Gap: <span className="font-bold">{gap}%</span>
        </p>
      )}
    </div>
  )
}

export default function Results({ inputs, results }: ResultsProps) {
  const [leadCaptured, setLeadCaptured] = useState(false)

  const chartData = results.whitespaceByProduct.map((p) => ({
    name: p.productLabel.split(' ')[0].replace('/', ''),
    current: Math.round(p.currentPenetration),
    benchmark: Math.round(p.benchmarkRate),
  }))

  const maturityColors = ['text-red-400', 'text-red-400', 'text-amber-400', 'text-blue-400', 'text-emerald-400']
  const maturityBarColors = ['bg-red-500', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500']
  const maturityWidths = ['w-[5%]', 'w-1/4', 'w-2/4', 'w-3/4', 'w-full']
  const score = results.operationalMaturityScore

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
          Analysis Complete
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Your Hidden Revenue Report
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Based on your inputs and industry benchmarks, here is how much recurring revenue is
          sitting uncaptured in your existing customer base.
        </p>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Hidden MRR"
          value={`${formatLargeCurrency(results.totalHiddenMRR)}/mo`}
          sub="Estimated monthly recurring revenue you're not capturing"
          highlight
          color="blue"
        />
        <StatCard
          label="3-Year Contract Value"
          value={formatLargeCurrency(results.threeYearValue)}
          sub={`Based on ${inputs.sectionC.avgContractTermMonths || 36}-month avg contract term`}
          highlight
          color="emerald"
        />
        <StatCard
          label="Est. Annual Commission"
          value={formatLargeCurrency(results.annualCommission)}
          sub="At 15% commission model assumption"
          highlight
          color="amber"
        />
      </div>

      {/* Monetization meter */}
      <MonetizationMeter rate={results.currentMonetizationRate} />

      {/* Penetration chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Your Penetration vs Industry Benchmark
        </p>
        <p className="text-xs text-slate-500 mb-5">
          The gap between the bars is your whitespace — customers who could buy but aren&apos;t.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#94A3B8', paddingTop: '16px' }}
              formatter={(v: string) =>
                v === 'current' ? 'Your Penetration' : 'Industry Benchmark'
              }
            />
            <Bar
              dataKey="current"
              name="current"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="benchmark"
              name="benchmark"
              fill="#475569"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 whitespace */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Top 3 Whitespace Opportunities
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {results.topThreeWhitespace.map((item, i) => (
            <div
              key={item.productKey}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600" />
              <span className="text-xs font-bold text-blue-400 mb-2 block">
                #{i + 1} Opportunity
              </span>
              <h4 className="text-lg font-bold text-white mb-3">{item.productLabel}</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Whitespace customers</span>
                  <span className="text-white font-medium">{item.whitespaceCustomers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Avg spend / mo</span>
                  <span className="text-white font-medium">{formatCurrency(item.avgSpend)}</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-slate-700">
                  <span className="text-slate-300 font-medium">Hidden MRR</span>
                  <span className="text-emerald-400 font-bold">
                    {formatCurrency(item.hiddenMRR)}/mo
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exit valuation lift — gated until lead captured */}
      {!leadCaptured ? (
        <div className="relative">
          {/* Blurred preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 blur-sm pointer-events-none select-none">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Exit Valuation Lift
              </p>
              <p className="text-4xl font-bold text-purple-400">$X.XXM</p>
              <p className="text-xs text-slate-500 mt-1.5">
                At 5x EBITDA multiple on captured whitespace
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Operational Maturity
              </p>
              <p className="text-4xl font-bold text-blue-400">X/4</p>
              <p className="text-xs text-slate-500 mt-1.5">Best-in-Class practices in place</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-8 h-8 text-slate-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p className="text-sm text-slate-300 font-medium">Unlock with email below</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          <div className="bg-purple-500/10 border border-purple-500/40 rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Exit Valuation Lift
            </p>
            <p className="text-4xl font-bold text-purple-400">
              {formatLargeCurrency(results.exitValuationLift)}
            </p>
            <p className="text-xs text-slate-400 mt-1.5">
              Estimated additional enterprise value if you captured this whitespace — at 5x EBITDA
              on a 40% margin assumption.
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Operational Maturity
            </p>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-4xl font-bold ${maturityColors[score]}`}>{score}/4</span>
              <span className={`text-sm font-semibold mb-1 ${maturityColors[score]}`}>
                {results.operationalMaturityLabel}
              </span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full ${maturityBarColors[score]} ${maturityWidths[score]}`}
              />
            </div>
            <p className="text-xs text-slate-400">{getMaturityDescription(score)}</p>
          </div>
        </div>
      )}

      {/* Lead capture */}
      <LeadCapture inputs={inputs} results={results} onCaptured={() => setLeadCaptured(true)} />
    </div>
  )
}
